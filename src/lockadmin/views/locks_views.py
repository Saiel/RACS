"""Module with views that accessed only by locks by default.

"""

from datetime import datetime

from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.mixins import UpdateModelMixin
from rest_framework.request import Request
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from ..models import Accesses, Locks, Logs, UserModel
from ..serializers import RegisterLockSerializer


char_accept = '#'
"""str: character that returns in response on accepted access attempt.

"""
char_denied = '*'
"""str: character that returns in response on refused access attempt.

"""


@api_view(['GET'])
def check_access(request):
    """Checks, if user has privilege to open lock.
    
    Detailed description provided in API documentation.

    Args:
        request (Request): Given request.

    Returns:
        Response: Response with char_access or char_denied and optional header "Error"
    
    See Also:
        https://www.django-rest-framework.org/api-guide/views/#function-based-views.
        
    """
    lock_id_hash: str = request.query_params.get('lock', None)
    user_id_hash: str = request.query_params.get('pass', None)
    if not (lock_id_hash and user_id_hash):
        return Response('Provide "lock" and "pass" query parameters\n',
                        status=status.HTTP_400_BAD_REQUEST
                        )
    now  = datetime.utcnow()

    try:
        lock = Locks.get_instance_by_hash_id(lock_id_hash.lower())
    except ObjectDoesNotExist as exc:
        return Response(char_denied, headers={'Error': str(exc)}, status=403)

    try:
        user = UserModel.get_instance_by_hash_id(user_id_hash.lower())
    except ObjectDoesNotExist as exc:
        Logs.objects.create(result=False,
                            is_failed=True,
                            lock=lock,
                            try_time=now
                            )
        return Response('*', headers={'Error': str(exc)}, status=403)

    result = Accesses.objects.filter(user=user,
                                     lock=lock,
                                     lock__is_approved=True,
                                     access_start__lte=now,
                                     access_stop__gte=now
                                     ).exists()

    result_char = char_accept if result else char_denied

    lock.echo(save=True)
    Logs.objects.create(user=user,
                        lock=lock,
                        result=result,
                        try_time=now)

    return Response(result_char, status=200)


# TODO: think up convenient way to document class based views
class RegisterLock(CreateAPIView):
    """Class based view for lock registration.
    
    Detailed description provided in API documentation.
    
    See Also:
        https://www.django-rest-framework.org/.
        https://www.django-rest-framework.org/api-guide/generic-views/.
    
    """
    queryset = Locks.objects.all()
    serializer_class = RegisterLockSerializer

    def create(self, request, *args, **kwargs):
        """See base classes."""
        master_key = request.data.get('master',  None)
        uuid       = request.data.get('uuid',    None)
        version    = request.data.get('version', None)
        if not (master_key and uuid):
            return Response('Provide "master" and "uuid" query parameters\n',
                            status=status.HTTP_400_BAD_REQUEST)
        if master_key != settings.LOCK_MASTER_KEY:
            return Response(status=status.HTTP_403_FORBIDDEN)
        try:
            lock = Locks.objects.get(uuid__exact=request.data['uuid'])
            lock.version = version or lock.version
            lock.echo(save=True)

            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            super().create(request, *args, **kwargs)
            return Response(status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        """See base classes."""
        serializer.save(description=serializer.validated_data['uuid'], )


@api_view(['GET'])
def echo(request: Request):
    """Handles service requests for monitoring connection to lock.
    
    Detailed description provided in API documentation.

    Args:
        request (Request): Given request.

    Returns:
        Response: response with empty body and 200, 400 or 404 status.

    """
    lock_id = request.query_params.get('lock', None)
    if not lock_id:
        return Response('Provide "lock" query parameter\n',
                        status=status.HTTP_400_BAD_REQUEST)
    try:
        lock = Locks.get_instance_by_hash_id(lock_id)
    except ObjectDoesNotExist:
        return Response(f'Lock with hash "{lock_id}" does not found',
                        status=status.HTTP_404_NOT_FOUND)
    lock.echo(save=True)
    return Response(status=status.HTTP_200_OK)
