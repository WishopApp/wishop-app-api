FROM node:8.9.4-alpine

# linux path
ENV workspace=/usr/share/wishop/wishop-app-api
# window path
#ENV workspace=/e/wishop/wishop-app-api

WORKDIR ${workspace}

COPY . ./

RUN npm install -g yarn && yarn install

EXPOSE 3000

CMD ["yarn", "start"]
