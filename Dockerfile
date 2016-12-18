FROM node:alpine
ENV PORT=3000
EXPOSE $PORT
COPY app.js ./
COPY package.json ./
RUN npm install
CMD ["node", "./app.js"]
