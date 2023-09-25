FROM nginx:latest
COPY ./Calculator/. /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/conf.d/
EXPOSE 8081