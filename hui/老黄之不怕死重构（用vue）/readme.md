我司用户中心以前是用 Freemarker（这玩意我都没听说过） + java 写的 支撑到现在 经过各种迭代 最终到了 前端看不懂代码 后端也看不懂代码 的地步  各部门老大痛下决心 决定重构 我毅然跳出决定用我从未写过的vue重构 然后、、、嗨喂狗

## 第一步vue-cli

Vue-cli早就领教过他的大名了  拯救了多少不会手搭项目的小白 上手咔咔几歩 配置配置就是干 爽的飞起

首先初始化一个文件夹

```
$ cd ~
$ cd myjob/vue-demo
$ npm init -y

```

下载vue-cli

```
npm install --global vue-cli

```

运行他！！！

```
vue init webpack vue-demo

```

输入命令后，会跳出几个选项让你回答：

```
Project name (vue-demo)： -----项目名称，直接回车，按照括号中默认名字（注意这里的名字不能有大写字母，如果有会报错Sorry, name can no longer contain capital letters）

Project description (A Vue.js project)： ----项目描述，也可直接点击回车，使用默认名字

Author ()： ----作者，输入你的大名

接下来会让用户选择：
Runtime + Compiler: recommended for most users 运行加编译，既然已经说了推荐，就选它了

Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specificHTML) are ONLY allowed in .vue files - render functions are required elsewhere 仅运行时，已经有推荐了就选择第一个了

Install vue-router? (Y/n) 是否安装vue-router，这是官方的路由，大多数情况下都使用，这里就输入“y”后回车即可。

Use ESLint to lint your code? (Y/n) 是否使用ESLint管理代码，ESLint是个代码风格管理工具，是用来统一代码风格的，一般项目中都会使用。

接下来也是选择题Pick an ESLint preset (Use arrow keys) 选择一个ESLint预设，编写vue项目时的代码风格，直接y回车

Setup unit tests with Karma + Mocha? (Y/n) 是否安装单元测试，我选择安装y回车

Setup e2e tests with Nightwatch(Y/n)? 是否安装e2e测试 ，我选择安装y回车

```

然后一个vue项目就创好了 ！！！

```
npm install

npm run dev 

```

页面上出现了熟悉的页面 OK

然后我们开始吧 嗨喂狗




## 发现一个特别有意思的vue-cli3.0 

```
首先 你先把你的vue-cli升级到最新

npm i -g @vue/cli
```

在终端执行vue ui, 会默认初始化localhost:8000且自动打开

```
vue ui
```

具体可看 https://segmentfault.com/a/1190000015366009 全图形界面