FROM node:14.8

COPY ./src /server
COPY package.json /server/package.json
COPY yarn.lock /server/yarn.lock

WORKDIR /server

RUN yarn install

CMD node server.js
