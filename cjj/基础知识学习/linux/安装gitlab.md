# centos7中安装gitlab

> 如果提示sudo not found 需要安装一下sudo: yum install sudo
1. 安装gitlab组件
```bash
sudo yum install -y curl policycoreutils-python openssh-server
sudo systemctl enable sshd
sudo firewall-cmd --permanent --add-service=http
sudo systemctl reload firewalld
```
2. 配置yum仓库
```bash
# curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
```
3. 安装并启动postfix邮件服务
```bash
sudo yum install postfix
sudo systemctl enable postfix
sudo systemctl start postfix
```

如果提示``Job for postfix.service failed because the control process exited with error code. See "systemctl status postfix.service" and "journalctl -xe" for details.``需要编辑``/etc/postfix/main.cf``文件
```
inet_protocols = all
inet_interfaces = all
```
4. 安装gitlab-ce
```bash
yum -y install gitlab-ce
```
5. 启动服务
```bash
gitlab-ctl start
```
通过修改/etc/gitlab/gitlab.rb配置文件可以进行域名的绑定，修改完成后需要执行命令``gitlab-ctl reconfigure``重新加载配置

修改gitlab运行外部URL默认的访问地址
```bash
# 未修gitlab.rb配置文件中nginx配置时这个配置默认配置gitlab自带的nginx端口
external_url 'http://172.17.17.10:81'  
```
相关默认位置
```
代码仓库保存位置：/var/opt/gitlab/git-data/repositories/
代码仓库备份位置：/var/opt/gitlab/backups/
postgresql数据及配置目录：/var/opt/gitlab/postgresql/data/
redis默认配置目录：/var/opt/gitlab/redis
gitlab主要配置文件：/etc/gitlab/gitlab.rb
```


> 如果安装不成功，需要配置一下镜像源
## Gitlab Community Edition 镜像使用帮助
注意: gitlab-ce 镜像仅支持 x86-64 架构

### Debian/Ubuntu 用户
首先信任 GitLab 的 GPG 公钥:
```bash
curl https://packages.gitlab.com/gpg.key 2> /dev/null | sudo apt-key add - &>/dev/null
```
再选择你的 Debian/Ubuntu 版本，文本框中内容写进 /etc/apt/sources.list.d/gitlab-ce.list

你的Debian/Ubuntu版本: 
```bash
deb http://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/debian stretch main
```
安装 gitlab-ce:
```
sudo apt-get update
sudo apt-get install gitlab-ce
```
### RHEL/CentOS 用户
新建 /etc/yum.repos.d/gitlab-ce.repo，内容为
```vi
[gitlab-ce]
name=Gitlab CE Repository
baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el$releasever/
gpgcheck=0
enabled=1
```
再执行
```bash
sudo yum makecache
sudo yum install gitlab-ce
```

[https://www.jianshu.com/p/45df58c55958](https://www.jianshu.com/p/45df58c55958)