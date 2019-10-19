FROM python:3.7

ENV PYTHONUNBUFFERED 1

RUN mkdir /var/www && mkdir /var/www/media
WORKDIR /var/www
COPY src/reqs.txt ./
COPY src/package-lock.json /tmp
COPY src/package.json /tmp

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install -y nodejs
RUN cd /tmp && npm install
RUN pip install --upgrade pip && pip install -r reqs.txt