import uuid

from datetime import datetime
from django.db import models
from .auth_models import UserModel
from ..validators import version_validator


class Roles(models.Model):
    r_id = models.AutoField('r_id', primary_key=True)
    name = models.CharField(max_length=50, unique=True)


class Locks(models.Model):
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
    def major_version(self):
        return int(self.version.split('.')[0])

    @property
    def minor_version(self):
        return int(self.version.split('.')[-1])

    @property
    def full_version(self):
        return int(self.version)

    def echo(self, save=False):
        self.last_echo = datetime.utcnow()
        if save:
            self.save()

    @classmethod
    def get_instance_by_hash_id(cls, hash_id):
        return cls.objects.get(hash_id__exact=hash_id.lower())

    def __str__(self):
        return f'Lock {self.l_id}: {self.description}'


class Accesses(models.Model):
    a_id         = models.BigAutoField('a_id', primary_key=True)
    lock         = models.ForeignKey   (Locks,     models.CASCADE, 'l_accesses', null=False,
                                        verbose_name='l_id')
    user         = models.ForeignKey   (UserModel, models.CASCADE, 'u_accesses', null=False,
                                        verbose_name='u_id')
    access_start = models.DateTimeField('access_start', null=False)
    access_stop  = models.DateTimeField('access_stop',  null=False)


class Logs(models.Model):
    class Meta:
        ordering = ['-try_time']

    lock      = models.ForeignKey   (Locks,     models.CASCADE, 'l_logs', null=True,
                                     verbose_name='l_id')
    user      = models.ForeignKey   (UserModel, models.CASCADE, 'u_logs', null=True,
                                     verbose_name='u_id')
    try_time  = models.DateTimeField('try_time', null=False)
    result    = models.BooleanField ('result', null=False)
    is_failed = models.BooleanField ('is_failed', null=False, default=False)
