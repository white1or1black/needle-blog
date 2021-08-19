FROM node:14.16.1-alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . ./
RUN npm run build
RUN npm install -g --unsafe-perm prisma

WORKDIR /app/src/prisma
RUN prisma generate

FROM node:14.16.1-alpine AS prod

WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/script ./script

ENV PORT=3000
EXPOSE $PORT
CMD ["npm", "run", "start:prod"]