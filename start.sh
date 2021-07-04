# init db
node ./script/dbInit.js

if [ $NODE_ENV = 'production' ]
then
  npm run start:prod
  cd fronted/ && npm run build
else
  npm run start:dev
fi