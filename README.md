# RACS
Remote access control system backend
# Dependences
You only have to install docker and docker-compose :) (See https://docs.docker.com/install/ and https://docs.docker.com/compose/install/)
# Deployment
``` bash
git clone https://github.com/Saiel/RACS.git
cd RACS
docker-compose -d up
```
For fill database with some information run
``` bash
docker-compose run -rm web php artisan db:seed
```
# Provided API
- GET /datestart - get date of starting server in YYYY-MM-DDThh:mm:ss±hh format

- GET /locks - get json list of locks in this format:
``` JSON
[
  {
    "l_id": 1,
    "user_id": 1,
    "email": "EgrJB@ex.com",
    "last_echo": "1977-09-18 14:45:59"
  },
  {
    "l_id": 2,
    "user_id": 2,
    "email": "kVQ27@ex.com",
    "last_echo": "2014-08-04 22:10:15"
  },
  {
    "l_id": 3,
    "user_id": 3,
    "email": "UZVgm@ex.com",
    "last_echo": "1991-07-16 13:26:24"
  }
]
```
In order to paginate results provide parameters "off" and "limit"
