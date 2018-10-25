FROM alpine:latest as dhparam

COPY ./nginx/ /etc/nginx/

RUN apk update \
    && apk add libressl \
    && openssl dhparam -dsaparam -out /etc/nginx/dhparam.pem 4096

FROM alpine:latest
COPY ./build /apps/do
COPY --from=dhparam /etc/nginx /etc/nginx
COPY ./acme-client /etc/periodic/weekly
RUN apk update \
    && apk add nginx acme-client --no-cache \
    && mkdir -p /run/nginx \
    && chmod +x /etc/periodic/weekly/acme-client

ENTRYPOINT ["/etc/periodic/weekly/acme-client"]

CMD ["nginx", "-g", "daemon off;"]
