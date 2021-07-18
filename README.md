  <p align="center">A simple and convenient blog system</p>



## Description

A simple and convenient blog system with NestJS and dockerization.

## Dependencies 

You only need to install **docker** and **docker-compose** to run the entire system.
Make sure you set environment variables referenced from *.env* file in project root directory, you can run ```source .env```  in linux system.

## Installation

```shell
# install and run in production mode
$ docker-compose -f docker-compose.yml -f docker-compose-prodinit.yml up -d
# or in a convenient way(only support on linux and mac as same as below sh commands)
$ sh run.sh init
```

## Running the app

```bash
# development mode (hot reloading)
$ docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d
# or
$ sh run.sh devup

# production mode
$ docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d
# or
$ sh run.sh produp
```

## Upgrade

Run command below if change the code.

````shell
$ docker-compose build needle-blog && docker-compose up --no-deps -d needle-blog
#  or
$ sh run.sh upgrade
````



## Add user or update password by username

```bash
# Enter the container and then execute the script
$ docker exec -it [container_id] sh
# add user
$ node scripts/initDb.js addUser [username] [password]
# update password
$ node scripts/initDb.js updatePwd [username] [password]
```

Access the  *http://[domain_name]* in the browser so that you can access your blog.

