FROM node as node

WORKDIR /app

COPY . .

RUN npm install

RUN cd /app && npm run ng build  -- --prod --output-path=dist --base-href /

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=node /app/dist /usr/share/nginx/html/

COPY /nginx.conf /etc/nginx/conf.d/default.conf

RUN cat /etc/nginx/conf.d/default.conf