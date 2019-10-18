FROM python:3.7

ENV PYTHONUNBUFFERED 1

RUN mkdir /var/www && mkdir /var/www/media
WORKDIR /var/www
COPY src/reqs.txt ./

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install -y nodejs
RUN npm install
RUN pip install --upgrade pip && pip install -r reqs.txt