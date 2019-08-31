# node切换版本[直接下载安装包也可以]
> 亲测nginx下，以下命令是可以完成安装的，但是Windows下面是一直失败（垃圾）
## 安装方法(一):

1. 查看node版本，没安装的请先安装；  
  `$  node -v`

2. 清楚node缓存；

   `$  sudo npm cache clean -f ` 

3. 安装node版本管理工具'n';

    `$  sudo npm install n -g`

4. 使用版本管理工具安装指定node或者升级到最新node版本；

   `$  sudo n stable  （安装node最新版本）`

   `$  sudo n 8.9.4 （安装node指定版本8.9.4）`

5. 使用node -v查看node版本，如果版本号改变为你想要的则升级成功。

## 安装方法（二）：
> 通过nvm切换node的版本号，方便快捷，（以下是Windows的安装方法，其他的自行百度）  
>  Windows-nvm下载地址： https://github.com/coreybutler/nvm-windows/releases  
>  点击链接直接下载安装包，安装即可使用

1. 列出所需版本  
   `nvm list-remote`
2. 安装相应的版本  
 ` nvm install 8.11.0`
3. 使用2命令安装的应该是最新版本，使用下面命令就可以切换想要的版本  
   `nvm user 8.11.3`
4. 设置默认版本
   `nvm alias default 8.11.3`



