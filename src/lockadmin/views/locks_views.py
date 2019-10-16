from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from rest_framework.request import Request
from datetime import datetime

from rest_framework.response import Response

from ..models import Accesses, Locks, Logs, UserModel


@api_view(['GET'])
def check_access(request: Request):
    lock_id_hash: str = request.query_params['lock']
    user_id_hash: str = request.query_params['pass']
    try:
        user = UserModel.get_instance_by_hash_id(user_id_hash.lower())
        lock = Locks.get_instance_by_hash_id(lock_id_hash.lower())
    except ObjectDoesNotExist as exc:
        return Response('*', headers={'Error': str(exc)})
    now  = datetime.utcnow()
    result = Accesses.objects.filter(user=user, lock=lock, access_start__lte=now, access_stop__gte=now).exists()
    if result:
        result_char = '#'
    else:
        result_char = '*'
    Logs.objects.create(user=user, lock=lock, result=result, try_time=now)
    return Response(result_char, status=200)
