# Description :::: take base image nginx , build image for basic website and  run container on port 8081 and host on port 9091 
# FROM :::: To specify the base image which can be pulled from a container registry
FROM tomcat:latest

# COPY :::: Copies local files and directories to the image
# COPY nginx.conf /etc/nginx/conf.d/
# ADD nginx.conf /etc/nginx/conf.d/
# # COPY . /usr/share/nginx/html/
# # COPY . /var/www/html/
ADD ./Webpage/. /usr/local/tomcat/webapps/myapp/

# EXPOSE :::: Specifies the port to be exposed for the Docker container.
# EXPOSE 8081 

# To build docker image
# docker build -t image_name .

# To run docker image 
# docker run -p host_port:container_port image_name 
# docker run --name container_name -d -p host_port:container_port image_name

