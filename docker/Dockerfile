FROM nginx:latest

RUN mkdir -p /var/www/b2b-lk && \
rm -rf /etc/nginx/conf.d/default.conf

ADD nginx.conf /etc/nginx/conf.d/b2b-lk.conf
ADD build/ /var/www/b2b-lk/
