npm run build && 
python manage.py makemigrations && 
python manage.py migrate && 
rm -rf static && 
python manage.py collectstatic && 
python manage.py runserver 0.0.0.0:8000
