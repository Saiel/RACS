from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from ..serializers import *
from ..models import *


class LocksViewSet(viewsets.ModelViewSet):
    queryset = Locks.objects.all()
    serializer_class = LocksSerializer
    # permission_classes = [permissions.IsAdminUser]


class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer


class AccessesViewSet(viewsets.ModelViewSet):
    queryset = Accesses.objects.all()
    serializer_class = AccessesSerializer

    def get_queryset(self): 
      queryset = Accesses.objects.all()

      u_id = self.request.query_params.get('u_id', None)

      if u_id is not None:
        queryset = queryset.filter(user=u_id)

      return queryset


class UserModelViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer


class LogsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Logs.objects.all()
    serializer_class = LogsSerializer


class VueIndex(APIView):
    permission_classes = [
    #     permissions.IsAuthenticated,
    #     permissions.IsAdminUser,
    ]
    
    def get(self, request, *args, **kwargs):
        return render(request, 'index.html')
