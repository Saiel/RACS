"""Module with pagination classes.

See Also:
    https://www.django-rest-framework.org/api-guide/pagination/.

"""

from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
    """Simple custom pagination class to customize parameters.
    
    See Also:
    https://www.django-rest-framework.org/api-guide/pagination/.
    
    """

    page_size = 15 
    page_size_query_param = 'count'
    max_page_size = 100
