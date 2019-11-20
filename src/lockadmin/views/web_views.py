from django.shortcuts import render
from rest_framework import viewsets, permissions, filters
from rest_framework.views import APIView
from rest_framework.response import Response
# from django_filters.rest_framework import DjangoFilterBackend
# from guardian.shortcuts import get_objects_for_user, get_user_perms

from ..serializers import *
from ..models import *


class LocksViewSet(viewsets.ModelViewSet):
    queryset = Locks.objects.all()
    serializer_class = LocksSerializer
    permission_classes = [permissions.IsAdminUser]
    # filter_backends = [filters.SearchFilter]
    # filterset_fields = ('description',)
    # search_fields = ('$description',)


class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer
    permission_classes = [permissions.IsAdminUser]


class AccessesViewSet(viewsets.ModelViewSet):
    queryset = Accesses.objects.all()
    serializer_class = AccessesSerializer
    permission_classes = [permissions.IsAdminUser]


class UserModelViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [permissions.IsAdminUser]


class LogsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Logs.objects.all()
    serializer_class = LogsSerializer
    permission_classes = [permissions.IsAdminUser]


class VueIndex(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
        # permissions.IsAdminUser,
    ]
    
    def get(self, request, *args, **kwargs):
        return render(request, 'index.html')
