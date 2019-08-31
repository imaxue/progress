#### 引言
- 默认情况下执行npm install -g xxxpackage 会将xxxpackage下载到windows默认路径下面：
    ```
    C:\Users\UserName\AppData\Roaming\npm
    C:\Users\UserName\AppData\Roaming\npm-cache
    ```
- 随着安装的package越来越多，会导致系统盘空间不够，需要重新转移地方，比如，到D盘。

#### 具体修改步骤
- step 1 将默认的npm，npm-cache目录全部copy到 D:\AWeb_Env, 完成后的目录如下：
```
D:\AWeb_Env\npm
D:\AWeb_Env\npm-cache
```

- step 2 修改.nmprc C:\Users\UserName\.npmrc 在其中添加 新目标路径
```
prefix="D:\\AWeb_Env\\npm"
cache="D:\\AWeb_Env\\npm-cache"
```
- step 3 修改系统环境变量， 将 D:\AWeb_Env\npm 添加进入 path变量中。

#### 相关链接
- https://www.jianshu.com/p/4da509245933