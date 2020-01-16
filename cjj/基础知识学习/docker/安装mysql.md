- 拉取镜像
```bash
docker pull mysql
```
- 建立容器
```bash
docker run -P --name mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql
```
- 如果需要映射目录
```bash
docker run -P --name mysql \
-v /usr/local/docker/mysql/conf:/etc/mysql \
-v /usr/local/docker/mysql/logs:/var/log/mysql \
-v /usr/local/docker/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
-d mysql
```
此处需要注意，如果是window系统下运行docker，映射的目录不能写"盘符:/xxx"，需要写成这样,比如C盘下的某个目录：``/c/xxx``

- 连接容器
```bash
docker exec -it mysql bash
```

- 连接数据库
```bash
 mysql -uroot -p123456
```