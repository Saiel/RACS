"""Module with serializers.

See Also:
    https://www.django-rest-framework.org/api-guide/serializers/.
    https://www.django-rest-framework.org/api-guide/fields/.
    https://www.django-rest-framework.org/api-guide/relations/.

"""

from rest_framework import serializers

from .models import *
from . import validators


class RegisterLockSerializer(serializers.ModelSerializer):
    """Serializer for lock registration.
    
    """
    
    class Meta:
        model = Locks
        fields = [
            'uuid',
            'version',
            'gmail',
        ]
        extra_kwargs = {
            'uuid': {
                'required': True,
            },
            'version': {
                'required': True,
                'validators': [validators.version_validator]
            },
            'gmail': {
                'required': False,
            }
        }


class LocksSerializer(serializers.ModelSerializer):
    """General purpose serializer for lock.
    
    """
    
    class Meta:
        model = Locks
        fields = [
            'l_id',
            'uuid',
            'description',
            'version',
            'is_approved',
            'last_echo',
            'is_on',
            'gmail',
        ]
        read_only_fields = [
            'l_id',
            'uuid',
            'last_echo',
            'is_on',
            'gmail'
        ]
        extra_kwargs = {
            'version': {
                'required': True,
                'validators': [validators.version_validator]
            }
        }


class RolesSerializer(serializers.ModelSerializer):
    """General purpose serializer for Roles.

    """
    
    class Meta:
        model = Roles
        fields = ['r_id', 'name']
        read_only_fields = [
            'r_id',
        ]


class AccessesSerializer(serializers.ModelSerializer):
    """General purpose serializer for access.
    
    """
    
    class Meta:
        model = Accesses
        fields = [
            'a_id',
            'lock',
            'lock_desc',
            'user',
            'card_id',
            'access_start',
            'access_stop',
            'user_fio',
            'added_by',
        ]
        read_only_fields = [
            'a_id',
            'lockadmins'
        ]
    
    card_id   = serializers.ReadOnlyField(source='user.card_id')
    lock_desc = serializers.ReadOnlyField(source='lock.description')
    user_fio = serializers.ReadOnlyField(source='user.short_name')


class UserModelSerializer(serializers.ModelSerializer):
    """General purpose serializer for user.

    """
    
    class Meta:
        model = UserModel
        fields = [
            'u_id',
            'email',
            # 'password',
            'first_name',
            'last_name',
            'patronymic',
            'card_id',
            'role',
            'is_superuser',
            'is_staff',
        ]
        read_only_fields = [
            'u_id',
            'is_superuser',
        ]
        extra_kwargs = {
            # 'password': {
            #     'write_only': True,
            #     'default': '',
            # },
            'first_name': {
                'validators': [validators.cyrillic_letters_validator],
            },
            'last_name': {
                'validators': [validators.cyrillic_letters_validator],
            },
            'patronymic': {
                'validators': [validators.cyrillic_letters_validator],
            },
            'card_id': {
                'validators': [validators.card_validator],
            },
        }


class LogsSerializer(serializers.ModelSerializer):
    """General purpose serializer for log.

    """
    
    class Meta:
        model = Logs
        fields = '__all__'
        read_only_fields = [
            'lock',
            'user',
            'try_time',
            'result',
            'is_failed',
            'user_fio',
            'lock_desc'
        ]

    user_fio = serializers.ReadOnlyField(source='user.short_name')
    lock_desc = serializers.ReadOnlyField(source='lock.description')


class LockAdminsSerializer(serializers.ModelSerializer):
    """General purpose serializer for LockAdmins.
    
    """
    
    class Meta:
        model = LockAdmins
        fields = '__all__'
