# syntax=docker/dockerfile:1

FROM node:12.18.1-alpine
WORKDIR /app
ENV DOCKERIZE_VERSION v0.6.1
RUN apk add --no-cache openssl \
    && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
RUN apk add --no-cache bash bash-doc bash-completion
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . /app
