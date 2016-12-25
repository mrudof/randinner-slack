#!/bin/sh
APP_VERSION=$1
source ~/.heroku-secrets
if [ -z "${APP_VERSION}" ]; then
  echo "APP_VERSION is a required argument"
  exit 1
fi
docker build --build-arg YELP_CONSUMER_KEY=$CONSUMER_KEY \
  --build-arg YELP_CONSUMER_SECRET=$CONSUMER_SECRET \
  --build-arg YELP_TOKEN=$TOKEN \
  --build-arg YELP_TOKEN_SECRET=$TOKEN_SECRET \
  . -t randinner:$APP_VERSION -t randinner:latest
