from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UserModelManager(BaseUserManager):
    use_in_migrations = True
    
    def _create_user(self, email, first_name, last_name, card_id, password, **extra_field):
        if not email:
            raise ValueError('Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, card_id=card_id, **extra_field)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email=email, password=password, **extra_fields)
    
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email=email, password=password, **extra_fields)
    

class UserModel(AbstractBaseUser, PermissionsMixin):
    u_id         = models.BigAutoField('u_id',         primary_key=True)
    
    role         = models.ForeignKey  ('Roles', models.CASCADE, 'role', null=True, db_index=False)
    hash_id      = models.CharField   ('hash_id',      null=False, blank=False, max_length=256)
    email        = models.EmailField  ('email',        null=False, blank=False, max_length=64,
                                       unique=True, db_index=True)
    first_name   = models.CharField   ('first_name',   null=False, blank=False, max_length=50)
    last_name    = models.CharField   ('last_name',    null=False, blank=False, max_length=50)
    patronymic   = models.CharField   ('patronymic',   null=False, blank=True,  max_length=50)
    card_id      = models.CharField   ('card_id',      null=False, blank=False, max_length=10)
    is_staff     = models.BooleanField('is_staff', null=False, default=False)
    
    objects = UserModelManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD    = 'email'
    REQUIRED_FIELDS = [
        'first_name',
        'last_name',
        'card_id',
    ]
    
    @classmethod
    def get_instance_by_hash_id(cls, hash_id):
        return cls.objects.get(hash_id__exact=hash_id)
    
    @property
    def full_name(self):
        name = f'{self.last_name} {self.first_name}'
        if self.patronymic:
            # noinspection PyTypeChecker
            name += ' ' + self.patronymic
        return name
    
    @property
    def short_name(self):
        return f'{self.last_name} {self.first_name}'
    
    def __str__(self):
        return self.email
