FROM node:14.16.1-alpine AS devenv
WORKDIR /app
COPY package*.json ./
RUN npm install  --registry https://registry.npm.taobao.org/
COPY . .
RUN npm run build

FROM nginx:1.17.3-alpine
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=devenv /app/dist /usr/share/nginx/html/dist
EXPOSE 80