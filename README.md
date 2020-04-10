# Система контроля и управления доступом.
В данном репозитории хранится веб часть проекта СКУД.

Сервис представляет собой два docker-контейнера: backend+frontend и база данных.

* **Backend** - Django проект с использоваением restframework, написанный на python 3.7
* **Frontend** - REACT с использоавнием webpack.
* **База данных** - один из docker-образов: 
    * **postgres**
    * **bitnami/postgresql**

## Развертка сервиса
1. Установите docker и docker-compose для вашей системы

    **Внимание:** docker не поддерживатеся на Windows отличной от версий Pro, 
    Enterprise и Education. Рекомендуется использование Linux. 
    
    https://docs.docker.com/engine/install/
    
    https://docs.docker.com/compose/install/

2. Склонируйте этот репозиторий в целевую папку и перейдите в нее
    ```shell script
    $ git clone https://git.miem.hse.ru/19105/ac-web.git
    $ cd ac-web
    ```
3. Соберите образ web
    ```shell script
    $ sudo docker-compose build web
    ``` 
4. Создайте файл .env и определите следующие переменные:
    * APP_DEBUG - Отладочный режим django. Принимает значения true или false.
    * LOCK_MASTER_KEY - Мастер ключ для замков.
    * POSTGRES_HOST - Адрес, через который доступна база данных. По умолчанию должно быть ```db```. 
    * POSTGRES_PORT - Порт, через который доступна база данных. По умолчанию - ```5432```.
    * POSTGRESQL_DATABASE - Название базы данных. По умолчанию ```RACS_db```.
    * POSTGRESQL_USERNAME - Имя пользователя по умолчанию. По умолчанию ```RACS```
    * POSTGRESQL_PASSWORD - Пароль от базы данных пользователя по умолчанию.
    * POSTGRESQL_POSTGRES_PASSWORD - Пароль для суперпользователя postgres.
    * POSTGRESQL_REPLICATION_MODE - Режим репликации базы данных. Может принимать значения 
    ```master``` и ```slave``` 
    * POSTGRESQL_REPLICATION_USER - Имя пользователя с правами на репликацию (для slave).
    * POSTGRESQL_REPLICATION_PASSWORD - Пароль для пользователя с правами на репликацию (для slave).
    * POSTGRES_USERNAME - то же, что и POSTGRESQL_USERNAME. По умолчанию ```$POSTGRESQL_USERNAME``` 
    * POSTGRES_DATABASE - то же, что и POSTGRESQL_DATABASE. По умолчанию ```$POSTGRESQL_DATABASE``` 
    * POSTGRES_PASSWORD - то же, что и POSTGRESQL_PASSWORD. По умолчанию ```$POSTGRESQL_PASSWORD```
    Причиной  наличия дублирующихся параметров является возможное использование разных docker-образов для postgresql.
    
    Подробнее:
    
    https://hub.docker.com/_/postgres
    
    https://hub.docker.com/r/bitnami/postgresql
5. Запустите контейнеры в первый раз и сразу же выключите
    ```shell script
    $ sudo docker-compose up
   ^C
    ```
6. Рекурсивно измените права для новой папки log
    ```shell script
    $ sudo chmod -R a+rw log
    ``` 
7. Запустите контейнеры
    ```shell script
    $ sudo docker-compose up -d
    ``` 

Теперь сервис доступен на порту 8000 для веб запросов и на 5432 для подключения к базе данных.

При изменении кода backend произвести перезагрузку uWSGI командой ```touch touch-reload``` из папки src.

## Развертка сервиса для front-end разработки
1. Установить node.js https://nodejs.org/ru/download/
2. После клонирования репозитория проекта перейти в src и установить зависимости
    ```shell script
    $ cd src
    $ npm install
    ```
    Иногда может потребоваться установка дополнительных модулей. Например на Windows:
    ```shell script
    $ npm install sass-loader
    ```
3. Пропишите в файле ```src/src/api/index.ts``` ip и порт, откуда доступен backend:
    ```typescript
    // если запущено локально
    export const API_URL = 'http://127.0.0.1:8000/api/v1/';
    export const BASE_URL = 'http://127.0.0.1:8000/';
    ```
4. В файле src/index.html изменить путь к скрипту:
    ```html
    ...
    <script src='/dist/bundle.js'></script>
    ...
    ```
5. При использовании Windows замените на 9 строке команду ```cp``` на ```copy```
    ```json
    {
        ...
        "build-dev": "webpack --hide-modules -d && copy src/index.html dist/index.html",
        "build": "webpack --hide-modules -p && copy src/index.html dist/index.html",
        ...
    }
    ```
6. Выполнить сборку для разработки:
    ```shell script
    $ npm run dev
    ```
    После чего frontend часть будет доступна по 9000
    порту на локальном устройстве и будет пересобираться при изменении кода.
   
Для коммита изменных здесь файлов требуется установить эти строки в исходное состояние.