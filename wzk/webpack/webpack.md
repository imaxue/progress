#### 1. 产生背景
- 越来越多的 JavaScript代码，这给前端开发的流程和资源组织带来了巨大的挑战, 模块化系统成为需要;
- 前端模块加载:
  - 按需进行懒加载，在实际用到某些模块的时候再增量更新，才是较为合理的模块加载方案。
  - 要实现模块的按需加载，就需要一个对整个代码库中的模块进行静态分析、编译打包的过程。
- 所有资源都是模块, 那么如何做到让 require 能加载各种资源呢？答案是静态分析
- 静态分析：
  - 在编译的时候，要对整个代码进行静态分析，分析出各个模块的类型和它们依赖关系，然后将不同类型的模块提交给适配的加载器来处理。
  - 比如一个用 LESS 写的样式模块，可以先用 LESS 加载器将它转成一个CSS 模块，在通过 CSS 模块把他插入到页面的 <style> 标签中执行。Webpack 就是在这样的需求中应运而生。
 
#### 2. 什么是 Webpack?
- Webpack 是一个模块打包器。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

#### 3. 安装
- 全局安装:

```
$ npm install webpack -g
webpack -v 测试安装成功与否
```

- 本地安装:
  - 准备工作: # 进入项目目录   ==># 确定已经有 package.json，没有就通过 npm init 创建
  - 执行命令： $ npm install webpack --save-dev

#### 4. 简单示例
- 代码如下：
```
//index.html    
<body>
  <script src="bundle.js"></script>
</body>

//entry.js
document.write('It works.')
document.write(require('./module.js')) // 添加模块

//module.js
module.exports = 'It works from module.js.'
```
- 执行打包命令：

```
$ webpack entry.js bundle.js
```
- 页面效果：
  - It works. It works from module.js.
- 总结：Webpack 会分析入口文件，解析包含依赖关系的各个文件。这些文件（模块）都打包到 bundle.js 。

#### 5. Loader
- Webpack 本身只能处理JavaScript模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。
- Loader 本身也是运行在node.js环境中的JavaScript模块，它通常返回一个函数。
- 大多数情况下，我们通过 npm 来管理 loader，你也可以在项目中自己写 loader 模块。
- 具体使用：
  - 安装 loader：npm install css-loader style-loader
  - 编写 style.css： body { background: yellow; }
  - 编写修改 entry.js：
    ```
    require("!style!css!./style.css") // 载入 style.css
    document.write('It works.')
    document.write(require('./module.js'))
    ```

  - 执行打包命令：$ webpack entry.js bundle.js
 
#### 6. 配置文件webpack.config.js
- 本质: 配置文件的作用和命令行中传入参数一样;
  - 没配置文件时，执行命令:
    ```
    $  webpack entry.js bundle.js --module-bind 'css=style!css'
    ```
  - 配置文件后,执行命令: 
    ```
    $  webpack
    ```
- Webpack 在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认情况下，会搜索当前目录的 webpack.config.js 文件，这个文件是一个 node.js 模块，返回一个 json 格式的配置信息对象
- 创建一个配置文件 webpack.config.js
    ```
    var webpack = require('webpack')
    module.exports = {
      entry: './entry.js',
      output: {
        path: __dirname,
        filename: 'bundle.js'
      },
      module: {
        loaders: [  {test: /\.css$/, loader: 'style!css'}   ]
      }
    }
    ```
- 同时简化 entry.js 中的 style.css 加载方式：require('./style.css')
- 运行简化的打包命令：$  webpack

#### 7. 插件
- 插件可以完成更多 loader 不能完成的功能。
- 插件的使用一般是在 webpack 的配置信息 plugins 选项中指定。
- Webpack 本身内置了一些常用的插件，还可以通过 npm 安装第三方插件。
- BannerPlugin 内置插件的使用步骤:
  - 此插件作用: 这个插件的作用是给输出的文件头部添加注释信息
  - 配置:
    - 修改 webpack.config.js，添加 plugins：
    ```
      plugins: [
        new webpack.BannerPlugin('This file is created by zhaoda')
      ]
    ```
  - 运行命令  $  webpack
  - 最终效果: 可以看到打包后的文件头部出现了我们指定的注释信息.

#### 8. 开发环境,服务器(重点)
- 1. 编译过程显示进度条
  - 命令：$ webpack --progress --colors
  - 当项目逐渐变大，webpack的编译时间会变长，可以通过参数让编译的输出内容带有进度和颜色。
- 2. 监听文件变化自动打包
  - $ webpack --progress --colors --watch
  - 如果不想每次修改模块后都重新编译，那么可以启动监听模式。
  - 开启监听模式后，没有变化的模块会在编译后缓存到内存中，而不会每次都被重新编译，所以监听模式的整体速度是很快的。
- 3. 监听文件自动打包且自动刷新浏览器
  - #安装:
    ```
     $ npm install webpack-dev-server -g
    ```
  - #运行: 
    ```
    $ webpack-dev-server --progress --colors
    ```
  - 在浏览器打开 http://localhost:8080/或http://localhost:8080/webpack-dev-server/就能实现页面自刷新效果;
  - 原理: 使用 webpack-dev-server 开发服务是一个更好的选择。它将在 localhost:8080 启动一个 express 静态资源 web 服务器，并且会以监听模式自动运行 webpack，在浏览器打开 http://localhost:8080/ 或 http://localhost:8080/webpack-dev-server/ 可以浏览项目中的页面和编译后的资源输出，并且通过一个 socket.io 服务实时监听它们的变化并自动刷新页面。
 
#### 9. 项目中添加第三方库
- 编写js代码时, 常用到jquery等的类库,没有webpack构建工具前我们通过script标签引入jquery文件 , 现在应用webpack后如何构建文件间的依赖呢?
- 只是改变了引用jquery文件的引入方式而已
- 下载安装jquery：  npm install jquery  --save-dev
- js文件中引入使用即可：
    ```
    var $ = require('jquery');
    $('body').append('<p>look at me! </p>');
    ```
#### 10. 添加ES6的支持
- 编码js时 , webpack原生直接支持AMD和CommonJS两种格式，如果你想使用ES6的风格 , 安装插件即可；
- 首先 装各种loader
    ```
    npm install babel-loader babel-preset-es2015 --save-dev
    ```
- 配置我们的config文件
    ```
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          presets: ['es2015']
        }
      },
    
    ```
- ES6的js代码示例：
```
//sub.js
export default function() {
  var element = document.createElement('h2');
  element.innerHTML = "Hello h2 world hahaha";
  return element;
}
//index.js
import './main.scss';
import generateText from './sub';
import $ from 'jquery';
import moment from 'moment';

let app  = document.createElement('div');
const myPromise = Promise.resolve(42);
```
#### 总结
- 1, 应用webpack工具时 , 没有打包前文件之间有依赖关系的 , 只是浏览器不认识依赖语法
- 2, webpack的本质作用就是解决模块文件的定义、依赖和导出 , 就是这么个模块系统;
