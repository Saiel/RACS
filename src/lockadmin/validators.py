import re
from rest_framework.validators import ValidationError


def cyrillic_letters_validator(value):
    if not re.fullmatch(r'[а-яА-ЯёЁ -]*', value):
        raise ValidationError('FIO must contain only cyrillic, spaces and dashes')


def card_validator(value):
    if not re.fullmatch(r'[a-zA-Z\d]*', value):
        raise ValidationError('Card_id must contain only latin and digit character')


def version_validator(value: str):
    if not re.fullmatch(r'\d{1,2}\.\d{1,2}', value):
        raise ValidationError('Version must have format "<major>.<minor>" with <major> '
                              'and <minor> from 0 to 99')
