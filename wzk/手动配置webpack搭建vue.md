##### 1、 npm init -y 初始化项目 
##### 2、安装各种依赖项

```
    //安装vue2.0 
    npm install --save vue 
    //安装webpack
    npm install --save-dev webpack
    //安装webpack-cli
    npm install --save-dev webpack-cli
    //安装webpack测试服务器
    npm install --save-dev webpack-dev-server
    //安装webpack插件，解析ES6语法
    npm install --save-dev babel-core babel-loader babel-preset-es2015
    //安装webpack插件,用来解析vue的组件，.vue后缀的文件
    npm install --save-dev vue-loader vue-template-compiler 
    //安装webpack插件,用来解析css
    npm install --save-dev css-loader file-loader style-loader
```
##### 3、编写页面
- 3.1. 新建目录src，里面新建App.vue
- 3.2. 在src目录下新建main.js
- 3.3. 配置webpack.config.js
    ```
    /* 引入操作路径模块和webpack */
    var path = require('path');
    var webpack = require('webpack');
    const VueLoaderPlugin = require('vue-loader/lib/plugin');
    
    module.exports = {
        // 输入文件
        entry: './src/main.js',
        output: { 
            /* 输出目录，没有则新建 */ 
            path: path.resolve(__dirname, './dist'), 
            /* 静态目录，可以直接从这里取文件 */ 
            publicPath: '/dist/', 
            /* 文件名 */ 
            filename: 'build.js' 
      },
      plugins: [
          // make sure to include the plugin for the magic
          new VueLoaderPlugin()
      ],
        module: { 
            rules: [ 
                /* 用来解析vue后缀的文件 */ 
                { test: /\.vue$/, 
                    loader: 'vue-loader' 
                }, 
                /* 用babel来解析js文件并把es6的语法转换成浏览器认识的语法 */ 
                { test: /\.js$/, 
                    loader: 'babel-loader', 
                    /* 排除模块安装目录的文件 */ 
                    exclude: /node_modules/ 
                },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
            ] 
        }
    
    }
    ```

##### 4、在package.json添加npm脚本
- 添加脚本后执行自定义命令即可编译或者编译启服务；
```
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open --config webpack.config.js",
    "build": "webpack --config webpack.config.js",
  },
  "keywords": [],
```

##### 5、打包项目
  - 执行命令npm build
  - 这时目录下会多出一个dist文件夹，查看里面会有build.js，发觉里面的es6语法已经被转化了

##### 6、根目录下新建index.html，引入build.js然后打开
- index.html相当于网站入口文件
- 引入dist/build.js文件
- 在浏览器中直接打开index.html即可看到完整的页面效果；
- 这样就算打包完成了，但是每修改一次都要重新打包这样显然没有任何效率，于是需要webpack-dev-server启服务实时更新；

##### 7、启动webpack-dev-server服务
- 安装npm install webpack-dev-serve --save-dev
- 执行命令npm start即可
- 在浏览器输入http://localhost:8080/查看页面
- 这时修改页面的代码，不用刷新浏览器直接更改

##### 报错解决
- vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your 
  - 参考官方文档 https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required
  - Vue-loader在15.*之后的版本都是vue-loader的使用都是需要伴生VueLoaderPlugin的
    ```
    const VueLoaderPlugin = require('vue-loader/lib/plugin');
    module.exports = {
        devtool: "sourcemap",
        entry: './js/entry.js', // 入口文件
        output: {
            filename: 'bundle.js' // 打包出来的wenjian
        },
        plugins: [
            // make sure to include the plugin for the magic
            new VueLoaderPlugin()
        ],
        module : {
        ...
    }
    }
    ```
