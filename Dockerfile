FROM node:14.16.1-alpine
WORKDIR /app
COPY package.json package-lock.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
      then npm install; \
      else npm install --only=production; \
    fi

COPY . ./

RUN npm run build

ENV PORT=3000
EXPOSE $PORT
CMD ["npm", "run", "start:prod"]