
[TOC]

# CentOS 安装 Jenkins

## 准备工作：
* CentOS 7.6 的主机一台
* Jdk 1.8
* Jenkins 2.164.1

## 安装 Jdk
1. 输入如下命令安装 jdk
```shell
# yum install java-1.8.0-openjdk.x86_64
```

2. 检查jdk是否安装成功
```shell
# java -version

openjdk version "1.8.0_201"
OpenJDK Runtime Environment (build 1.8.0_201-b09)
OpenJDK 64-Bit Server VM (build 25.201-b09, mixed mode)
```
## 安装 Jenkins

> 不同平台的安装方式可以参考[文档](<https://jenkins.io/zh/doc/book/installing/>)

1. 下载 Jenkins 安装包
```shell
# wget -c https://pkg.jenkins.io/redhat-stable/jenkins-2.164.1-1.1.noarch.rpm
```

2. 安装 Jenkins
```shell
# rpm -i jenkins-2.164.1-1.1.noarch.rpm
```

3. 打开浏览器，通过**8080**端口访问 Jenkins 服务（8080端口为默认端口）
如果正常，将会看到如下界面
![](http://cdn.imaxue.com/WX20190331-130840.png)

4. 查看密码并输入
```shell
# cat /var/lib/jenkins/secrets/initialAdminPassword
```

5. 安装推荐的插件
![](http://cdn.imaxue.com/WX20190331-131911.png)

6. 配置管理员账号密码
![](http://cdn.imaxue.com/WX20190331-132423.png)








