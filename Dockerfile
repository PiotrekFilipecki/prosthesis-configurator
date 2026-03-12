FROM node:20-bookworm-slim AS base

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM base AS development

COPY . .

ENV HOST=0.0.0.0
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

EXPOSE 3000

CMD ["npm", "start"]

FROM base AS build

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY docker/root/etc/nginx/sites-enabled/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
