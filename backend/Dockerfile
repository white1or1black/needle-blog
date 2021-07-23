FROM node:14.16.1-alpine AS builder

WORKDIR /app
COPY package*.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
      then npm install; \
      else npm install --only=production; \
    fi

COPY . ./
RUN npm run build
RUN npm install -g --unsafe-perm prisma

ENV PRISMA_BINARIES_MIRROR http://prisma-builds.s3-eu-west-1.amazonaws.com
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