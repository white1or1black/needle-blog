# init db
node ./script/dbInit.js

if [ $NODE_ENV = 'production' ]
then
  npm run build
  npm run start:prod
else
  npm run start:dev
fi