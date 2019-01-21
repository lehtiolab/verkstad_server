FROM node:11

WORKDIR /app

COPY package.json /app
COPY .env /app
RUN npm install --production
COPY src /app

CMD ["node", "app.js"]

EXPOSE 8081
