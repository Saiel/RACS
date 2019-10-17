from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from hashlib import sha1


from .models import Locks, UserModel


@receiver(post_save, sender=Locks)
def hash_id(sender, **kwargs):
    new_lock = kwargs['instance']
    if new_lock.hash_id:
        return
    new_lock.hash_id = sha1(str(new_lock.l_id).encode('utf-8')).hexdigest()
    new_lock.save()


@receiver(pre_save, sender=UserModel)
def hash_id(sender, **kwargs):
    new_user = kwargs['instance']
    new_user.card_id = new_user.card_id.upper()
    if new_user.hash_id:
        return
    new_user.hash_id = sha1(str(new_user.card_id).encode('utf-8')).hexdigest()
