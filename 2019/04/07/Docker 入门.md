# Docker 教程

[TOC]

![](http://cdn.imaxue.com/09ed029c0c19faa1)

> Docker 的 `logo` 是一只装载着集装箱的鲸鱼。
>
> 在集装箱出现之前，码头工人需要将不同的货物人工的搬运到船上，并混合堆放在一起。运输成本中的很大一部分都是装卸成本。

## 为什么需要 Docker？

很多时候，我们需要把在自己机器上开发的软件，到其他人的机器上运行。在这个过程中，可能会有因为环境不一致，导致各种运行问题。那么，有没有什么办法，可以让运行的环境和开发的环境保持一致呢？

有，虚拟机就可以，只要把本地的系统，复制一份镜像，然后在目标机器上运行就可以了。

但是虚拟机有很多弊端：

* 占用资源多：即使运行的软件很小，也需要同时运行一个虚拟系统。
* 冗余步骤多：我只是想运行一个软件，也必须开启系统，输入用户名密码登录系统，才能运行软件。
* 启动速度慢：必须先启动系统，才能运行软件，很多时间浪费在启动系统上。

如果使用 Docker，就可以解决这些问题。



## Docker 是什么？

Docker 是 Docker 公司主导开发，使用 Go 语言编写的一种容器引擎，可以用来打包轻量级的运行时环境。

简单来说，Docker 可以将你软件的运行环境进行打包，然后将打包后的镜像在其他机器上运行。

相比于虚拟机有什么优势：

* 占用资源少
* 启动快
* 体积小



## Docker 的应用场景

- Web 应用的自动化打包和发布。
- 自动化测试和持续集成、发布。
- 在服务型环境中部署和调整数据库或其他的后台应用。



## Docker 的安装

[官网](https://www.docker.com/)

Docker 是一个开源的商业产品，有两个版本：社区版（Community Edition，缩写为 CE）和企业版（Enterprise Edition，缩写为 EE）。企业版包含了一些收费服务，个人开发者一般用不到。下面的介绍都针对社区版。



## Docker 基础知识

### Docker 镜像(Images)

Docker 将应用程序及依赖，打包进`image`文件中，image 是用于创建 Docker 容器的模板。同一个 image 文件，可以生成多个同时运行的容器实例。

实际开发中，一个image 一般通过继承另一个 image，再加上一些自定义设置生成。



### Docker 容器(Container)

容器是独立运行的一个或一组应用。镜像和容器的关系，可以理解为模板和实例的关系，容器由镜像生成。



### Docker 仓库(Registry)

Docker 仓库用来保存镜像，可以理解为代码控制中的代码仓库。Docker 有一个官方的仓库 [Docker Hub](https://hub.docker.com/)，可以找到很多常用的镜像。也可以将自己制作完成的镜像，上传到网上的仓库进行共享。



## Decker 实战

下面我们用 Docker 启动一个 `nginx` 服务器，来演示一下 Docker 的使用。

### 方法一：直接命令行启动

先将镜像下载到本地

```shell
docker pull nginx
```

也可以通过在镜像名后加`:版本号` 指明特定的版本，如：

```shell
docker pull nginx:1.15.3
```

如果不指明版本号，则默认下载最新的版本



下载完成后，可以通过 docker image 命令，查看镜像列表
```shell
docker images
```

会看到如下信息：

```
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
nginx               1.15.3              06144b287844        2 weeks ago         109MB
```

`TAG`：版本号

`IMAGE ID`：镜像的id，在某些需要指明某个特定镜像的时候，可以使用这个id。

`CREATED`：这里指的是镜像创建的时间，不是下载的时间。



使用 `docker run` 命令，启动镜像

```shell
docker run -p 8000:80 nginx
```

`-p`参数，表示将本地的 `8000` 端口，和镜像的 `80` 端口进行映射，在浏览器中访问 `localhost:8000` 的时候，就相当于是在访问容器中提供80端口的服务了。

浏览器打开`http://localhost:8000` 看一下:

![](http://cdn.imaxue.com/WX20190420-110940.png)


可以看到 Nginx 的欢迎页面，说明已经启动成功。



我们可以通过使用 `docker ps` 命令，来查看当前正在运行的容器。

```shell
docker ps
```

可以看到以下信息：

```
CONTAINER ID        IMAGE          STATUS              PORTS                  
667495f369c6        nginx          Up About a minute   0.0.0.0:8000->80/tcp   
```

`CONTAINER ID`：容器的id

`IMAGE`：镜像名称

`STATUS`：当前容器状态

`PORTS`：端口映射关系



 `docker ps` 只能查看到运行中的容器，如果要查看所有创建的容器，可以使用

```shell
docker ps -a
```



如果想停止一个正在运行的容器，可以使用 `docker stop [CONTAINER ID]`

```shell
docker stop 667495f369c6
```

ID 为 `667495f369c6` 的容器就被停止了



这种方式虽然简单，但是有一个弊端，就是设置一些自定义的配置比较麻烦。所以推荐使用下面的方式。



### 方法二：使用 Dockerfile 文件

1. 新建一个文件夹

2. 在文件夹中创建一个`Dockerfile`文件，Dockerfile 文件是配置 image 的依据，用来生成 image。

3. Dockerfile 文件内容如下

   ```dockerfile
   FROM nginx # 表示引入 nginx 镜像
   
   # 将本地的 nginx.conf 文件, 复制到镜像中的 /etc/nginx/nginx.conf
   COPY nginx.conf /etc/nginx/nginx.conf
   # 将本地的 html 文件夹, 复制到镜像中的 /usr/share 目录下
   COPY html /usr/share
   ```

4. 新建一个 `html`文件夹, 里面新建一个`index.html`文件, 文件内容如下

   ```html
   <!doctype html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <title>Document</title>
   </head>
   <body>
   <h1>Hello Docker</h1>
   </body>
   </html>	
   ```

5. 新建`nginx.config`文件, 内容如下

   ```
   events {
       worker_connections  1024;
   }
   
   http {
       server {
           listen       80;
           server_name  localhost;
   
           location / {
               root   /usr/share;
               index  index.html index.htm;
           }
       }
   }
   
   ```

6. 运行命令
  ```shell
  docker build -t mynginx .
  docker run -p 8000:80 mynginx
  ```

7. 打开浏览器, 访问`localhost:8000`查看效果



## 常用命令
```shell
docker # 用来查看所有的 docker 命令
docker pull <image> # 拉取镜像到本地
docker search # 搜索仓库中的相关镜像
docker build -t friendlyname .# 使用此目录的 Dockerfile 创建镜像
docker run -p 4000:80 friendlyname  # 运行端口 4000 到 90 的“友好名称”映射
docker run -d -p 4000:80 friendlyname         # 内容相同，但在分离模式下
docker ps                                 # 查看所有正在运行的容器的列表
docker stop <hash>                     # 平稳地停止指定的容器
docker ps -a           # 查看所有容器的列表，甚至包含未运行的容器
docker kill <hash>                   # 强制关闭指定的容器
docker rm <hash>              # 从此机器中删除指定的容器
docker rm $(docker ps -a -q)           # 从此机器中删除所有容器
docker images -a                               # 显示此机器上的所有镜像
docker rmi <imagename>            # 从此机器中删除指定的镜像
docker rmi $(docker images -q)             # 从此机器中删除所有镜像
docker login             # 使用您的 Docker 凭证登录此 CLI 会话
docker tag <image> username/repository:tag  # 标记 <image> 以上传到镜像库
docker push username/repository:tag            # 将已标记的镜像上传到镜像库
docker run username/repository:tag                   # 运行镜像库中的镜像
```


## 其他问题，请参考官方文档

[文档](https://docs.docker.com/)





