FROM node:8-alpine

COPY . /app

WORKDIR /app

RUN npm install

LABEL maintainer="David Jimenez <runnerdave@gmail.com>"

EXPOSE 3000/tcp

CMD npm start