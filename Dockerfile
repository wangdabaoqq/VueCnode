FROM node:6.10.3-slim
RUN apt-get update \    && apt-get install -y nginx && apt-get install -y wget
WORKDIR /app
COPY . /app/
EXPOSE 80
RUN  npm install \     && npm run build \     && cp -r dist/* /root/www \     && rm -rf /app
CMD ["nginx","-g","daemon off;"]
