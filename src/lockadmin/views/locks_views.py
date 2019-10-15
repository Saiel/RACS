from rest_framework.decorators import api_view
from rest_framework.request import Request
from datetime import datetime

from rest_framework.response import Response

from ..models import Accesses, Locks, Logs, UserModel


@api_view(['GET'])
def check_access(request: Request):
    lock_id_hash = request.query_params['lock']
    user_id_hash = request.query_params['pass']
    user = UserModel.get_instance_by_hash_id(user_id_hash)
    lock = Locks.get_instance_by_hash_id(lock_id_hash)
    now  = datetime.utcnow()
    result = Accesses.objects.filter(user=user, lock=lock, access_start__lte=now, access_stop__gte=now).exists()
    Logs.objects.create(user=user, lock=lock, result=result, try_time=now)
    return Response(int(result), status=200)
