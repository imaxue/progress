# 基本信息
本次升级的项目是公司中的小项目（所以才能让我乱玩），技术架构是vue全家桶，项目直接是vue-cli（2.9.3）生成出来的

# start
+ 首当其冲升级webpack
  ```
  npm update webpack -D
  npm i webpack-cli -D
  ```
  升级后的webpack必须搭配[webpack-cli](https://webpack.js.org/api/cli/)食用，webpack-cli用于执行webpack启动与其他的命令行设置
ok，启动项目
  ```
  npm run dev
  ```
  发现报错：
![错误信息](http://upload-images.jianshu.io/upload_images/10506000-266380212529af10..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
+ webpack-dev-server
这是我们遇到的第一个错误，出现这个错误的原因是由于vue-cli后续使用webpack-dev-server取代了原先的express+中间件的方式（其实原理都一样）用于启动项目。当webpack与webpack-dev-server的版本不一致时，就会报这个错
  ```
  npm update webpack-dev-server -D
  ```
  重启项目
![报错信息](http://upload-images.jianshu.io/upload_images/10506000-ff2871add2235828..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

+ html-webpack-plugin
这个错误还是显而易见的，直接在错误信息中指明了问题所在，继续走起
  ```
  npm update html-webpack-plugin -D
  ```
  重启项目
![报错信息](http://upload-images.jianshu.io/upload_images/10506000-72bc18ab20f1f4bf..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

+ 各种loader
由于项目中开启了eslint，升级webpack后还需要再升级相应的文件包与loader，每个人项目中安装的依赖各不同，这里不过多描述。接下来的报错请自行对包或其loader进行升级即可
重启项目
![报错信息](http://upload-images.jianshu.io/upload_images/10506000-5822f8a4dfdeb5f6..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

+ copy-webpack-plugin/mode
继续重启项目，我们发现控制台又报了两个警告，对应的分别是copy-webpack-plugin插件，对于这个插件只需正常升级即可
  ```
  npm update copy-webpack-plugin -D
  ```

+ mode
重点说下**mode**，mode可设置两个值，分别为“development”与“production”：

|development|production|
|:-:|:-:|
|针对快速增量重建进行了优化|对于打包速度进行优化|
|开发模式下支持注释和提示，并且支持 eval 下的 source maps|不支持watching|
|自动设置process.env.NODE_ENV的值为development|自动设置process.env.NODE_ENV的值为production|
||自动对代码进行压缩等|

设置完mode后，原先文件中的``webpack.DefinePlugin/UglifyJsPlugin``等即可删除了，我们重启项目
![正常启动](http://upload-images.jianshu.io/upload_images/10506000-734bbfa0e89a0a2f..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

+ CommonsChunkPlugin
项目终于可以正常启动了，不过不要激动，这只是开发环境。当你开发完成想打包的时候，运行``build``会发现又有报错。我们还差最后一步，删除CommonsChunkPlugin，替换为splitChunks
```js
splitChunks: {
  chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async"    minSize: 0, // 最小尺寸，默认0   minChunks: 1, // 最小 chunk ，默认1   maxAsyncRequests: 1, // 最大异步请求数， 默认1   maxInitialRequests : 1, // 最大初始化请求书，默认1   name: function(){}, // 名称，此选项可接收 function   cacheGroups:{ // 这里开始设置缓存的 chunks     priority: 0, // 缓存组优先级     vendor: { // key 为entry中定义的 入口名称       chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)        test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk       name: "vendor", // 要缓存的 分隔出来的 chunk 名称        minSize: 0,       minChunks: 1,       enforce: true,       maxAsyncRequests: 1, // 最大异步请求数， 默认1       maxInitialRequests : 1, // 最大初始化请求书，默认1       reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）     }   } } },
  minSize: 0, // 最小尺寸，默认0
  minChunks: 1, // 最小 chunk ，默认1
  maxAsyncRequests: 1, // 最大异步请求数， 默认1
  maxInitialRequests : 1, // 最大初始化请求书，默认1
  name: function () {}, // 名称，此选项可接收 function
  cacheGroups: { // 这里开始设置缓存的 chunks
    priority: 0, // 缓存组优先级
    vendor: { // key 为entry中定义的 入口名称
      chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
      test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
      name: "vendor", // 要缓存的 分隔出来的 chunk 名称
      minSize: 0,
      minChunks: 1,
      enforce: true,
      maxAsyncRequests: 1, // 最大异步请求数， 默认1
      maxInitialRequests : 1, // 最大初始化请求书，默认1
      reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
    }
  }
}
```

# end
将上述步骤执行后即可成功升级webpack到4.x，但这也只是基础升级而已，更多好玩的特性还有待各位开发！

