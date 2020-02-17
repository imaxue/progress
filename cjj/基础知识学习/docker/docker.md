

- ``$ docker pull xxx`` 获取镜像
- ``$ docker images`` 查看镜像
- ``$ docker ps -a ``查看所有容器
- ``$ docker container ls --all``

- ``$ docker run -itd --name xxx centos`` 启动容器
    ``-i`` 选项告诉 Docker 容器保持标准输入流对容器开放，即使容器没有终端连接
    ``-t`` 选项告诉 Docker 为容器分配一个虚拟终端
    ``-d`` 选项告诉 Docker 在后台运行容器的守护进程
    ``-p`` 指定端口映射
    ``-P`` 随机分配一个端口映射
    ``-v`` 将宿主机上的目录挂载到镜像里`-v /home/dock/Downloads:/usr/Downloads` 冒号前为宿主机的目录
  + ``$ docker run -it --name xxx centos /bin/bash`` 在启动容器之后，出现bash命令行

- ``$ docker stop <容器 ID>`` 停止容器。通过输入容器的id或者在运行时指定的name字段来停止容器的运行
- ``$ docker restart <容器 ID>`` 重启容器
- ``$ docker rm -f <容器 ID>`` 删除容器
- ``$ docker rmi <容器 ID>`` 删除镜像
- ``$ docker exec -it <容器 ID> /bin/bash`` 进入容器
- ``$ docker cp xxx <容器 ID>:<path>`` 复制xxx文件至容器内path路径下

- 容器生成镜像
`` docker commit -a 'author' -m 'desc' <容器 ID> [REPOSITORY]:[TAG]``
