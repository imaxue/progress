### 启动服务
```js
fis3 server start
```
### 文件监听
FIS3 通过对 release 命令添加 -w 或者 --watch 参数启动文件监听功能。  
```js
fis3 release -w
```
### 浏览器自动刷新
```js
fis3 release -wL
```
### 发布到远端机器
当我们开发项目后，需要发布到测试机（联调机），一般可以通过如 SMB、FTP 等上传代码。FIS3 默认支持使用 HTTP 上传代码，首先需要在测试机部署上传接收脚本（或者服务），这个脚本非常简单，现在给出了 php 的实现版本，可以把它放到测试机上某个 Web 服务根目录，并且配置一个 url 能访问到即可。  
假定这个 URL 是：http://cq.01.p.p.baidu.com:8888/receiver.php
```js
fis.match('*', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://cq.01.p.p.baidu.com:8888/receiver.php',
    to: '/home/work/htdocs' // 注意这个是指的是测试机器的路径，而非本地机器
  })
})
```

### 可能上传测试机是最后联调时才会有的，更好的做法是设置特定 media。
```js
fis.media('qa').match('*', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://cq.01.p.p.baidu.com:8888/receiver.php',
    to: '/home/work/htdocs' // 注意这个是指的是测试机器的路径，而非本地机器
  })
});
```
### 工作原理 
FIS3 是基于文件对象进行构建的，每个进入 FIS3 的文件都会实例化成一个 File 对象，整个构建过程都对这个对象进行操作完成构建任务。以下通过伪码来阐述 FIS3 的构建流程。

### 构建流程
```js
fis.release = function (opt) {
  var src = fis.util.find(fis.project.root);
  var files = {};
  src.forEach(function (f) {
    var file = new File(f);
    files[file.subpath] = fis.compile(file);
  });
  var packager = fis.matchRules('::package');
  var keys = Object.keys(packager);
  var ret = {
    files: files,
    map: {}
  };
  if (packager.indexOf('prepackager') > -1) {
    pipe('prepackager', ret);
  }

  if (packager.indexOf('packager') > -1) {
    pipe('packager', ret);
  }

  files.forEach(function (f) {
    // 打包阶段产出的 map 表替换到文件
    if (f._isResourceMap) {
      f._content = f._content.replace(/\b__RESOURCE_MAP__\b/g, JSON.stringify(ret.map));
    }
  });

  if (packager.indexOf('spriter') > -1) {
    pipe('spriter', ret);
  }
  if (packager.indexOf('postpackager') > -1) {
    pipe('postpackager', ret);
  }
}
```
如上述代码，整个 FIS3 的构建流程大体概括分为三个阶段。  
  1. 扫描项目目录拿到文件并初始化出一个文件对象列表  
  2. 对文件对象中每一个文件进行单文件编译  
  3.获取用户设置的 package 插件，进行打包处理（包括合并图片）
其中打包处理开了四个扩展点，通过用户配置启用某些插件。   
  1.prepackager 打包前处理插件扩展点
  2.packager 打包插件扩展点，通过此插件收集文件依赖信息、合并信息产出静态资源映射表  
  3.spriter 图片合并扩展点，如 csssprites
  4.postpackager 打包后处理插件扩展点

