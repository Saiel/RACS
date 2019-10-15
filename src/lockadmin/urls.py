from django.urls import re_path, path, include
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r'locks', views.LocksViewSet)
router.register(r'accesses', views.AccessesViewSet)
router.register(r'users', views.UserModelViewSet)
router.register(r'logs', views.LogsViewSet)
router.register(r'roles', views.RolesViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('lock-api/check-access/', views.check_access),
]
