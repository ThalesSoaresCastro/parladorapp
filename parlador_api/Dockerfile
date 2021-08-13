FROM node:14
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY tsconfig.json ./


# If you are building your code for production
# RUN npm ci --only=production

RUN npm install -g tsc

# Bundle app source
COPY . .
#ADD . /usr/src/app

RUN ls -a

#RUN npm update

# Run typescript

RUN npm install

#RUN npm run tsc

RUN npm run build
#CMD ["npm", "build"]

#CMD ["npm", "dev"]
#EXPOSE 4004
#CMD [ "node", "./dist/src/index.js" ]
#CMD ["npm", "start"]
