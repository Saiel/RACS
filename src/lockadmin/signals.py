from django.db.models.signals import pre_save
from django.dispatch import receiver
from hashlib import sha1


from .models import Locks, UserModel


@receiver(pre_save, sender=Locks)
def hash_lock_id(sender, **kwargs):
    new_lock = kwargs['instance']
    
    new_lock.hash_id = sha1(str(new_lock.uuid).encode('utf-8')).hexdigest()


@receiver(pre_save, sender=UserModel)
def hash_card_id(sender, **kwargs):
    new_user = kwargs['instance']

    new_user.card_id = new_user.card_id.upper()
    length = len(new_user.card_id)
    if length != 6:
        new_user.card_id = new_user.card_id[length-6:]

    new_user.hash_id = sha1(str(new_user.card_id).encode('utf-8')).hexdigest()
