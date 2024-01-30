FROM node:latest

WORKDIR /backend
COPY . .

RUN rm -rf node_modules
RUN npm i --production
CMD ["node", "src/index.js"]

EXPOSE 5002