FROM nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf
# RUN apt-get update && apt-get install -y nginx-extras
# RUN rm -rf /etc/nginx/nginx.conf
# COPY nginx.conf /etc/nginx/nginx.conf
COPY custom_404.html /var/www/html/custom_404.html
COPY build /var/www/html
