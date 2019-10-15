from django.apps import AppConfig
from django.db.models.signals import post_save
from django.dispatch import receiver


from datetime import datetime


class LockadminConfig(AppConfig):
    name = 'lockadmin'
    
    def ready(self):
        with open('datestart.utcdatetime', 'w') as date_start_file:
            date_start_file.write(str(datetime.utcnow()))
        from . import signals
        return True
