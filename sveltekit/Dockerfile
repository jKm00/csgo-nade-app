FROM node:16.7-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install

COPY . ./
RUN npm run build

CMD ["npm", "run", "preview"]