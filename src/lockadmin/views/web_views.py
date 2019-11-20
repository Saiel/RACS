from django.shortcuts import render
from rest_framework import viewsets, permissions, filters, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from guardian.shortcuts import get_objects_for_user, get_user_perms

from ..serializers import *
from ..models import *


class LocksViewSet(viewsets.ModelViewSet):
    queryset = Locks.objects.all()
    serializer_class = LocksSerializer
    permission_classes = [permissions.IsAdminUser]
    # filterset_fields = ('description',)
    filter_backends = [filters.SearchFilter]
    search_fields = ('$description',)


class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer
    permission_classes = [permissions.IsAdminUser]


class AccessesViewSet(viewsets.ModelViewSet):
    queryset = Accesses.objects.all()
    serializer_class = AccessesSerializer
    permission_classes = [permissions.IsAdminUser]

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
    permission_classes = [permissions.IsAdminUser]


class UserInfo(generics.RetrieveAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


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
        permissions.IsAuthenticated,
        # permissions.IsAdminUser,
    ]
    
    def get(self, request, *args, **kwargs):
        return render(request, 'index.html')
