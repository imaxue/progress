1. 镜像拉取
```bash
docker pull gitlab/gitlab-ce
```

2. 运行
```bash
$ docker run -d  -p 443:443 -p 80:80 -p 222:22 --name gitlab --restart always -v /home/gitlab/config:/etc/gitlab -v /home/gitlab/logs:/var/log/gitlab -v /home/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce
# -d：后台运行
# -p：将容器内部端口向外映射
# --name：命名容器名称
# -v：将容器内数据文件夹或者日志、配置等文件夹挂载到宿主机指定目录,如果是window下盘符不要写C:/xxx而要写成/c/xxx
```

> 容器无限重启，错误待解决