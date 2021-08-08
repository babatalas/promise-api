FROM node:lts-alpine3.14 as build-deps

# set working directory
WORKDIR /app

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json package-lock.json ./
RUN npm install --silent

# add app
COPY . ./
RUN npm run build
# RUN npx typeorm migration:run

# start app
CMD /wait && npx typeorm migration:run && npm run start:dev