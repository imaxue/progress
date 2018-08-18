# 手动创建一个简单的egg项目

## 初始化项目

初始化目录结构

```shell
  $ mkdir egg-example
  $ cd egg-example
  $ npm init
  $ npm i egg --save
  $ npm i egg-bin --save-dev
```

### --save 和 --save-dev

*--save*是为了让依赖保存到我们的*package.json*里面，方便其他人使用下载，--save-dev，顾名思义，dev，是在我们开发环境才用到的依赖

#### 顺便说下*package.json*中~和^区别

（1）比如"classnames": "2.2.5"，就是我们确定的版本号，不会发生改变，除非手动修改;

（2）比如"classnames": "~2.2.5"，表示安装2.2.x的最新版本（不低于2.2.5），但是不安装2.3.x，也就是说安装时不改变大版本号和次要版本号;

（3）比如"classnames": "^2.2.5"，表示安装2.2.5及以上的版本，但是不安装3.0.0，也就是说安装时不改变大版本号。

添加```npm scripts```到```package.json```：

```
{
  "name": "egg-example",
  "scripts": {
    "dev": "egg-bin dev"
  }
}

```

添加一个dev命令，待会儿我们运行需要执行```npm run dev```

## Controller

一个node项目一般都需要有router和controller。

首先，在我们的根目录下创建一个```app```文件夹，这就是我们的项目内容了，然后创建我们的```Controller```文件夹,然后开始我们的controller。

比如创建一个叫```option.js```的controller。

```
const Controller = require('egg').Controller;

class First extends Controller {
  async index() {
    this.ctx.body = "hello World.";
  }
}

module.exports.First;
```

配置我们的路由映射，访问我们的接口时走到我们的controller里面，那么首先得去创建```router.js```去帮我们做映射。

```
  module.exports = app => {
  const { router, controller } = app;
    router.get('/', controller.option.index);
  };
```

可以体验一下了

```
  $ npm run dev
  $ open localhost:7001
```
那么你会发现报错了
![error](http://p15.jmstatic.com/zengzhang/83264308e1b51c2a48be3b31b634a452.png "error")

他告诉我们需要创建一个*config.default.js*，然后加一个key

```
exports.keys = 'wojiushiwobuyiyangdeyanhuo';
```

现在我们看到了我们的```Hello World```,一个项目的Service是不能缺少的，通过Controller去调用我们的Service。

```
  const Service = require('egg').Service;
  
  class MyService extends Service{
    async test() {
      // Your logic code.
      const we = '我就是我，不一样的烟火';
      return we;
    }
  }
```

接下来就是将我们的controller和services联系起来了。

```
  const serviceRes = await this.ctx.service.myService.test();
```
