from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path, include
from rest_framework import urls

urlpatterns = [
    # url('^admin', admin.site.urls),
    path('api/v1/', include('lockadmin.urls')),
    path('', include('lockadmin.urls'))
    # url(r'^auth/', include('rest_framework.urls')),
]
