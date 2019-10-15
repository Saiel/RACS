FROM python:3.7

ENV PYTHONUNBUFFERED 1

RUN mkdir /var/www && mkdir /var/www/media
WORKDIR /var/www
COPY src/reqs.txt ./

RUN pip install --upgrade pip && pip install -r reqs.txt