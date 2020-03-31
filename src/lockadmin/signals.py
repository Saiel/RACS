<<<<<<< HEAD
"""Module with signals.

See Also:
    https://docs.djangoproject.com/en/2.2/ref/signals/.
    https://docs.djangoproject.com/en/2.2/topics/signals/.

"""

=======
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
from django.db.models.signals import pre_save
from django.dispatch import receiver
from hashlib import sha1


from .models import Locks, UserModel


@receiver(pre_save, sender=Locks)
<<<<<<< HEAD
def hash_lock_id(sender: Locks.__class__, **kwargs):
    """Hashes uuid of lock just before saving it in database.
    
    """
    
=======
def hash_lock_id(sender, **kwargs):
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
    new_lock = kwargs['instance']
    
    new_lock.hash_id = sha1(str(new_lock.uuid).encode('utf-8')).hexdigest()


@receiver(pre_save, sender=UserModel)
<<<<<<< HEAD
def hash_card_id(sender: UserModel.__class__, **kwargs):
    """Hashes User's card_id just before saving it in database.
    
    Also unify to uppercase card_id and cut card_id to 6 characters length.
    
    """
    
=======
def hash_card_id(sender, **kwargs):
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
    new_user = kwargs['instance']

    new_user.card_id = new_user.card_id.upper()
    length = len(new_user.card_id)
    if length != 6:
        new_user.card_id = new_user.card_id[length-6:]
    
    new_user.hash_id = sha1(str(new_user.card_id).encode('utf-8')).hexdigest()
