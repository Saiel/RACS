<<<<<<< HEAD
"""WSGI config for RACS project.
=======
"""
WSGI config for RACS project.
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
<<<<<<< HEAD

=======
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'RACS.settings')

application = get_wsgi_application()
