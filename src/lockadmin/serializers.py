from rest_framework import serializers

from .models import *
from . import validators


class RegisterLockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locks
        fields = [
            'uuid',
            'master',
            'version',
        ]
        extra_kwargs = {
            'uuid': {
                'required': True,
            },
            'version': {
                'required': True,
            }
        }

    master = serializers.UUIDField(required=True, write_only=True)


class LocksSerializer(serializers.ModelSerializer):
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
        ]
        read_only_fields = [
            'l_id',
            'uuid',
            'last_echo',
            'is_on'
        ]


class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = ['r_id', 'name']
        read_only_fields = [
            'r_id',
        ]


class AccessesSerializer(serializers.ModelSerializer):
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
        ]
        read_only_fields = [
            'a_id'
        ]
    
    card_id   = serializers.ReadOnlyField(source='user.card_id')
    lock_desc = serializers.ReadOnlyField(source='lock.description')


class UserModelSerializer(serializers.ModelSerializer):
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
            'is_superuser'
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
    class Meta:
        model = Logs
        fields = '__all__'
        read_only_fields = [
            'lock',
            'user',
            'try_time',
            'result',
            'is_failed'
        ]
