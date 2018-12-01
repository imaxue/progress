[快应用入门](https://doc.quickapp.cn/)

[快应用开发工具](https://bbs.quickapp.cn/forum.php?mod=viewthread&tid=1052&highlight=%E5%BF%AB%E5%BA%94%E7%94%A8)

### 创建项目
``` hap init <ProjectName> ```

### 安装依赖
``` npm install ```

### 编译项目
``` npm run build ```

### 自动编译项目
``` npm run watch ```

### 安装rpk包
1  启动HTTP服务器
``` npm run server -- --port 8080 ```

### 打包部署

[快应用部署文档](https://doc.quickapp.cn/tools/compiling-tools.html)

* 编译打包: 在工程的根目录下运行，编译后的工程目录在/build，生成的应用路径为/dist/.rpk

```
npm run build

```

* 增加release签名: 通过openssl命令等工具生成签名文件private.pem、certificate.pem，例如：在工程的sign目录下创建release目录，将私钥文件private.pem和证书文件certificate.pem拷贝进去

```
openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem

```

* 发布程序包: 发布程序包前需要增加release签名，然后在工程的根目录下运行,生成的应用路径为/dist/.signed.rpk

```
npm run release

```


### 注意：快应用踩坑

一、部署的问题：

1、 第一次正式上线release的时候妥善保存生成的证书文件, 以后更新包的时候直接执行：npm run release

```
第一步 先根目录运行  npm run build
第二步 在sign 文件夹 新建  release 文件夹
第三步 在release文件夹 运行 openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem
第四步 填写 信息
第五步 切换到根目录  运行 npm run release

```

2、关于版本号(versionName、versionCode)

```
应用版本名称、版本号（versionName、versionCode）
应用版本名称、版本号为开发者的应用包维护的版本信息
应用版本名称为主版本.次版本格式
应用版本号为整数，从1开始，每次更新上架请自增1
```


### release文件夹中的两个证书文件：

1、certidicate.pem

```
debug

```

2、private.pem

```
debug

```

