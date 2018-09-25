FROM node:8.12.0

# linux path
ENV workspace=/usr/share/wishop/wishop-app-api
# window path
#ENV workspace=/e/wishop/wishop-app-api

WORKDIR ${workspace}

COPY . ./

RUN npm install -g yarn && yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]
