from django.db.models import QuerySet
from rest_framework import filters


class LogsOfAdminedLocksFilter(filters.BaseFilterBackend):
    
    def filter_queryset(self, request, queryset, view):
        if not request.user.is_superuser:
            return queryset.filter(lock__admined_by__user=request.user)
        else:
            return queryset


class OnlyAdminedLocksFilter(filters.BaseFilterBackend):
    
    def filter_queryset(self, request, queryset, view):
        if not request.user.is_superuser:
            return queryset.filter(admined_by__user=request.user)
        else:
            return queryset


class AccessesOfAdminedLocksFilter(filters.BaseFilterBackend):
    
    def filter_queryset(self, request, queryset, view):
        if not request.user.is_superuser:
            return queryset.filter(lock__admined_by__user=request.user)
        else:
            return queryset
