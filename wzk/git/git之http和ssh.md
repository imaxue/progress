#### 引言
- 最近在做前端项目拆分中，引入了git submodule的使用，在主项目引入子项目的时候涉及到git clone方式http和ssh不同引起的下载问题；
- 如果在add添加子项目时使用的ssh方式，则git clone时也必须使用ssh方式，使用http则存在下载不下来的问题；
- 如果他人电脑没有配置ssh，配置ssh即可下载下来；
- 问题是运维部署代码到服务器使用自动化部署脚本中也需要使用git clone拉去代码，也就是说服务器也需要配置ssh；

#### git中http和ssh的区别
- 使用http无需配置直接使用即可，ssh需要配置后使用；
- ssh配置后使用方便操作无需输入用户名和密码；
- http方式下git操作需要用户名密码；

#### Git中使用http方式时保存用户名和密码
- 方式1：
  - 在本地的工程文件夹的.git下打开config文件
添加：
    ```
    [credential]
         helper = store
    ```
  - 再输入一次用户名密码后就可以保存住了。
- 方式2：
  - 在c盘用户下，新建一个名为"_netrc"的文件，文件中内容格式如下：
    ```
    machine {git account name}.github.com
    login your-usernmae
    password your-password
    ```
#### 服务器上配置ssh
- 待补充；

#### 服务器上git+Jenkins+ssh的配置
- 待补充；

#### 先关链接
- https://blog.csdn.net/qi_lin7/article/details/60876021