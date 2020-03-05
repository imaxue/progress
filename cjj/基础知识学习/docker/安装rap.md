1. 创建docker.compose.yml文件
```yml
# mail@dongguochao.com
# llitfkitfk@gmail.com
# chibing.fy@alibaba-inc.com

version: "3"

services:
  # frontend
  dolores:
    image: rapteam/rap2-dolores:latest
    ports:
      #冒号前可以自定义前端端口号，冒号后不要动
      - 3000:38081

  # backend
  delos:
    image: rapteam/rap2-delos:latest
    ports:
      # 这里的配置不要改哦
      - 38080:38080
    environment:
      - SERVE_PORT=38080
      # if you have your own mysql, config it here, and disable the 'mysql' config blow
      - MYSQL_URL=mysql # links will maintain /etc/hosts, just use 'container_name'
      - MYSQL_PORT=3306
      - MYSQL_USERNAME=root
      - MYSQL_PASSWD=
      - MYSQL_SCHEMA=rap2

      # redis config
      - REDIS_URL=redis
      - REDIS_PORT=6379

      # production / development
      - NODE_ENV=production
    ###### 'sleep 30 && node scripts/init' will drop the tables
    ###### RUN ONLY ONCE THEN REMOVE 'sleep 30 && node scripts/init'
    command: /bin/sh -c 'node dispatch.js'
    # init the databases
    # command: sleep 30 && node scripts/init && node dispatch.js
    # without init
    # command: node dispatch.js
    depends_on:
      - redis
      - mysql

  redis:
    image: redis:4

  # disable this if you have your own mysql
  mysql:
    image: mysql:5.7
    # expose 33306 to client (navicat)
    #ports:
    #   - 33306:3306
    volumes:
      # change './docker/mysql/volume' to your own path
      # WARNING: without this line, your data will be lost.
      - "./docker/mysql/volume:/var/lib/mysql"
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --init-connect='SET NAMES utf8mb4;' --innodb-flush-log-at-trx-commit=0
    environment:
      MYSQL_ALLOW_EMPTY_PASSWORD: "true"
      MYSQL_DATABASE: "rap2"
      MYSQL_USER: "root"
      MYSQL_PASSWORD: ""
```
```
# 拉取镜像并启动
docker-compose up -d

# 启动后，第一次运行需要手动初始化mysql数据库
# ⚠️注意: 只有第一次该这样做
⚠️注意: 如果有提示`the input device is not a TTY. If you are using mintty, try prefixing the command with 'winpty'`则需要在命令前面加上 winpty
docker-compose exec delos node scripts/init

# 部署成功后 访问
http://localhost:3000 # 前端（可自定义端口号）
http://localhost:38080 # 后端

# 如果访问不了可能是数据库没有链接上，关闭 rap 服务
docker-compose down
# 再重新运行
docker-compose up -d
# 如果 Sequelize 报错可能是数据库表发生了变化，运行下面命令同步
docker-compose exec delos node scripts/updateSchema

```
# 镜像升级
- 拉取一下最新的镜像
```bash
docker-compose pull
```
- 暂停当前应用
```bash
docker-compose down
```

- 重新构建并启动
```bash
docker-compose up -d --build
```

- 有时表结构会发生变化，执行下面命令同步
```bash
docker-compose exec delos node scripts/updateSchema
```

- 清空不被使用的虚悬镜像
```bash
docker image prune -f
```