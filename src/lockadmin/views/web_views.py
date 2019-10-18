from django.shortcuts import render
from rest_framework import viewsets

from ..serializers import *
from ..models import *


class LocksViewSet(viewsets.ModelViewSet):
    queryset = Locks.objects.all()
    serializer_class = LocksSerializer


class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer


class AccessesViewSet(viewsets.ModelViewSet):
    queryset = Accesses.objects.all()
    serializer_class = AccessesSerializer


class UserModelViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer


class LogsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Logs.objects.all()
    serializer_class = LogsSerializer

def VueIndex(request, *args, **kwargs):
  return render(request, 'index.html')