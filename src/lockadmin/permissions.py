from rest_framework import permissions

from .models import UserModel

# TODO: maybe move all this to get_queryset methods of viewsets


class IsLockAdmin(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        return bool(obj.admined_by.filter(user=request.user).exists()
                    or request.user.is_superuser)
    
    def has_permission(self, request, view):
        if request.method == 'POST':
            return bool(request.user and request.user.is_superuser)
        else:
            return True


class IsAbleToManageAccesses(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        return bool(obj.lock.admined_by.filter(user=request.user).exists()
                    or request.user.is_superuser)


class ForbidCreating(permissions.BasePermission):
    
    def has_permission(self, request, view):
        if request.method == 'POST':
            return bool(request.user and request.user.is_superuser)
        else:
            return True


class IsSuperuserOrReadOnly(permissions.BasePermission):
    
    def has_permission(self, request, view):
        return bool(
                request.method in permissions.SAFE_METHODS or
                request.user and
                request.user.is_authenticated
        )


class DefendFromIsStaffChanging(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.method in ('PUT', 'PATCH') and not request.user.is_superuser:
            user = UserModel.objects.filter(pk=request.data.get('u_id'))
            if not user.exists():
                return False
            user = user.first()
            if user.is_staff != request.data.get('is_staff', user.is_staff):
                return False
        
        return True
