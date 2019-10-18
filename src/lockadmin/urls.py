from django.urls import re_path, path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r'locks', views.LocksViewSet)
router.register(r'accesses', views.AccessesViewSet)
router.register(r'users', views.UserModelViewSet)
router.register(r'logs', views.LogsViewSet)
router.register(r'roles', views.RolesViewSet)


urlpatterns = [
    path('', views.VueIndex),
    path('', include(router.urls)),
    path('lock-api/check-access/', views.check_access),
] + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
