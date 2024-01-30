FROM node:latest

WORKDIR /app
COPY . .

RUN rm -rf node_modules
RUN npm i --production
CMD ["node", "start"]

EXPOSE 5002