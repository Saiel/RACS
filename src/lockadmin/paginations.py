from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 15 
    page_size_query_param = 'count'
    max_page_size = 100
