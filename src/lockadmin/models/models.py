<<<<<<< HEAD
"""Module with general models.

Models in this module:
    Roles
    Locks
    Accesses
    Locks
    
See Also:
    https://docs.djangoproject.com/en/2.2/ref/models/.

"""

=======
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
import uuid

from datetime import datetime
from django.db import models
from .auth_models import UserModel
from ..validators import version_validator


class Roles(models.Model):
<<<<<<< HEAD
    """Model, representing user's roles in service. Managed by superuser.
    
    Attributes:
        self.r_id (int): Internal read-only identificator. Required.
        self.name (str): Name of the role. Required.

    """
=======
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
    r_id = models.AutoField('r_id', primary_key=True)
    name = models.CharField(max_length=50, unique=True)


class Locks(models.Model):
<<<<<<< HEAD
    """Model, representing locks (rooms) in service.
    
    Can be created by superuser or lock itself. Requires verification by superuser, when created.
    
    Attributes:
        self.l_id (int): Internal read-only identificator. Required.
        self.uuid (str): Identificator of physical lock. Hashes before saving by signal pre_save (signals.py). Required
        self.hash_id (str): Read-only hashed uuid. Required.
        self.description (str): Lock (room) description. It may contain room number.
        self.is_on (bool): Indicates, does lock close.
        self.is_approved (bool): Is lock verified by superuser. Required to be True. False by default.
        self.version (str): Number of firmware version in format r"\\d{1,2}\\.\\d{1,2}" (regex, version_validator).
        self.last_echo (DateTime): Last time, when lock emitted echo. Used for connection monitoring. Required,
    
    """
=======
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
    l_id        = models.BigAutoField ('l_id', primary_key=True)
    uuid        = models.UUIDField    ('uid', default=uuid.uuid4, editable=True,
                                       unique=True)
    hash_id     = models.CharField    ('hash_id',     null=False, blank=False, max_length=256,
                                       unique=True)
    description = models.TextField    ('description', null=False, blank=True,  max_length=200)
    is_on       = models.BooleanField ('is_on',       null=False, default=True)
    is_approved = models.BooleanField ('is_approved', null=False, default=True)  # temporary for dev
    version     = models.CharField    ('version',     null=False, max_length=5,
                                       validators=[version_validator])
    last_echo   = models.DateTimeField('last_echo',   null=False, auto_now_add=True)

    @property
<<<<<<< HEAD
    def major_version(self) -> int:
        """Fetches major version (first number).

        """
        return int(self.version.split('.')[0])

    @property
    def minor_version(self) -> int:
        """Fetches minor version (first number).

        """
        return int(self.version.split('.')[-1])

    # @property
    # def full_version(self):
    #     return int(self.version)

    def echo(self, save=False) -> None:
        """Marks response from lock.
        
        Should be used on every lock response.

        Args:
            save (bool): Save model immediately or later manually.
        """
=======
    def major_version(self):
        return int(self.version.split('.')[0])

    @property
    def minor_version(self):
        return int(self.version.split('.')[-1])

    @property
    def full_version(self):
        return int(self.version)

    def echo(self, save=False):
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
        self.last_echo = datetime.utcnow()
        if save:
            self.save()

    @classmethod
    def get_instance_by_hash_id(cls, hash_id):
<<<<<<< HEAD
        """Finds lock by hashed uuid.

        Args:
            hash_id (str): given hashed uuid.

        Returns:
            Locks: Lock having that uuid.

        """
        return cls.objects.get(hash_id__exact=hash_id.lower())

    def __str__(self):
        """Converts Lock object to str.

        Returns:
            str: String formatted "Lock <l_id>: <description>".

        """
=======
        return cls.objects.get(hash_id__exact=hash_id.lower())

    def __str__(self):
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
        return f'Lock {self.l_id}: {self.description}'


class Accesses(models.Model):
<<<<<<< HEAD
    """Model, representing accesses of users to rooms.
    
    Attributes:
        self.a_id (int): Internal read-only identificator. Required.
        self.lock (Lock): Lock which the user is given access to.
        self.user (User): User who is granted access.
        self.access_start (DateTime): Time when access starts.
        self.access_stop (DateTime): Time when access ends.

    """
=======
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
    a_id         = models.BigAutoField('a_id', primary_key=True)
    lock         = models.ForeignKey   (Locks,     models.CASCADE, 'l_accesses', null=False,
                                        verbose_name='l_id')
    user         = models.ForeignKey   (UserModel, models.CASCADE, 'u_accesses', null=False,
                                        verbose_name='u_id')
    access_start = models.DateTimeField('access_start', null=False)
    access_stop  = models.DateTimeField('access_stop',  null=False)


class Logs(models.Model):
<<<<<<< HEAD
    """Model, representing access attempts.
    
    Attributes:
        self.lock (Lock): Lock that was attempted to access.
        self.user (UserModel): User who attempted to access.
        self.try_time (DateTime): Time when attempt was made.
        self.result (bool): Attempt result.
        self.is_failed (bool): Is there were any exceptions while checking attempt.
    
    """
    # TODO: Made constraints
    class Meta:
        ordering = ['-try_time']
    
=======
    class Meta:
        ordering = ['-try_time']

>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
    lock      = models.ForeignKey   (Locks,     models.CASCADE, 'l_logs', null=True,
                                     verbose_name='l_id')
    user      = models.ForeignKey   (UserModel, models.CASCADE, 'u_logs', null=True,
                                     verbose_name='u_id')
    try_time  = models.DateTimeField('try_time', null=False)
    result    = models.BooleanField ('result', null=False)
    is_failed = models.BooleanField ('is_failed', null=False, default=False)
