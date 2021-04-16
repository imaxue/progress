- ubuntu
  - 安装node
    ```bash
    $ curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
    $ sudo bash nodesource_setup.sh
    $ sudo apt install nodejs
    ```
  - 安装nrm
  ```bash
    $ npm i -g nrm
  ```
  - 切换到淘宝镜像安装n模块
  ```bash
    $ nrm use taobao
    $ npm i -g n
  ```
  - 使用n模块升级node版本
  ```bash
  $ n stable
  ```
    注意，在升级时要注意n模块的安装路径与原本node的路径是否不一致，如果不一致的话会发现升级之后node版本没有变
```bash
$ which node
/usr/bin/node
$ vim ~/.bash_profile

export N_PREFIX=/usr
export PATH=$N_PREFIX/bin:$PATH

$ source ~/.bash_profile

$ n stable
```