# FROM node:17

# WORKDIR /app

# COPY package.json ./
# RUN npm install

# COPY . ./
# RUN npm run build

# EXPOSE 4173

# CMD ["npm", "run", "preview"]

# Build env
FROM node:16.15-alpine3.15 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install

COPY . ./
RUN npm run build

# Prod env
FROM nginx:1.20.2-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY container-config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]