import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# noinspection SpellCheckingInspection
SECRET_KEY = '+@(8hq)@mnjl8(fcsft1-@k$=6&mu&pl&v0ngvm%^l&(%$&a_q'

LOCK_MASTER_KEY = '5962813a-2b27-422f-8ad8-84b5fd34ca8f'

DEBUG = os.getenv('APP_DEBUG', False)

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'lockadmin',
]

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'lockadmin.paginations.CustomPageNumberPagination'
}

CORS_ORIGIN_ALLOW_ALL = True
ROOT_URLCONF = 'RACS.urls'
WSGI_APPLICATION = 'RACS.wsgi.application'

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
    # if database else {
    #
    # }
}

# noinspection PyUnresolvedReferences
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
          '/var/www/dist'
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


AUTH_USER_MODEL = 'lockadmin.UserModel'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# noinspection PyUnresolvedReferences
STATIC_ROOT = "/var/www/static/"
STATIC_URL = '/dist/'
# noinspection PyUnresolvedReferences
STATICFILES_DIRS = [
  '/var/www/dist'
]
