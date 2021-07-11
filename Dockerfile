# syntax=docker/dockerfile:1
FROM node:lts-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci

COPY . .

CMD npm run start