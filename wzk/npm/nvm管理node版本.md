#### 引言
- 现在做前端开发已经离不开node环境了。有些工具框架之类的又node的版本要求，所以切换node版本的工具是极好的；

#### Windows下安装nvm
- 1、先卸载已经安装的node
- 2、安装nvm
- 3、安装node
- 4、设置全局npm（可以不用设置）
- 5、安装其他好用的工具
    - 如cnmp

#### Windows下nvm安装node的目录
- nvm的安装目录，默认是C:\Users\Administrator\AppData\Roaming\nvm
- 安装node后，在上边的目录下会生成v6.5.0目录、v10.14.1目录，这就是安装的node目录；
- v10.14.1目录下有一个node_modules目录，全局安装的node包就是下载到此目录下的，局部安装的node包会下载到当前打开命令行窗口的目录下的node_modules
- 同时在目录C:\Program Files\nodejs下是一个node的快捷方式，此快捷方式指向，当前使用的node版本，也就是指向nvm的安装目录C:\Users\Administrator\AppData\Roaming\nvm中的v6.5.0或者v10.14.1目录

#### nvm常用命令

```
1,nvm nvm list 是查找本电脑上所有的node版本

- nvm list 查看已经安装的版本
- nvm list installed 查看已经安装的版本
- nvm list available 查看网络可以安装的版本

2,nvm install 安装最新版本nvm

3,nvm use <version> ## 切换使用指定的版本node

4,nvm ls 列出所有版本

5,nvm current显示当前版本

6,nvm alias <name> <version> ## 给不同的版本号添加别名

7,nvm unalias <name> ## 删除已定义的别名

8,nvm reinstall-packages <version> ## 在当前版本node环境下，重新全局安装指定版本号的npm包

9,nvm on 打开nodejs控制

10,nvm off 关闭nodejs控制

11,nvm proxy 查看设置与代理

12,nvm node_mirror [url] 设置或者查看setting.txt中的node_mirror，如果不设置的默认是 https://nodejs.org/dist/
　　nvm npm_mirror [url] 设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是： https://github.com/npm/npm/archive/.

13,nvm uninstall <version> 卸载制定的版本

14,nvm use [version] [arch] 切换制定的node版本和位数

15,nvm root [path] 设置和查看root路径

16,nvm version 查看当前的版本
```


#### 相关链接
- https://www.jianshu.com/p/f2ab58ab7d3c
- https://github.com/coreybutler/nvm-windows/releases
