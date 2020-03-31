<<<<<<< HEAD
"""Module with pagination classes.

See Also:
    https://www.django-rest-framework.org/api-guide/pagination/.

"""

=======
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
<<<<<<< HEAD
    """Simple custom pagination class to customize parameters.
    
    See Also:
    https://www.django-rest-framework.org/api-guide/pagination/.
    
    """

=======
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
    page_size = 15 
    page_size_query_param = 'count'
    max_page_size = 100
