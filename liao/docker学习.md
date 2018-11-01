## docker学习

下载客户端（需要注册），安装，启动

下载image

比如mongo
```shell
docker pull mongo
等待下载
docker run --name my-mongo -p 27017:27017  -d mongo
```
这样就启动起来了
停止
```shell
docker stop my-mongo
```
移除
```shell
docker rm my-mongo
```
