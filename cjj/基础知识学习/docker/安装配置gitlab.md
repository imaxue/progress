1. 镜像拉取
```bash
docker pull gitlab/gitlab-ce
```

2. 运行
```bash
$ docker run -d  -p 443:443 -p 80:80 -p 10022:22 -e "GITLAB_SHELL_SSH_PORT=10022" --name gitlab --restart always -v /home/gitlab/config:/etc/gitlab -v /home/gitlab/logs:/var/log/gitlab -v /home/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce
# -d：后台运行
# -p：将容器内部端口向外映射
# --name：命名容器名称
# -v：将容器内数据文件夹或者日志、配置等文件夹挂载到宿主机指定目录,如果是window下盘符不要写C:/xxx而要写成/c/xxx
```

> 容器无限重启，错误待解决
3. 修改配置
- 编辑`config/gitlab.rb`中的external_url改为`http://宿主机的IP`
- 编辑`data/gitlab-rails/etc/gitlab.yml`
    ```vi
    host: <本机IP>
    port: 8090
    https: false
    ```
- 进入容器
  ```shell
    $ docker exec -it gitlab /bin/bash
    $ gitlab-ctl reconfigure
    $ gitlab-ctl restart
    $ gitlab-ctl status
  ```
4. 登录
    初次登录时会直接让重置管理员密码，之后使用root账户登录进行初始化的配置

5. 注意事项
    - 因为容器内gitlab的ssh服务默认是22端口，而宿主服务的22端口可能是被占用的。所以需要映射一下端口，上面的示例中使用的10022端口。在映射端口之后，也需要修改一个gitlab.rb配置文件中的`gitlab_rails['gitlab_shell_ssh_port']=10022`,然后执行`gitlab-ctl reconfigure`重新配置一下.之后登录或者刷新gitlab会发现，原来的ssh://git@192.168.1.xx/xxx/xxx.git变成了ssh://git@192.168.1.xx:10022/xxx/xxx.git

gitlab常用命令：
|命令功能 | 执行命令 |
| :--: | :--: |
|重启配置，并启动gitlab服务	| sudo gitlab-ctl reconfigure |
|启动所有 gitlab	| sudo gitlab-ctl start |
|重新启动GitLab	| sudo gitlab-ctl restart |
|停止所有 gitlab	| sudo gitlab-ctl stop |
|查看服务状态	| sudo gitlab-ctl status |
|查看Gitlab日志	| sudo gitlab-ctl tail |
|修改默认的配置文件	| sudo vim /etc/gitlab/gitlab.rb |
|检查gitlab	| gitlab-rake gitlab:check SANITIZE=true --trace |