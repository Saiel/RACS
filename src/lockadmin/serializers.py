from rest_framework import serializers

from .models import *


class LocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locks
        fields = [
            'l_id',
            'description',
            'version'
        ]
        read_only_fields = [
            'l_id',
            'last_echo',
            'is_on'
        ]


class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = ['name']


class AccessesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accesses
        fields = [
            'lock',
            'lock_desc',
            'user',
            'card_id',
            'access_start',
            'access_stop',
        ]
    
    card_id   = serializers.ReadOnlyField(source='user.card_id')
    lock_desc = serializers.ReadOnlyField(source='lock.description')


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = [
            'u_id',
            'email',
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


class LogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logs
        fields = '__all__'
        read_only_fields = [
            'lock',
            'user',
            'try_time',
            'result',
        ]
