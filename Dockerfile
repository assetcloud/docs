FROM node:12.13 as builder

WORKDIR /app
COPY . /app
RUN npm set registry https://registry.npm.taobao.org
RUN yarn add vuepress
RUN yarn install \
        && yarn docs:build

FROM nginx:1.18

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/docs/.vuepress/dist /usr/share/nginx/html/

EXPOSE 80