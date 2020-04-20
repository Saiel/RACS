"""Module with models, related to UserModel

Models in this module:
    UserModel

See Also:
    https://docs.djangoproject.com/en/2.2/ref/models/.

"""
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UserModelManager(BaseUserManager):
    """Model manager for UserModel
    
    """
    use_in_migrations = True

    def _create_user(self, email, first_name, last_name,
                     card_id, password, **extra_fields):
        """Internal function for creating User. Should not be used explicitly.

        Args:
            email (str): User's e-mail. Validates by EmailValidator.
            first_name (str): User's first name.
            last_name (str): User's last name.
            card_id (str): User's card id. Should be 6 characters length or less.
            password (str): User's password.
            **extra_fields: Other UserModel fields.

        Returns:
            UserModel: created user.

        """
        if not email:
            raise ValueError('Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, card_id=card_id, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        """Function for creating regular user.

        Args:
            email (str): User's e-mail. Validates by EmailValidator.
            password (str): User's password.
            **extra_fields: Other UserModel fields.

        Returns:
            UserModel: created user.

        """
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email=email, password=password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Convenient function for creating superusers.

        Args:
            email (str): User's e-mail. Validates by EmailValidator.
            password (str): User's password.
            **extra_fields: Other UserModel fields.

        Returns:
            UserModel: created superuser.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email=email, password=password, **extra_fields)


class UserModel(AbstractBaseUser, PermissionsMixin):
    """Model for user.
    
    Attributes:
        self.u_id (int): Internal read-only identificator.
        self.role (str): User's role.
        self.hash_id (str): Read-only hashed card_id.
        self.email (str): User's e-mail. Validates by EmailValidator. Uses as username.
        self.first_name (str): User's first name. Required.
        self.last_name (str): User's last name. Required.
        self.patronymic (str): User's patronymic.
        self.card_id (str): User's card id. Hashes before saving by signal pre_save (signals.py). Required
        self.is_staff (bool): Does user have locks to manage. Default False.
        self.objects (UserModelManager): Standard django ModelManager field.
    
    """
    
    class Meta:
        ordering = [
            'last_name',
            'first_name',
            'patronymic',
            'email'
        ]
        
    u_id         = models.BigAutoField('u_id',         primary_key=True)

    role         = models.ForeignKey  ('Roles', models.CASCADE, 'role', to_field='name', null=True, db_index=False)
    # TODO: index hash_id
    # TODO: resolve collisions
    hash_id      = models.CharField   ('hash_id',      null=False, blank=False, max_length=256,
                                       unique=True)
    email        = models.EmailField  ('email',        null=False, blank=False, max_length=64,
                                       unique=True, db_index=True)
    first_name   = models.CharField   ('first_name',   null=False, blank=False, max_length=50)
    last_name    = models.CharField   ('last_name',    null=False, blank=False, max_length=50)
    patronymic   = models.CharField   ('patronymic',   null=False, blank=True,  max_length=50)
    card_id      = models.CharField   ('card_id',      null=False, blank=False, max_length=10,
                                       unique=True)
    is_staff     = models.BooleanField('is_staff',     null=False, default=False)

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
        """Finds user by hashed card_id.
        
        Args:
            hash_id (str): given hashed card_id.

        Returns:
            UserModel: User having that hash_id.

        """
        return cls.objects.get(hash_id__exact=hash_id.lower())

    @property
    def full_name(self) -> str:
        """Constructs user's full name.
        
        """
        name = f'{self.last_name} {self.first_name}'
        if self.patronymic:
            name += ' ' + self.patronymic
        return name

    @property
    def short_name(self) -> str:
        """Constructs user's short name (without patronymic).

        """
        return f'{self.last_name} {self.first_name}'

    def __str__(self):
        """Converts UserModel object to str.
        
        Returns:
            str: User's e-mail.
        """
        return self.email
