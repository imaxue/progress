## 老黄搭项目 吓死你系列（webpack4+react+react-root4）

你们说github上那么多脚手架 
为什么闲的蛋疼要去手搭一个  
其实没有为什么  我就是闲的蛋疼 ╮(╯▽╰)╭

## 初始化项目

首先初始化一个文件夹

```
$ cd ~
$ cd myjob/webpack-demo
$ npm init -y

```
初始化之后我的项目里面会有一个packge.json文件

## 新建一个HTML 作为我单页应用的主页面

然后我在项目下新建一个HTML

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
       
    </body>
</html>
```
### 创建js文件

在 webpack-demo 目录下新建 index.js，内容暂时留空。

安装 react 及 react-dom

```
$ npm install react react-dom

```

安装以后 在index.js 中 import 它们

```
import React from 'react'
import ReactDOM from 'react-dom'

```

然后 index.html 中引入index.js

```
<body>
   <script src="index.js"></script>
 </body>

```

在浏览器中打开 index.html，console 报错 好了 结束项目 完结撒花

百度 报错 浏览器不认识 import 语法。

我要用 webpack 来构建我的源代码 - webpack 将调用 babelJS 预处理我的 JavaScript 代码。

## 安装 webpack

在 webpack-demo 项目根目录中安装 webpack

```
$ npm install -D webpack  //-D 的意思是 --save-dev （奖励老郭一朵小红花）
```

## 编译 JavaScript

webpack 是个打包工具，它需要一个入口文件，一个输出文件。（但是我写的是webpack4 它有默认的 哇哈哈哈哈  默认 固定入口目录为src，与入口默认文件index.js）

命令行下将 index.js 打包成 build.min.js

```
$ npx webpack ./index.js -o build.min.js

One CLI for webpack must be installed. These are recommended choices, delivered as separate packages:
 - webpack-cli (https://github.com/webpack/webpack-cli)
   The original webpack full-featured CLI.
 - webpack-command (https://github.com/webpack-contrib/webpack-command)
   A lightweight, opinionated webpack CLI.
We will use "npm" to install the CLI via "npm install -D".
Which one do you like to install (webpack-cli/webpack-command):
(辉式 翻译  小伙子/小姑凉 你这样做不行 我这里有两个宝物 你用了才可以 你喜欢前面/还是后面？)

```
命令没有执行，提示安装一个命令行工具，或 webpack-cli，或 webpack-command，这是因为 webpack 4 里将命令行相关代码迁移出去了。这里我选择 webpack-cli（正面肛）。（ps:其实一开始我选择的是 webpack-command（后入）然后浩楠说不行，后入我没试过，你得选前面。然后我删除了项目 选择webpack-cil）

输入 webpack-cil 然后回车，稍等一会儿，webpack-cil 就安装好。之后再执行上述打包命令，结果如下

```
$ npx webpack ./index.js -o build.min.js
ℹ ｢webpack｣: Starting Build
ℹ ｢webpack｣: Build Finished

webpack v4.12.0

91202319ba11d75b2587
  size    name  module        status
  59 B    14    ./index.js    built

  size    name  asset         status
  102 kB  main  build.min.js  emitted

  Δt 1451ms (14 modules hidden)

1 warning:xxx
```

打包成功，但有一个黄色警告。这是因为 webpack 4 引入了模式（mode），它有 development、production、none 三个值，我不指定值时，默认使用 production。

重新输入

```
$ npx webpack ./index.js -o build.min.js --mode development

```

不再出现黄色警告。

然后 不指定输入，输出文件 我就会发现 webpack4的默认文件

你输入

```
$ npx webpack --mode development

ℹ ｢webpack｣: Starting Build
ℹ ｢webpack｣: Build Finished

webpack v4.12.0

ef8f3a9c157bdc33b42c
  size  name  module  status

  Δt 36ms


Entry module not found: Error: Can't resolve './src' in '/Users/sam/tmp/webpack-demo'
  0:0  error  webpack-stylish: <please report unknown message format>

✖ 1 problem (1 error, 0 warnings)

```

好了 直接error 然后仔细看看 error 

说在 ./src 下找不到 index.js 文件 - 我不指定输入文件时，webpack 会默认查找 src/index.js - 这也是 webpack 4 引入的一个约定。我且按约定将项目根目录下的 index.js 移动到 src/index.js

```
$ mkdir src
$ mv index.js src

```

然后再打包一遍

```
$ npx webpack --mode development
ℹ ｢webpack｣: Starting Build
ℹ ｢webpack｣: Build Finished

webpack v4.12.0

2f08aaf407e061b8c85c
  size    name      module          status
  59 B    index.js  ./src/index.js  built

  size    name      asset           status
  730 kB  main      main.js         emitted  //看这里啊 他打包出来的是main.js

  Δt 323ms (21 modules hidden)

```

鹅妹子嘤 但是他咋打包出来dist/main.js ？这也是 webpack 4 加入的约定，用户未指定输出文件时默认输出到 dist/main.js。

身为懒汉的我 就直接将 index.html 中对 JavaScript 引用调整为编译后的 dist/main.js

```
 <body>
  <!-- <script src="./index.js"></script> -->
  <script src="dist/main.js"></script>
 </body>

```
刷新浏览器，控制台已经不再报错。

## 实时刷新

在 index.html 文件中引用构建出的 main.js 文件后，我有几个问题需要解决。
    1.入口文件 src/index.js 的变化如何通知给 webpack，以便重新构建 dist/main.js 文件？
    2.dist/main.js 文件更新后，浏览器中打开的页面该如何自动刷新？

### 监控文件

第一个问题，webpack 有好几个解决办法，其中 watch 选项最直观，我可以让 webpack 监控文件变化，一旦文件有变化，就重新构建。但默认情况下，watch 选项是禁用的。

我可以在命令行下启用它

```

$ npx webpack --mode development --watch
ℹ ｢webpack｣: Watching enabled
ℹ ｢webpack｣: Build Finished

webpack v4.12.0

2f08aaf407e061b8c85c
  size    name      module          status
  59 B    index.js  ./src/index.js  built

  size    name      asset           status
  730 kB  main      main.js         emitted

  Δt 305ms (21 modules hidden)

```

我试试在 index.js 文件中添加一行 console.log('hello webpack')，保存文件后就会看到命令行下的变化

```
｢webpack｣: Build Finished

webpack v4.12.0

ed01d2b2b0f8319e79d4
  size    name      module          status
  88 B    index.js  ./src/index.js  built

  size    name      asset           status
  730 kB  main      main.js         emitted

  Δt 16ms (21 modules hidden)

```

webpack 监控到 src/index.js 文件的变化，重新构建 dist/main.js，耗时 16ms。

### 刷新浏览器

至于自动刷新浏览器的问题，webpack 提供 webpack-dev-server 来解决，它是一个基于 expressjs 的开发服务器，提供实时刷新浏览器页面的功能。

## webpack-dev-serve

首先在项目下安装 webpack-dev-serve

```
$ npm install -D webpack-dev-serve

```

安装完成后在命令行下执行 webpack-dev-serve

```
//注意啊 小伙子/小姑凉 我这里是用的npx npx是npm包的执行器 高效便捷 如果你用的npm跑的 就不能这样写了

$ npx webpack-dev-serve  
ℹ ｢serve｣: Serving Static Content from: /
ℹ ｢serve｣: Project is running at http://localhost:8080
ℹ ｢serve｣: Server URI copied to clipboard
ℹ ｢hot｣: WebSocket Server Listening on localhost:63308
ℹ ｢hot｣: Applying DefinePlugin:__hotClientOptions__
ℹ ｢hot｣: webpack: Compiling...
ℹ ｢hot｣: webpack: Compiling Done
⚠ ｢wdm｣: Hash: 41a6e45972857b7bd6ef
Version: webpack 4.12.0
Time: 1825ms
Built at: 2018-06-23 14:50:13
  Asset     Size  Chunks             Chunk Names
main.js  178 KiB       0  [emitted]  main
Entrypoint main = main.js
 [0] (webpack)-hot-client/client/log.js 2.82 KiB {0} [built]
 [5] ./node_modules/react/index.js 190 bytes {0} [built]
 [6] ./src/index.js 88 bytes {0} [built]
[10] ./node_modules/url/util.js 314 bytes {0} [built]
[13] ./node_modules/node-libs-browser/node_modules/punycode/punycode.js 14.3 KiB {0} [built]
[14] ./node_modules/url/url.js 22.8 KiB {0} [built]
[15] (webpack)-hot-client/client/socket.js 1.45 KiB {0} [built]
[16] (webpack)-hot-client/client/hot.js 4.91 KiB {0} [built]
[17] ./node_modules/loglevelnext/dist/loglevelnext.js 55.9 KiB {0} [built]
[18] (webpack)-hot-client/client?8fbe603f-9c43-4757-a05b-f56a96de64d4 2.49 KiB {0} [built]
[19] multi webpack-hot-client/client?8fbe603f-9c43-4757-a05b-f56a96de64d4 ./src 40 bytes {0} [built]
[26] ./node_modules/react-dom/cjs/react-dom.production.min.js 92.7 KiB {0} [built]
[27] ./node_modules/react-dom/index.js 1.33 KiB {0} [built]
[28] ./node_modules/react/cjs/react.production.min.js 5.59 KiB {0} [built]
[29] multi ./src 28 bytes {0} [built]
    + 15 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
ℹ ｢wdm｣: Compiled with warnings.

```

来了 身为一个码农 从不看WARNING 我先看看 效果出现了没有

我现在可以在 http://localhost:8080/ 访问我的 index.html。

在入口文件 src/index.js 里再添加一行代码验证下浏览器页面的实时刷新功能

```
console.log('Just Fuck IT')

```

观察命令行，我可以看到，webpack-dev-serve 重新构建 main.js - 换句话说，webpack-dev-serve 自动启用 --watch 效果，前面的 npx webpack --mode development --watch 命令可以停用。

但是，浏览器中打开的页面并未自动刷新。这是一个让很多人困惑的问题。原因是 webpack-dev-serve 虽然监控到文件变化并重新构建了 main.js，但这个新构建的 main.js 存在于内存中，并且默认路径是 /main.js，而不是 /dist/main.js。我有两个选择，一是调整 publicPath，二是调整 index.html 中的引用。

懒人选后者

```

<!-- <script src="dist/main.js"></script> -->
  <script src="main.js"></script>

```

另外，mode 相关的警告要如何处理？

试试传递 mode 给 webpack-dev-serve，但很遗憾，会报错

```

$ npx webpack-dev-serve --mode development
Error: Flags were specified that were not recognized:

  --mode  Not sure what you mean there

Please check the command executed.
    at validate (/Users/sam/tmp/webpack-demo/node_modules/@webpack-contrib/cli-utils/lib/validate.js:103:15)
    at apply (/Users/sam/tmp/webpack-demo/node_modules/webpack-serve/lib/flags.js:29:5)
    at apply (/Users/sam/tmp/webpack-demo/node_modules/webpack-serve/lib/options.js:37:19)
    at load.then (/Users/sam/tmp/webpack-demo/node_modules/webpack-serve/lib/options.js:114:47)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
    at Function.Module.runMain (module.js:695:11)
    at findNodeScript.then.existing (/Users/sam/.nvm/versions/node/v8.11.1/lib/node_modules/npm/node_modules/libnpx/index.js:268:14)
    at <anonymous>$ npx webp

```
我只能通过 webpack.config.js 文件来配置 mode，至于原因，可以看[作者的理由](https://github.com/webpack-contrib/webpack-serve/issues/44#issuecomment-370431725)。


## 编码

完成上述准备工作后，在 src/index.js 中写个简单的 React 代码

```
 import React from 'react'
-import ReactDOM from 'react-dom'
+import ReactDOM from 'react-dom'
+ReactDOM.render(<div>hello webpack</div>, document.body)

```
注意，React 不推荐使用 body，这里只是图方便才这么写。(后面会改)

查看命令行下 webpack-dev-serve 的状态

```
ERROR in ./src/index.js 3:16
Module parse failed: Unexpected token (3:16)
You may need an appropriate loader to handle this file type.
| import React from 'react'
| import ReactDOM from 'react-dom'
> ReactDOM.render(<div>hello webpack</div>, document.body)
|
 @ multi ./src
ℹ ｢wdm｣: Failed to compile.

```

报错了。为什么？因为我写 JSX 语法，webpack 不认识。怎么办，找加载器 babel-loader 来翻译。

```
$ npm install -D "babel-loader@^8.0.0-beta" @babel/core @babel/preset-react

```

在 webpack-dev-server 下，我可以通过 --module-bind 参数来指定 js 语言的加载器

### 开始写我的重头戏 webpack.config.js 

来新建一个 webpack.config.js 文件

```
const path = require('path')
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  }
}

```

我在配置文件中指定了 js 文件的加载器，重启 webpack-dev-server，它会自动读取 webpack.config.js 配置。命令行不再报错，浏览器页面渲染出 “hello webpack”。


## 然后就是各种加载器

## 图片加载器

我需要一张图片，我从 我的私房照里选出一张 ，放到 src/img/bird.jpg 位置。

我在 src/index.js 中 import 它

```
import ReactDOM from 'react-dom'
+import Bird from './img/bird.jpg'
 ReactDOM.render(<div>hello webpack</div>, document.body)

```

报错吧 iTerm

```
ERROR in ./src/img/bird.jpg 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type.
(Source code omitted for this binary file)
 @ ./src/index.js 3:0-34
 @ multi ./src
ℹ ｢wdm｣: Failed to compile.
（翻译  这个傻逼不认识这个文件是什么）

```
和处理 JSX 一个道理，我需要图片加载器。

在 webpack 里，负责加载图片的是 file-loader

```
$ npm install -D file-loader

```

接着是配置 webpack.config.js

```
+      },
+      {
+        test: /\.(png|jpg|gif)$/,
+        use: [
+          {
+            loader: 'file-loader',
+            options: {}
+          }
+        ]
       }
     ]

```

重启 webpack-dev-serve，发现 webpack 已经能正常编译了 - 图片摇身一变，也是一个模块。

而且，webpack 在最终构建时，会自动将模块中引用的图片拷贝到相应目录 - 谢天谢地，再也不用手动拷贝静态资源。

确保图片加载没问题后，我来完善下代码

```
-ReactDOM.render(<div>hello webpack</div>, document.body)
+class App extends React.Component {
+  render () {
+    return (
+      <div><img src={Bird} alt='鸟' /></div>
+    )
+  }
+}
+ReactDOM.render(<App />, document.body)

```

查看浏览器，图片已经渲染出来 - 但是图片太大了。我需要 CSS 来控制图片尺寸。

## 加载 CSS 文件

在 React.js 里，CSS 有很多种写法，比如我可以直接写在 style 中

```
<img src={Bird} alt='鸟' style={{maxWidth: 500}} />

```

因为这就是 JavaScript，我也就不需要额外处理。

但我也可以写在 css 文件中。

在 src 下新增 index.css

```
.bird {
    width: 280px;
    height: 200px;
}

```

然后在 index.js 中引入并应用

```
import React from 'react'
 import ReactDOM from 'react-dom'
 import Rose from './img/rose.jpg'
+import './index.css'
 class App extends React.Component {
   render () {
     return (
-      <div><img src={Bird} alt='鸟' /></div>
+      <div><img src={Bird} alt='鸟' className='bird' /></div>
     )
   }
 }
```

但 webpack-dev-serve 又报错了

```
ERROR in ./src/index.css 1:0
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type.
> .flower {
|   max-width: 500px;
| }
 @ ./src/index.js 4:0-21
 @ multi ./src
ℹ ｢wdm｣: Failed to compile.

```

我需要 CSS 加载器：
1.css-loader - 预处理 CSS 文件
2.style-loader - 将 CSS 插入到 DOM 中的 style 标签

注意，我如果只使用了 css-loader，则 webpack 只是将 CSS 文件预处理成模块然后打包到构建文件中，并不会插入到页面 - 这是 style-loader 的作用。

```
//安装
$ npm install -D css-loader style-loader 
```

然后修改 webpack.config.js 配置

```
+      },
+      {
+        test: /\.css$/,
+        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
       }
     ]
   }

```

重启 webpack-dev-serve，编译正常，css 已生效。

但是，这里的 CSS 虽然是 import 进来的，但仍是全局的，等效于我平常使用 <link href="" /> 引用 CSS。webpack 还提供 CSS Modules，可以将样式真正意义上的模块化。

除了 CSS Modules 外，我还有很多 CSS in js 方案可选，它们允许我将样式跟 HTML、JS 放到一起 - 如果你写过 Vue.js 的单文件模块，可能会很喜欢。

在成功配置图片与 CSS 后，我可以继续完善代码：

src/index.css

```

.bird{
    width: 280px;
    height: 200px;
    transform: translateX(0px);
    transition: transform  2s;
}
.bird-fly{
    width: 280px;
    height: 200px;
    transform: translateX(200px);
    transition: transform  2s;
}

```

src/index.js

```
class App extends React.Component {
+  state = {
+    reset: 'yes'
+  }
+  onClick = () => {
+    this.setState({
+      reset: this.state.reset === 'yes' ? 'no' : 'yes'
+    })
+  }
   render () {
     return (
-      <div><img src={Bird} alt='鸟' className='bird' /></div>
+      <div><img src={Bird} alt='鸟' className={this.state.reset === 'yes' ? 'bird' : 'bird-fly'} onClick={this.onClick} /></div>
     )
   }
 }

```

但 webpack-dev-serve 又抛出错误

```
ERROR in ./src/index.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: /Users/sam/tmp/webpack-demo/src/index.js: Support for the experimental syntax 'classProperties' isn't currently enabled (6:9):

  4 | import './index.css'
  5 | class App extends React.Component {
> 6 |   state = {
    |         ^
  7 |     reset: 'yes'
  8 |   }
  9 |   onClick = () => {

Add @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' section of your Babel config to enable transformation.
    at _class.raise (/Users/sam/tmp/webpack-demo/node_modules/@babel/parser/lib/index.js:3893:15)
    at _class.expectPlugin (/Users/sam/tmp/webpack-demo/node_modules/@babel/parser/lib/index.js:5227:18)
    at _class.parseClassProperty (/Users/sam/tmp/webpack-demo/node_modules/@babel/parser/lib/index.js:8073:12)
    at _class.pushClassProperty (/Users/sam/tmp/webpack-demo/node_modules/@babel/parser/lib/index.js:8037:30)
    at _class.parseClassMemberWithIsStatic(/Users/sam/tmp/webpack-demo/node_modules/@babel/parser/lib/index.js:7970:14)
    at _class.parseClassMember (/Users/sam/tmp/webpack-demo/node_modules/@babel/parser/lib/index.js:7907:10)
    at _class.parseClassBody (/Users/sam/tmp/webpack-demo/node_modules/@babel/parser/lib/index.js:7862:12)
    at _class.parseClass (/Users/sam/tmp/webpack-demo/node_modules/@babel/parser/lib/index.js:7812:10)
    at _class.parseStatementContent (/Users/sam/tmp/webpack-demo/node_modules/@babel/parser/lib/index.js:7143:21)
    at _class.parseStatement (/Users/sam/tmp/webpack-demo/node_modules/@babel/parser/lib/index.js:7115:17)
 @ multi ./src
ℹ ｢wdm｣: Failed to compile.

```

这是因为我用了 JavaScript 的新特性 - 需要 @babel/plugin-proposal-class-properties 插件的支持。

首先是安装该插件

```
$ npm i -D @babel/plugin-proposal-class-properties

```

然后调整 webpack.config.js 配置

```
         options: {
-          presets: ['@babel/preset-react']
+          presets: ['@babel/preset-react'],
+          plugins: ['@babel/plugin-proposal-class-properties']
         }
       },

```

重启 webpack-dev-serve，编译正常。

查看浏览器，图片已经可以点击。

### 打包

在完成项目开发后，我需要输出文件给生产环境部署，执行

```
$ npx webpack --mode production

```

就可以打包出所有静态资源。

但这里有一个注意事项，所有静态资源是打包到 dist 目录的，而 index.html 是在根目录。在部署时，我需要手动将 index.html 拷入 dist 目录。

清理 dist
随着某些文件的增删，我的 dist 目录下可能产生一些不再使用的静态资源，我不想这些旧文件也部署到生产环境上占用空间，所以在 webpack 打包前最好能清理 dist 目录。

我来试试 clean-webpack-plugin。

首先是安装

```
$ npm i -D clean-webpack-plugin

```

然后在 webpack.config.js 中调用

```
const path = require('path')
+const CleanWebpackPlugin = require('clean-webpack-plugin')
 module.exports = {
   mode: 'development',
+  plugins: [
+    new CleanWebpackPlugin(['dist'])
+  ],
   module: {

```

之后再执行 npx webpack --mode production，webpack 就会在构建前清空 dist 目录。

### html-webpack-plugin

前面提到，我在部署时，需要将 index.html 拷入 dist 目录，这其实很不方便，而且容易遗漏。另外，这个简单项目里我只引用 main.js，如果入口文件多起来，文件名中再加上 hash 的话，手动管理 index.html 的成本非常高。

我可以借助 html-webpack-plugin，自动生成 index.html。

首先是安装

```
$ npm i --save-dev html-webpack-plugin

```

然后调整 webpack.config.js

```
const CleanWebpackPlugin = require('clean-webpack-plugin')
+const HtmlWebpackPlugin = require('html-webpack-plugin')
 module.exports = {
   mode: 'development',
   plugins: [
-    new CleanWebpackPlugin(['dist'])
+    new CleanWebpackPlugin(['dist']),
+    new HtmlWebpackPlugin()
   ],
```

接着删掉项目下的 index.html，并重启 webpack-serve。查看浏览器页面，能够正常访问，但 title 却是 Webpack App，再调整一下 webpack.config.js

```
 plugins: [
     new CleanWebpackPlugin(['dist']),
-    new HtmlWebpackPlugin()
+    new HtmlWebpackPlugin({
+      title: 'webpack--hui'
+    })
   ],

```

最后再试试打包 npx webpack --mode production

```
npx webpack --mode production
clean-webpack-plugin: /Users/sam/tmp/webpack-demo/dist has been removed.
ℹ ｢webpack｣: Starting Build
ℹ ｢webpack｣: Build Finished

webpack v4.12.0

77ff27c9fb12a302e424
  size     name  module                                     status
  82 B     5     ./src/img/rose.jpg                         built
  243 B    10    (node_modules)/css-loader!./src/index.css  built
  1.07 kB  11    ./src/index.css                            built
  944 B    20    ./src/index.js                             built

  size     name  asset                                      status
  1.06 MB  jpg   17f86d1c4bf821d9b9e8bfb0ec35bc8d.jpg       emitted
  109 kB   main  main.js                                    emitted
  179 B    html  index.html                                 emitted

  Δt 681ms (17 modules hidden)


performance
  0:0  warning  The following asset(s) exceed the recommended size limit (244 KiB).
                Assets:
                  17f86d1c4bf821d9b9e8bfb0ec35bc8d.jpg (1.01 MiB)
  0:0  warning  You can limit the size of your bundles by using import() or
                require.ensure to lazy load some parts of your application.

⚠  2 problems (0 errors, 2 warnings)

```

Cool，dist 目录下啥都有了，我不再需要部署前手动拷贝 index.html。

但是我总不能让react报错一直在吧 那我写一个

```
<body>
        <div id="APP"></div>
</body>

```

然后修改我的文件

```
}
-ReactDOM.render(<App />, document.body)
+ReactDOM.render(<App />, document.getElementById("APP"))
```

报错了  他说找不到这个元素  这是因为我打包的时候没有指定模板文件 所有index.html文件的修改 都不会触发 相信眼尖的早在命令行报错中看到了

那么 我修改一下config

```
 plugins:[
        //打包清理 dist 文件夹
        new CleanWebpackPlugin(['dist']),
        //自动生成index.html文件在dist目录下
        new HtmlWebpackPlugin({
            title:'webpack--hui',
            template:'./index.html',
        })
    ],
```

现在 我的react文件就不出错了

但是 我不可能就写这么一个js文件啊  我肯定有一堆的组件  甚至还有深层嵌套

所以 我在src文件下 创建一个css文件夹 一个js文件夹 

把我的css丢到css文件夹中  组件丢到js文件夹中 （但是 千万不要丢index.js）

接下来我引入react-router-dom

```
npm install -D react-router-dom

```

然后在index.js 引入

```
import ReactDOM from 'react-dom'
+import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';

```

然后修改我的代码 看上去正常一点

```
//这里我是直接引入的 
import Home from './js/Home';
import One from './js/One';
import Two from './js/Two';


class App extends React.Component {
-  state = {
-    reset: 'yes'
-  }
-  onClick = () => {
-    this.setState({
-      reset: this.state.reset === 'yes' ? 'no' : 'yes'
-    })
-  }
   render () {
     return (
          <Router >
                <div>
                    <ul>
                        <li>
                            <Link to="/one">one</Link>
                        </li>
                        <li>
                            <Link to="/two">two</Link>
                        </li>
                    </ul>

                    <hr/>
                    <Switch>
                        <Route exact path="/" component={Home}/> //注意这里exact是表示严格模式
                        <Route  path="/one" component={One}/>
                        <Route path="/two" component={Two}/>
                    </Switch>
                </div>
            </Router>
     )
   }
 }
```

(ps:写Home.js,One.js,Two.js的代码就是直接return home one two 我就不写在readme里面了)
运行发现 我得到了一个可以跳转的网页 鹅妹子嘤

但是 我仔细看打包文件

他好像是把所有的文件都打包到一个main.js文件里面  这样不行啊 我要的是按需加载

于是 再三请教我的浩楠胸之后  我浩楠胸开始教我

首先我新建一个文件夹 

```
$ mkdir router
$ mv Bundle.js router

```

## 写我的Bundle.js

```
// 异步加载组件
import React, {Component} from 'react'

export default class Bundle extends Component {
  constructor(props) {
      super(props)
      this.state = {
          mod: null
      }
  }

  componentWillMount() {
      this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.load !== this.props.load) {
          this.load(nextProps)
      }
  }

  load(props) {
      this.setState({
          mod: null
      })
      //注意这里，使用Promise对象; mod.default导出默认
      props.load().then((mod) => {
          this.setState({
              mod: mod.default ? mod.default : mod
          })
      })
  }

  render() {
      return this.state.mod ? this.props.children(this.state.mod) : null
  }
}


```

然后我在index.js中修改一下

```
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';
// 按需加载要走的组件
import Bundle from './router/Bundle';

//  按需加载的组件用Bundle组件包裹一下
const One = (props) => (
    <Bundle
        load={() => require.ensure([], function () {
        return require('./js/One')
    }, 'One')}>  //这里的第三个参数 是打包文件输出的name
        {(One) =>< One {
            ...props
        } />}
    </Bundle>
)

const Two = (props) => (
    <Bundle
        load={() => require.ensure([], function () {
        return require('./js/Two')
    }, 'Two')}>
        {(Two) =>< Two {
            ...props
        } />}
    </Bundle>
)



```

报错吧 iTerm  原因 他说返回的类型不对 是一个对象 没办法识别 这个蠢蛋  然后浩楠和我都懵逼了 这可咋办啊 要不咱们就这样完结算了吧  后来我抱着试一试的心态去问了我的你我他一姐（静姐） 静姐 微微一笑  一群傻子 他识别不了 你们不知道下插件啊

于是 我在膜拜中 静姐告诉了我

```
npm install -D "@babel/plugin-syntax-dynamic-import"

```

然后 我在config中再次修改

```
 options:{
                    presets:['@babel/preset-react'],
                    //新特性 加载器
                    plugins:['@babel/plugin-proposal-class-properties','@babel/plugin-syntax-dynamic-import']

                }

```

再次运行 完美 破菲特

最后 我深层嵌套路由 怎么办呢  我中不能就一个一级目录玩一年吧

然后我添加一个Next.js (照例我还是直接返回一个next就够了))

index.js文件 添加一下

```
const Next = (props) => (
    <Bundle
        load={() => require.ensure([], function () {
        return require('./js/Next')
    }, 'Next')}>
        {(Next) =>< Next {
            ...props
        } />}
    </Bundle>
)



    <Route exact path="/one" component={One}/> //exact 代表严格匹配模式
    + <Route path="/one/next" component={Next}/>
    <Route path="/two" component={Two}/>

```

然后 我的one.js 加一句

```
class One extends Component {
    render() {
        return (
            <div>
               <div> 这是one</div>
               <Link to="/one/next">next</Link>
            </div>
        );
    }
}

```

运行  完美 浏览器 url 变成了 http://localhost:8080/#/one/next  页面也显示了 Next 

这里要注意一个点 我在

```
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'; //BrowserRouter是无法跳二级目录的 只有改成HashRouter 才可以 （奖励阿雪一朵小红花）

import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';

```

以上就是框架的基本搭建  后期我会慢慢补充 争取做成一个项目 还没定方向 


本文前半部分主要借鉴[webpack 4 教程](https://blog.zfanw.com/webpack-tutorial/#%E5%AE%89%E8%A3%85-webpack)

后半部分主要通过 浩楠 静姐 阿雪 老郭 军军 等人的协助完成


## 抽取router文件 最近很忙 没时间研究新东西 然后周五被一个傻逼搞坏了心情

首先 我看 我的router是写在index文件内的 但是我项目中明显不是这样的 项目中 router文件一般都是单独存在 我只需要在指定的文件内进行增删就好了 

所以我要开始抽取router文件了

在我的router文件下 新建一个文件 就叫router.js就好了

文件内容很简单 就是把index部分处理 router的部分 封装成一个组件 暴露出去就好了

```

import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';
// 按需加载要走的组件
import Bundle from './Bundle';

//这是主页面
import App from '../js/App';


//  按需加载的组件用Bundle组件包裹一下
const One = (props) => (
    <Bundle
        load={() => require.ensure([], function () {
        return require('../js/One')
    }, 'One')}>
        {(One) =>< One {
            ...props
        } />}
    </Bundle>
)

const Two = (props) => (
    <Bundle
        load={() => require.ensure([], function () {
        return require('../js/Two')
    }, 'Two')}>
        {(Two) =>< Two {
            ...props
        } />}
    </Bundle>
)

const Next = (props) => (
    <Bundle
        load={() => require.ensure([], function () {
        return require('../js/Next')
    }, 'Next')}>
        {(Next) =>< Next {
            ...props
        } />}
    </Bundle>
)



class Routers extends Component {
    render() {
        return (
            <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/one" component={One}/>
            <Route path="/one/next" component={Next}/>
            <Route path="/two" component={Two}/>
        </Switch>
        );
    }
}

export default Routers;


```


相应的 我的index.js也应该去掉那部分代码


```
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';

import 'antd/dist/antd.css'
// 直接引入的组件
import Routers from './router/routers';


// 引入css
import './css/index.css';

// 正常写法
class Reactroot extends React.Component {
    render() {
        return (
            <Router >
                <div>
                    {/* <ul>
                        <li>
                            <Link to="/">App</Link>
                        </li>
                        <li>
                            <Link to="/one">one</Link>
                        </li>
                        <li>
                            <Link to="/two">two</Link>
                        </li>
                    </ul> */}

                  <Routers />
                </div>
            </Router>
        )
    }
}
ReactDOM.render(
    <Reactroot/>, document.getElementById("APP"))
```

现在我的router文件就被抽离出来了  我只需要在router文件内进行 按需加载的编写 和路由编写 就好了


### 引入antd 

emm 我开始写业务代码了 开始给我这个Just IT写一个主页  但是要我自己手撸组件太烦了 于是我引入了一个UI组件  antd

```
废话不多说 上手就先把 antd先给下载了

$ npm install antd --save
```

看一眼我的package.json antd在了 接下来继续安装一个友好的插件

```
$ npm install babel-plugin-import --save-dev

```

好了 齐活

给我的App.js 来入手一个

```

import {Button} from 'antd';


render() {
        return (
            ...
            <Button>BTN<Button/>
            ...
        )    
    }

```

看看页面 显示了 但是不是我需要的样子 

看一眼官网 恩 需要我一开时就加载一个全局css样式

在我的index.js 写上

```

// 引入antd css
import 'antd/dist/antd.css'

```
重启node ok齐活 

















