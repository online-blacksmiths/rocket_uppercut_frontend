FROM node:16

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN export $(cat .env | xargs)

EXPOSE 3000

CMD ["yarn", "start"]