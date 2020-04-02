"""Module with views that accessed only by web front-end by default.

"""

import os
from django.shortcuts import render
from django.conf import settings
from rest_framework import viewsets, permissions, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

# from django_filters.rest_framework import DjangoFilterBackend
# from guardian.shortcuts import get_objects_for_user, get_user_perms

from ..serializers import *
from ..models import *

# TODO: enable and test filtering and searching


class LocksViewSet(viewsets.ModelViewSet):
    """Model viewset for Locks model.
    
    Detailed description provided in API documentation.
    
    See Also:
        https://www.django-rest-framework.org/api-guide/viewsets/.
        https://www.django-rest-framework.org/api-guide/permissions/.
        https://www.django-rest-framework.org/api-guide/filtering/
    
    """
    
    queryset = Locks.objects.all()
    serializer_class = LocksSerializer
    permission_classes = [permissions.IsAdminUser]
    # filter_backends = [filters.SearchFilter]
    # filterset_fields = ('description',)
    # search_fields = ('$description',)


class RolesViewSet(viewsets.ModelViewSet):
    """Model viewset for Roles model.

    Detailed description provided in API documentation.

    See Also:
        https://www.django-rest-framework.org/api-guide/viewsets/.
        https://www.django-rest-framework.org/api-guide/permissions/.
        https://www.django-rest-framework.org/api-guide/filtering/

    """

    queryset = Roles.objects.all()
    serializer_class = RolesSerializer
    permission_classes = [permissions.IsAdminUser]


# TODO: delete get_queryset method and make normal filtering
# noinspection DuplicatedCode
class AccessesViewSet(viewsets.ModelViewSet):
    """Model viewset for Accesses model.

    Detailed description provided in API documentation.

    See Also:
        https://www.django-rest-framework.org/api-guide/viewsets/.
        https://www.django-rest-framework.org/api-guide/permissions/.
        https://www.django-rest-framework.org/api-guide/filtering/

    """
    
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
    """Model viewset for UserModel model.

    Detailed description provided in API documentation.

    See Also:
        https://www.django-rest-framework.org/api-guide/viewsets/.
        https://www.django-rest-framework.org/api-guide/permissions/.
        https://www.django-rest-framework.org/api-guide/filtering/

    """
    
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [permissions.IsAdminUser]


# noinspection DuplicatedCode
class LogsViewSet(viewsets.ReadOnlyModelViewSet):
    """Model viewset for Logs model.

    Detailed description provided in API documentation.

    See Also:
        https://www.django-rest-framework.org/api-guide/viewsets/.
        https://www.django-rest-framework.org/api-guide/permissions/.
        https://www.django-rest-framework.org/api-guide/filtering/

    """
    
    queryset = Logs.objects.all()
    serializer_class = LogsSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        queryset = Logs.objects.all()

        u_id = self.request.query_params.get('u_id', None)
        lock = self.request.query_params.get('lock', None)

        if u_id is not None:
            queryset = queryset.filter(user=u_id)

        if lock is not None:
            queryset = queryset.filter(lock=lock)

        return queryset


class UserInfo(generics.RetrieveAPIView):
    """Class based view for retrieve user information.

    Detailed description provided in API documentation.

    See Also:
        https://www.django-rest-framework.org/api-guide/viewsets/.
        https://www.django-rest-framework.org/api-guide/permissions/.
        https://www.django-rest-framework.org/api-guide/filtering/

    """
    
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class VueIndex(APIView):
    """Class based view. Gives default html page with bundled js script.

    Detailed description provided in API documentation.

    See Also:
        https://www.django-rest-framework.org/api-guide/generic-views/.
        https://www.django-rest-framework.org/api-guide/permissions/.
        https://www.django-rest-framework.org/api-guide/filtering/

    """

    def get(self, request, *args, **kwargs):
        return render(request, 'index.html')


@api_view(['GET'])
def get_server_start_time(request):
    """Gives time in ISO 8601 format to calculate server uptime.
    
    Detailed description provided in API documentation.
    
    Args:
        request (Request): Any GET request.
        
    Returns:
        Response: Response with "datetime" and optional "Error" body fields.
    
    """
    result = {'datetime': ''}
    try:
        with open(os.path.join(settings.BASE_DIR, 'datestart.utcdatetime'), 'r') as ds_file:
            result['datetime'] = ds_file.readline()
            return Response(result, status=status.HTTP_200_OK)
    except FileNotFoundError:
        # Should not be here
        result['Error'] = 'Start file not found'
        return Response(result, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
