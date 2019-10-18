from django.urls import re_path, path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import handler404
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register('locks', views.LocksViewSet)
router.register('accesses', views.AccessesViewSet)
router.register('users', views.UserModelViewSet)
router.register('logs', views.LogsViewSet)
router.register('roles', views.RolesViewSet)


urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('lock-api/check-access/', views.check_access),
] + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)