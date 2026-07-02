# ChengduPlantDatabase backend deploy

## Required environment variables

Set these on the hosting platform:

```txt
SPRING_DATASOURCE_URL=jdbc:mysql://HOST:PORT/chengdu?useSSL=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
SPRING_DATASOURCE_USERNAME=YOUR_DB_USER
SPRING_DATASOURCE_PASSWORD=YOUR_DB_PASSWORD
PORT=8077
```

## Database

Create a MySQL database named `chengdu`, then import `chengdu.sql`.

## Docker

Build and push an image:

```bash
docker build -t your-dockerhub-user/chengduplant-backend:latest .
docker push your-dockerhub-user/chengduplant-backend:latest
```

Deploy the image on Koyeb, Render, Fly.io, or another container host, then set the environment variables above.
