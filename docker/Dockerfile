FROM nginx:latest

RUN mkdir -p /var/www/ && \
rm -rf /etc/nginx/conf.d/default.conf

ADD nginx.conf /etc/nginx/conf.d/b2b-lk.conf
ADD build/ /var/www/

COPY entrypoint.sh /entrypoint.sh
COPY env.js /var/www/env.js

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
