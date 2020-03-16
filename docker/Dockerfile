FROM nginx:latest

RUN mkdir -p /var/www/ && \
rm -rf /etc/nginx/conf.d/default.conf

ADD nginx.conf /etc/nginx/conf.d/b2b-lk.conf
ADD build/ /var/www/

ADD ./env.js /var/www/env.js

ADD ./entrypoint.sh /entrypoint.sh
RUN chmod u+x entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
