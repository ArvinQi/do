FROM alpine:latest

COPY ./build /apps/do
COPY ./nginx/ /etc/nginx/

RUN apk add nginx \
    && mkdir -p /run/nginx

CMD ["nginx"]
