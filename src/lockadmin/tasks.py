"""Module with schedule-based tasks.

There are also helpers for google-api here temporarily.

"""

import uuid
from datetime import datetime

from django.conf import settings

import django_cron
import googleapiclient.http
from django.core.exceptions import ObjectDoesNotExist
from googleapiclient import discovery
from google.oauth2.service_account import Credentials

from .models import *


# TODO: move to django 3.0 and make this async
# TODO: move things like this in separate module
def service_iter(resource, list_field, **kwargs):
    """Generator for iterate through paginated google resource list.

    Args:
        resource (googleapiclient.discovery.Resource): google resource with method list
        list_field (str): field name with google resource list
        **kwargs (Any): optional kwargs for list method
    
    Yields:
        list[dict]: list with resources
    
    """
    res: dict = resource.list(**kwargs).execute()
    while True:
        print(res.keys())
        if list_field not in res:
            break
        else:
            yield res[list_field]
        
        if 'nextPageToken' not in res:
            break
        else:
            next_page = res['nextPageToken']
            # TODO: use method list_next for paginate
            res = resource.list(pageToken=next_page, **kwargs).execute()


# TODO: make this async
def create_lock_group(l_uuid):
    """Helper function for creating google group for lock

    Args:
        l_uuid (str): uuid of lock.

    Returns:
        dict: Response from google with group resource.
    
    Raises:
         googleapiclient.errors.HttpError: Error from googleapi method

    """
    creds = initialize_creds()
    customer = 'my_customer'

    directory = discovery.build('admin', 'directory_v1', credentials=creds)
    groups = directory.groups()
    
    name = '.'.join(('lock', uuid.UUID(l_uuid).hex[:32-7]))
    assert(len(name) <= 30)  # Google restriction
    desc = 'This group is autogenerated by lock with uuid ' + l_uuid + '. '\
           'You are needed to approve the lock. ' \
           'Do not forget change group name and, optionally, description. ' \
           'In order to add access to lock for user just add the user to this group ' \
           'and wait for another day.'
    new_email = name + '@miem.hse.ru'
    print('name: ', name)
    print('email: ', new_email)
    return groups.insert(
            body={
                'email': new_email,
                'description': desc,
                'name': name
            }
    ).execute()


def initialize_creds() -> Credentials:
    """Helper function for initializing credentials

    """
    gsuite_conf: dict = getattr(settings, 'GSUITE', dict())
    
    acc_file = gsuite_conf.get('GSUITE_ACCOUNT_FILE', 'gsuite-creds.json')
    scopes = gsuite_conf.get('SCOPES', [  # default should be deleted
        'https://www.googleapis.com/auth/admin.directory.user',
        'https://www.googleapis.com/auth/admin.directory.group',
        'https://www.googleapis.com/auth/admin.directory.resource.calendar',
    ])
    
    with_subject = gsuite_conf.get('WITH_SUBJECT', True)
    subject = gsuite_conf.get('SUBJECT', 'racs@miem.hse.ru')
    
    # Initializing credentials and services
    creds = Credentials.from_service_account_file(acc_file, scopes=scopes)
    if with_subject:
        creds = creds.with_subject(subject)
    
    return creds


class SyncGoogleGroups(django_cron.CronJobBase):
    """Task for syncing google groups with local accesses.
    
    Attributes:
        members (googleapiclient.discovery.Resource): Members google resource.
        groups (googleapiclient.discovery.Resource): Groups google resource.
        customer (str): customer for google api method.
        log (dict[str:list[str]]): runtime attribute for creating log after task done.
        lock_users (dict[str:dict[str:Any]]): runtime attribute for storing
            user with access to processing lock.
    
    See Also:
        https://django-cron.readthedocs.io/en/latest/introduction.html
    
    """
    RUN_AT_TIMES = ['04:00']
    
    code = 'lockadmin.sync_google_groups'
    schedule = django_cron.Schedule(run_at_times=RUN_AT_TIMES, run_every_mins=10)
    
    def __init__(self):
        """Inits task, creds, services and other members for further usage.
        
        """
        super(SyncGoogleGroups, self).__init__()

        creds = initialize_creds()
        customer = 'my_customer'
    
        directory = discovery.build('admin', 'directory_v1', credentials=creds)

        self.members = directory.members()
        self.groups = directory.groups()
        self.customer = customer
    
        # TODO: refactor this
        self.log = {}  # Maybe separate class needed
        self.lock_users = {}  # Maybe separate class needed
    
    def do(self):
        """Method, which evaluates by schedule.
        
        """
        self.log = {'Added:': [],
                    'Passed:': [],
                    'Removed:': [],
                    'NF in db:': [],
                    # 'NF in google:': [],
                    }
        self.lock_users = {}
        
        # Look through every group, that represents lock
        for groups in service_iter(self.groups, 'groups',
                                   customer=self.customer, query='email:lock.*'):
            self.process_group_list(groups)
        
        self.write_log()
    
    def process_group_list(self, groups: list):
        """Helper method for process every group list while paginating.
        
        """
        now = datetime.utcnow()
        # For every group ...
        for gr in groups:
            try:
                lock = Locks.objects.get(gmail=gr['email'])
            except ObjectDoesNotExist:  # should not reach this
                print('Lock gmail ' + gr['email'] + 'does not exists in db')
            else:
                # ... Get all users, that already have accesses to its lock
                lock_users = UserModel.objects.filter(
                        u_accesses__lock=lock,
                        u_accesses__lock__is_approved=True,
                        u_accesses__access_start__lte=now,
                        u_accesses__access_stop__gte=now
                )
                # Pack them in struct for checking if they were met in group members
                self.lock_users = {u.email: {'check': False,
                                             'model': u}
                                   for u in lock_users}
                
                # Look trough all members of the group
                for gr_members in service_iter(self.members, 'members',
                                               groupKey=lock.gmail, includeDerivedMembership=True):
                    self.process_member_list(gr_members, lock, now)
                
                # Remove accesses to that lock if user wasn't met in group
                # TODO: it can be done in one db query for all groups
                self.remove_users_from_lock(lock, now)
    
    def process_member_list(self, members, lock, now):
        """Helper method for processing every members list while paginating
        
        """
        # For every member ...
        for member in members:
            user_email = member['email']
            # If user already has access to the lock, it's OK
            if user_email in self.lock_users:
                self.lock_users[user_email]['check'] = True
                self.log['Passed:'].append(user_email)
            # Else add it to the user
            else:
                self.add_user_to_lock(user_email, lock, now)
    
    def add_user_to_lock(self, email, lock, now):
        """Helper function for adding access to user.
        
        """
        try:
            # TODO: when optimize as next TODO, this will be replaced by lightweight exists() query
            user = UserModel.objects.get(email=email)
        except ObjectDoesNotExist:
            self.log['NF in db:'].append(email)
        else:
            # TODO: it can be done in one db query for all groups (bulk_create())
            Accesses.objects.create(user=user, lock=lock,
                                    access_start=now, access_stop=datetime(day=1, month=1, year=2100))
            self.log['Added:'].append(email)
    
    def remove_users_from_lock(self, lock: Locks, now):
        """Helper function for removing accesses.
        
        """
        # Clear struct from checked users
        for email, struct in self.lock_users.items():
            if struct['check']:
                self.lock_users.pop(email)
        # Stop accesses now for unchecked users for this lock
        Accesses.objects.filter(
                lock=lock, user__email__in=self.lock_users.keys()
        ).update(access_stop=now)
        self.log['Removed:'].extend(self.lock_users.keys())
    
    def write_log(self):
        """Helper function for writing sync log.
        
        """
        import os
        now = datetime.utcnow()
        with open(
                os.path.join(
                        settings.BASE_DIR,
                        '-'.join((
                            'google-sync',
                            str(now.day),
                            str(now.month),
                            str(now.hour) + str(now.minute)
                        ))
                ),
                'w'
        ) as logfile:
            for category, emails in self.log.items():
                logfile.write(category + '\n')
                logfile.writelines('\t' + em for em in emails)
