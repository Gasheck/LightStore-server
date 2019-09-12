FROM node

WORKDIR /app

COPY data/package.json data/yarn.lock ./data/

RUN yarn --cwd ./data install --network-timeout 600000

COPY data/src ./data/src
