FROM node:12.18-alpine

WORKDIR /app

COPY ["package*.json", "./"]

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD [ "node", "src/index.js" ]