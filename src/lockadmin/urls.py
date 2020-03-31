<<<<<<< HEAD
"""Module with url routes related to lockadmin app.

Detailed description provided in API documentation.

See Also:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/.
    https://www.django-rest-framework.org/api-guide/routers/.

"""

=======
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

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
    path('echo/', views.echo),
]

api_urls_patterns_v1 = [
    path('',               include(router.urls)),
    path('start-time/', views.get_server_start_time),
    path('get-user-info/', views.UserInfo.as_view()),
    path('token/auth/',    TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]

urlpatterns = [
    path('',             views.VueIndex.as_view()),
    path('api/v1/',      include(api_urls_patterns_v1)),
    path('lock-api/',    include(locks_urls_patterns_v1)),  # deprecated
    path('lock-api/v1/', include(locks_urls_patterns_v1)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
