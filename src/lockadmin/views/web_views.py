import os
from django.shortcuts import render
from django.conf import settings
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view


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
      lock = self.request.query_params.get('lock', None)

      if u_id is not None:
        queryset = queryset.filter(user=u_id)

      if lock is not None:
        queryset = queryset.filter(lock=lock)

      return queryset


class UserModelViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer


class LogsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Logs.objects.all()
    serializer_class = LogsSerializer

    def get_queryset(self):
      queryset = Logs.objects.all()

      u_id = self.request.query_params.get('u_id', None)
      lock = self.request.query_params.get('lock', None)

      if u_id is not None:
        queryset = queryset.filter(user=u_id)

      if lock is not None:
        queryset = queryset.filter(lock=lock)

      return queryset


class VueIndex(APIView):
    permission_classes = [
    #     permissions.IsAuthenticated,
    #     permissions.IsAdminUser,
    ]
    
    def get(self, request, *args, **kwargs):
        return render(request, 'index.html')


@api_view(['GET'])
def get_server_start_time(request):
    result = {'datetime': ''}
    try:
        with open(os.path.join(settings.BASE_DIR, 'datestart.utcdatetime'), 'r') as ds_file:
            result['datetime'] = ds_file.readline()
            return Response(result, status=status.HTTP_200_OK)
    except FileNotFoundError:
        # Should not be here
        result['Errors'] = 'Start file not found'
        return Response(result, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
