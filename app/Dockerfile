FROM node:16
LABEL "maintainer" "Jarrod Medrano"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN chown -R node:node /usr/src/app

# Install curl for health checks
RUN apt update && apt install -y curl 

USER node
EXPOSE 8080
CMD [ "node", "server.js" ]

