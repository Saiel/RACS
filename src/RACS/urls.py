"""Module with root routing.

"""

from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', include('lockadmin.urls')),
    path('auth/', include('rest_framework.urls')),
    path('api/v1/', include('lockadmin.urls')),
]
