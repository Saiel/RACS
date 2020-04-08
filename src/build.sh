cp -r /tmp/node_modules /var/www
npm run build
python manage.py makemigrations lockadmin
python manage.py migrate
rm -rf static
python manage.py collectstatic
#python manage.py runserver 0.0.0.0:8000
python manage.py runcrons
uwsgi --ini configs/uwsgi/uwsgi.ini
