#### 1、官网下载安装包install
- 安装时一路next，但是注意取消勾选MongoDB Compass
- MongoDB Compass是mongodb的GUI图形界面软件，默认安装常常导致卡死；

#### 2、手动创建目录及相关文件
- 手动创建文件夹\data\db用来储存数据
  - 例如C:\Program Files\MongoDB\data\db
  - MongoDB的需要一个数据目录来存储所有数据
  - MongoDB的默认数据目录路径是：\data\db
  - 目录\data\db 不一定创建在C盘，随便配置即可；
- 手动创建目录log用来储存日志文件并创建日志文件
  - 例如C:\Program Files\MongoDB\log
  - 在log文件夹下创建一个日志文件MongoDB.log，例如C:\Program Files\MongoDB\log\MongoDB.log

#### 3、手动创建配置文件mongo.conf
- 这个文件是服务的配置文件，可用来配置服务的端口号、服务的日志目录、服务储存数据的的目录；
- 具体内容如下：
    ```
        #数据库路径  
        dbpath=D:\Mongo\data  
        #日志输出文件路径  
        logpath=D:\Mongo\logs\mongo.log  
        #错误日志采用追加模式  
        logappend=true  
        #启用日志文件，默认启用  
        journal=true  
        #这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false  
        quiet=true  
        #端口号 默认为27017  
        port=27017
    ```
- 配置文件mongo.conf 是在创建服务时用的；
- 配置文件mongo.conf是非必须的，也可以在创建服务时已参数的形式配置；

#### 4、创建服务到计算机的windows服务中
- 如果每次执行命令并配置参数来启服务岂不是相当麻烦，可按照如下命令来创建MongoDB服务，就可以通过windows服务来管理MongoDB的启动和关闭了
- 有配置文件的命令
```
    mongod --config "D:\Mongo\mongo.conf"  --install --serviceName "MongoDB"

```
- 没有配置文件的命令
```
    mongod --dbpath "C:\Program Files\MongoDB\data\db" --logpath "C:\Program Files\MongoDB\log\MongoDB.log" --install --serviceName "MongoDB"
```
- 以上两种命令方式都可以；

#### 5、创建完服务后，服务的启停命令
- 启动服务

```
C:\Program Files\MongoDB\Server\3.4\bin>net start MongoDB
```

- 停止服务

```
C:\Program Files\MongoDB\Server\3.4\bin>net stop MongoDB
```

- 删除服务

```
mongod --dbpath "C:\Program Files\MongoDB\data\db" --logpath "C:\Program Files\MongoDB\log\MongoDB.log" --remove --serviceName "MongoDB"
```
#### 相关链接
- https://www.jianshu.com/p/9e5bc16c48c3
- https://www.jianshu.com/p/4bda3b7a9ea6
- https://blog.csdn.net/qq_22063697/article/details/78069787
