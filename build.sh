#!/bin/sh
APP_VERSION=$1
source ~/.heroku-secrets
if [ -z "${APP_VERSION}" ]; then
  echo "APP_VERSION is a required argument"
  exit 1
fi
docker build --build-arg YELP_CONSUMER_KEY=$YELP_CONSUMER_KEY \
  --build-arg YELP_CONSUMER_SECRET=$YELP_CONSUMER_SECRET \
  --build-arg YELP_TOKEN=$YELP_TOKEN \
  --build-arg YELP_TOKEN_SECRET=$YELP_TOKEN_SECRET \
  . -t randinner:$APP_VERSION -t randinner:latest
