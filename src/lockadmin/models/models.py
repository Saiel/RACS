from django.db import models
from .auth_models import UserModel


class Roles(models.Model):
    name = models.CharField(primary_key=True, max_length=50)


class Locks(models.Model):
    l_id        = models.BigAutoField ('l_id',        primary_key=True, db_column='l_id')
    hash_id     = models.CharField    ('hash_id',     null=False, blank=False, max_length=256)
    description = models.TextField    ('description', null=False, blank=True,  max_length=200)
    is_on       = models.BooleanField ('is_on',       null=False, default=True)
    version     = models.IntegerField ('version',     null=False)
    last_echo   = models.DateTimeField('last_echo',   null=False, auto_now_add=True)
    
    @classmethod
    def get_instance_by_hash_id(cls, hash_id):
        return cls.objects.get(hash_id__exact=hash_id)
    
    def __str__(self):
        return f'Lock {self.l_id}: {self.description}'


class Accesses(models.Model):
    lock         = models.ForeignKey   (Locks,     models.CASCADE, 'l_accesses', null=False,
                                        verbose_name='l_id', db_column='l_id_id')
    user         = models.ForeignKey   (UserModel, models.CASCADE, 'u_accesses', null=False,
                                        verbose_name='u_id', db_column='u_id_id')
    access_start = models.DateTimeField('access_start', null=False)
    access_stop  = models.DateTimeField('access_stop',  null=False)


class Logs(models.Model):
    lock     = models.ForeignKey   (Locks,     models.CASCADE, 'l_logs', null=False,
                                    verbose_name='l_id')
    user     = models.ForeignKey   (UserModel, models.CASCADE, 'u_logs', null=False,
                                    verbose_name='u_id')
    try_time = models.DateTimeField('try_time', null=False)
    result   = models.BooleanField ('result', null=False)
