# 环境配置
> 服务端：CentOs: 7.2.1511 + git: 1.8.3.1
> 客户端：windows10 + git: 2.18.0.windows.1

# 服务端安装git
```bash
yum install git -y
```
安装完成后输入
```bash
git --version
# 如果可以正确显示版本号就代表安装完成了
git version 1.8.3.1
```

# 为服务端git添加用户与密码
这一步很有必要，后续会给某些文件夹提供git访问权限
```bash
adduser git
passwd git
# 系统会提示你输入两次密码
```

# 配置服务端SSH访问
在我们自己搭建的git服务器上，使用`SSH`的方式进行代码的传输
```bash
# 我们先切换到git目录
cd /home/git
# 新建一个名叫.ssh的文件夹
mkdir .ssh && cd .ssh
# 随后在该文件夹内创建一个名叫authorized_keys的文件，这个文件用来存放每个用户的公钥
touch authorized_keys
# 设置文件夹权限，权限值要写对
chmod 700 /home/git/.ssh/
chmod 600 /home/git/.ssh/authorized_keys
# 为git与git组设置此文件夹权限，不设置的话会导致即便开启SSH也会在每次pull、push时被要求填写密码
chown -R git:git .ssh
```
随后将每个用户客户端所创建的`SSH公钥`放到`authorized_keys`文件内，一行一个

# 服务端git打开RSA认证
**不设置的话会导致即便开启SSH也会在每次pull、push时被要求填写密码**
```bash
cd /etc/ssh
# 编辑sshd_config文件
vim sshd_config
# 设置以下三个配置
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
# 重启sshd服务
service sshd restart
```

# 禁止git用户使用ssh登录服务器
```bash
vim /etc/passwd
# 找到类似的一行，下面的两个数字(我的为1000，不同机器有可能会不同)，一定不要修改
git:x:1000:1000::/home/git:/bin/bash
# 修改为
git:x:1000:1000::/home/git:/bin/git-shell
```

# 创建自己的第一个项目
```bash
cd /home/git
# 创建项目，git仓库的文件名一般都以.git结尾
mkdir [name].git
# 设置git权限
chown -R git:git [name].git
```
至此，你的git服务与项目都创建完毕了，客户端只需clone即可
```bash
git clone git@[domain name | ip]:[name].git
```
