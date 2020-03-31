<<<<<<< HEAD
"""Module with validators.

"""

=======
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
import re
from rest_framework.validators import ValidationError


<<<<<<< HEAD
def cyrillic_letters_validator(value) -> None:
    """Validates if value contains only cyrillic letters, spaces and dashes.
    
    Args:
        value (str): Testing string.
    
    Raises:
        ValidationError: Error, occurred when string contains not listed characters.

    """
=======
def cyrillic_letters_validator(value):
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
    if not re.fullmatch(r'[а-яА-ЯёЁ -]*', value):
        raise ValidationError('FIO must contain only cyrillic, spaces and dashes')


def card_validator(value):
<<<<<<< HEAD
    """Validates if value contains only latin characters and digits.
    
    Args:
        value (str) : Testing string.
        
    Raises:
        ValidationError: Error, occurred when string contains not listed characters.
    
    """
    
=======
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
    if not re.fullmatch(r'[a-zA-Z\d]*', value):
        raise ValidationError('Card_id must contain only latin and digit character')


def version_validator(value: str):
<<<<<<< HEAD
    """Validates if value has 1 to 2 digits around dot ("d.d", "d.dd", "dd.d" or "d.d").
    
    Args:
        value (str): Testing string.
    
    Raises:
        ValidationError: Error, occurred when string does not fit to format.
        
    """
    
=======
>>>>>>> 504c5d7b166641875bcf20f0f5da5de61d734ea4
    if not re.fullmatch(r'\d{1,2}\.\d{1,2}', value):
        raise ValidationError('Version must have format "<major>.<minor>" with <major> '
                              'and <minor> from 0 to 99')
