FROM node:lts-alpine

ENV HOME=/home/node

RUN mkdir -p $HOME/app/node_modules && chown node:node -R $HOME/app

WORKDIR $HOME/app

COPY package.json .
COPY yarn.* .

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3345

CMD ["yarn", "dev:server"]
