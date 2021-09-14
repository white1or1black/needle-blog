#!/bin/sh

option=$1
appName=$2
if [ ! $option ]
then
    option='-'
fi

if [ $option == 'run' ]
# Run all services.
then
    if [ $appName == 'dev' ]
    then
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d mysql &&
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d redis &&
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d frontend &&
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d backend
    else
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d mysql &&
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d redis &&
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d frontend &&
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d backend
    fi
elif [ $option == 'upgrade' ]
# Rebuilid and restart concrete service. i.e. docker-compose upgrade frontend to start frontend service.
then
    docker-compose build $appName
    docker-compose up --no-deps -d $appName
elif [ $option == 'start' ]
# Start concrete container correspond to the service name.
then
    docker-compose start $appName
elif [ $option == 'stop' ]
# Stop concrete container correspond to the service name.
then
    docker-compose stop $appName
elif [ $option == 'up' ]
then
    docker-compose -f up -d $appName
elif [ $option == 'down' ]
then
    docker-compose down $appName
else
    echo 'invalid option'
fi

