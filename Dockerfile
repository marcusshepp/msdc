
### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:current-alpine as builder

COPY senate/package.json senate/package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY senate/ .

## Build the angular app in production mode and store the artifacts in dist folder

RUN npm run ng build -- --prod --output-path=dist


### STAGE 2: Setup nginx ###
FROM nginx:latest

## Copy our default nginx config
COPY senate/nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
