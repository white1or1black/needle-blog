FROM node:14.16.1-alpine
WORKDIR /app
COPY package.json package-lock.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
      then npm install --registry https://registry.npm.taobao.org; \
      else npm install --only=production --registry https://registry.npm.taobao.org; \
    fi

COPY . ./

ENV PORT=3000
EXPOSE $PORT
CMD ["npm", "run", "start:prod"]