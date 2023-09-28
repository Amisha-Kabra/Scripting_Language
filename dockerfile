FROM nginx:latest
COPY index.html /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/conf.d/
EXPOSE 8081

