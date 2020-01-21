cp -r /tmp/node_modules /var/www
npm run build
python manage.py makemigrations lockadmin
python manage.py migrate
rm -rf static
python manage.py collectstatic
uwsgi --ini configs/uwsgi/uwsgi.ini
