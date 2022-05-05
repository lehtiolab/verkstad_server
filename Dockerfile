FROM node:11

WORKDIR /app

COPY package.json /app
RUN npm install --production
COPY src /app

# Do not run as root
RUN adduser -D verkstad
USER verkstad

# add the client build
COPY public /app/public

CMD ["node", "app.js"]
