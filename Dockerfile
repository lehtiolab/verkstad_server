FROM node:17.6.0-alpine

WORKDIR /app

COPY package.json /app
RUN npm install --production
COPY src /app

# Do not run as root
RUN adduser -D verkstad
USER verkstad

# add the client build
COPY frontend/dist /app/public

CMD ["node", "app.js"]
