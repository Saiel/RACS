from django.db.models.signals import pre_save
from django.dispatch import receiver
from hashlib import sha1


from .models import Locks, UserModel


@receiver(pre_save, sender=Locks)
def hash_lock_id(sender, **kwargs):
    new_lock = kwargs['instance']
    print(new_lock.l_id.__class__)
    if new_lock.hash_id:
        return
    new_lock.hash_id = sha1(str(new_lock.l_id).encode('utf-8')).hexdigest()


@receiver(pre_save, sender=UserModel)
def hash_card_id(sender, **kwargs):
    new_user = kwargs['instance']
    new_user.card_id = new_user.card_id.upper()
    if new_user.hash_id:
        return
    new_user.hash_id = sha1(str(new_user.card_id).encode('utf-8')).hexdigest()
