FROM node:16-alpine

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "build"]

# FROM node:16.7-alpine as build

# WORKDIR /app

# COPY package.json ./
# COPY package-lock.json ./
# RUN npm ci --silent
# RUN npm install

# COPY . ./
# RUN npm run build

# CMD ["npm", "run", "preview"]

# FROM nginx:1.18-alpine
# COPY --from=build /app/build .
# COPY container-configs/nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]