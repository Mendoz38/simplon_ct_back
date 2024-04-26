FROM node:20-alpine
WORKDIR /
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "server.js"]
EXPOSE 5000