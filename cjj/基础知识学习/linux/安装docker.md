## 安装docker步骤
- docker要求centos系统内核版本不低于3.10。可以通过``uname -r``命名查看内核版本
- 更新yum
```bash
$ yum update
```
- 查看是否有安装过旧的docker
```bash
$ yum list installed | grep docker
```
- 如果有旧的版本先卸载
```bash
$ yum remove docker
```
- 安装软件包。yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的
```bash
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```
- 设置docker源。
```bash
# yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 官方源不推荐

# 阿里源 建议使用
$ yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
- 构建缓存
```bash
$ yum makecache fast
```
- 可以查看所有仓库中所有docker版本，并选择特定版本安装
```bash
$ yum list docker-ce --showduplicates | sort -r
```
- 安装docker
```bash
$ sudo yum install docker-ce  #由于repo中默认只开启stable仓库，故这里安装的是最新稳定版17.12.0
$ sudo yum install <FQPN>  # 例如：sudo yum install docker-ce-17.12.0.ce
```
- 启动并加入开机启动
```bash
$ sudo systemctl start docker
$ sudo systemctl enable docker
```

- 验证是否安装成功(有client和service两部分表示docker安装启动都成功了)
```bash
$ docker version
```