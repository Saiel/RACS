#!/usr/bin/env bash
sleep 3
date +"%FT%T%z" > ./storage/app/date-start.dat
php artisan serve --host "0.0.0.0"
