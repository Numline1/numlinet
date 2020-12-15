FROM node:14-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

# Set environment variables
ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

ARG ACKEE_SERVER
ENV ACKEE_SERVER ${ACKEE_SERVER}

ARG ACKEE_DOMAIN_ID
ENV ACKEE_DOMAIN_ID ${ACKEE_DOMAIN_ID}

# Bundle app source
COPY . /usr/src/app
RUN yarn build

# Clear the cache
RUN yarn cache clean

EXPOSE 3000
CMD [ "yarn", "start" ]
