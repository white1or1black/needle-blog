#!/bin/sh

option=$1
appName='needle-blog'
if [ ! $option ]
then
    option='-'
fi

if [ $option == 'init' ]
then
    docker-compose -f docker-compose.yml -f docker-compose.prodinit.yml up -d
elif [ $option == 'upgrade' ]
then
    docker-compose build $appName
    docker-compose up --no-deps -d $appName
elif [ $option == 'start' ]
then
    docker-compose start $appName
elif [ $option == 'stop' ]
then
    docker-compose stop $appName
elif [ $option == 'down' ]
then
    docker-compose down
else
    echo 'invalid option'
fi

