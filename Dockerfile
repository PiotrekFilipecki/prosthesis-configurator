FROM node:9.1.0-slim

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# https://superuser.com/questions/1423486/issue-with-fetching-http-deb-debian-org-debian-dists-jessie-updates-inrelease
RUN printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list

# Install app dependencies
RUN \
  apt-get update && \
  apt-get install -y python make g++ nginx-light git && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  rm -f /etc/nginx/sites-available/default && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  chown -R www-data:www-data /var/lib/nginx

# Stream the nginx logs to stdout and stderr
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

COPY package.json /app/
RUN npm install

COPY . /app

# Build app
RUN \
  npm run build && \
  rm -rf node_modules

ADD docker/root /

CMD ["nginx"]

EXPOSE 80
