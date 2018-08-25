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

## Service

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

这个时候差不多快成型了，其他配置就不说了，详见[egg官网](https://eggjs.org/zh-cn/)吧，人家文档写的很好。

接下来是一个发送邮件的demo

```shell
    npm i nodemailer
```

然后直接贴代码，配置详情[nodemailer](https://nodemailer.com/about/)

```js
  'use strict';

  const Controller = require('egg').Controller;
  const nodemailer = require('nodemailer');

  class Mailer extends Controller {
     async sentMail() {
      const { user, message } = this.ctx.request.body;
      let transporter = nodemailer.createTransport({
          //   host: 'smtp.ethereal.email',
            service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
            port: 465, // SMTP 端口
            secureConnection: true, // 使用了 SSL
            auth: {
              user: '906068053@qq.com',
              // 这里密码不是qq密码，是你设置的smtp授权码
              pass: 'ziwvgfjmlxiubeie',
            }
          });

          let mailOptions = {
            from: `${user}<906068053@qq.com>`, // sender address
            to: '13021098675@163.com', // list of receivers
          //   to: '123@example.com, "Ноде Майлер" <bar@example.com>, "Name, User" <baz@example.com>',
            subject: 'Hello', // Subject line
            // 发送text或者html格式
            // text: 'Hello world', // text 格式
            html: `<b>
                  ${message}</br>
                  <a href="baidu.com">
                      <img src="http://p15.jmstatic.com/zengzhang/83264308e1b51c2a48be3b31b634a452.png"/>
                  </a>
              </b>` // html 格式，需要html片段
          };
          // send mail with defined transport object
          await new Promise((resove, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                reject(error)
                // return console.log(error);
              }
              // console.log('Message sent: %s', info.messageId);
              resove();
            });
          }).then(() => {
            this.ctx.body = {
              error: '0',
              message: 'success',
            };
          })
     }
  }

  module.exports = Mailer;
```
