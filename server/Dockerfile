FROM node

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install -g nodemon

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "nodemon", "start" ]