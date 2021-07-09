  <p align="center">A simple and convenient blog system</p>



## Description

A simple and convenient blog system

## Installation 

You only need to install docker and docker-compose to run the entire system.
Make sure you set environment variables referenced from *.env* file in project root directory.

## Running the app

```bash
# development mode
$ docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d
# production mode
$ docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d
```

## Add user or update password by username

```bash
# Enter the container and then execute the script
$ docker exec -it [container_id] sh
# add user
$ node scripts/initDb.js addUser [username] [password]
# update password
$ node scripts/initDb.js updatePwd [username] [password]
```

Access the  *http://[domain_name]* in the browser so that you can access your blog here.

