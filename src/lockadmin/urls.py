from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register('locks',    views.LocksViewSet)
router.register('accesses', views.AccessesViewSet)
router.register('users',    views.UserModelViewSet)
router.register('logs',     views.LogsViewSet)
router.register('roles',    views.RolesViewSet)


locks_urls_patterns_v1 = [
    path('check-access/', views.check_access),
    path('register-lock/', views.RegisterLock.as_view()),
]


urlpatterns = [
    path('',             views.VueIndex.as_view()),
    path('api/v1/',      include(router.urls)),
    path('lock-api/',    include(locks_urls_patterns_v1)),  # deprecated
    path('lock-api/v1/', include(locks_urls_patterns_v1)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
