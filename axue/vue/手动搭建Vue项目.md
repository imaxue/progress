初始化 npm 项目

> npm init

编辑 package.json

```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "webpack-demo",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --mode development --hot",
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "vue-loader": "^15.4.2",
    "vue-template-compiler": "^2.5.17",
    "webpack": "^4.19.0",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.8"
  },
  "dependencies": {
    "vue": "^2.5.17"
  }
}
```

安装依赖

> npm i

配置 `webpack.config.js`

```javascript
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      /* 用来解析vue后缀的文件 */
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/

      },
      /* 用babel来解析js文件并把es6的语法转换成浏览器认识的语法 */
      {
        test: /\.js$/,
        loader: 'babel-loader',
        /* 排除模块安装目录的文件 */
        exclude: /node_modules/
      },
    ]
  }
}
```

创建文件

src/main.js

```javascript
import Vue from 'Vue'
import App from './App.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')
```



src/App.vue

```vue
<template>
  <div>hello world</div>
</template>
```



index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
<div id="app"></div>
<script type="text/javascript" src="bundle.js"></script>
</body>
</html>
```



