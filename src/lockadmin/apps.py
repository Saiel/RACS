"""Module with Lockadmin application config.

See Also:
    https://docs.djangoproject.com/en/2.2/ref/applications/.
    https://docs.djangoproject.com/en/2.2/ref/signals/
    https://docs.djangoproject.com/en/2.2/topics/signals/

"""

from django.apps import AppConfig
from django.db.models.signals import post_save
from django.dispatch import receiver


from datetime import datetime


class LockadminConfig(AppConfig):
    """Lockadmin app config. See https://docs.djangoproject.com/en/2.2/ref/applications/.
    
    """
    name = 'lockadmin'
    
    def ready(self):
        """Saves server start time and initializes signals.
        
        """
        with open('datestart.utcdatetime', 'w') as date_start_file:
            date_start_file.write(str(datetime.utcnow()))
        from . import signals
        return True
