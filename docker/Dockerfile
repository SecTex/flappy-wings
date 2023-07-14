FROM node:16.17.1 AS build
WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN ["yarn", "install", "--frozen-lockfile", "--ignore-engines"]

COPY ./ ./
RUN ["yarn", "build:production"]

FROM nginx:1.21-alpine
EXPOSE 80

COPY --from=build /app/dist/out-tsc/app /var/www/flappy-wings
COPY /docker/nginx.conf /etc/nginx/nginx.conf