# vue-cli升级webpack4

1、升级nodejs

　　使用 webpack4 时，必须保证 Node.js 版本 >= 8.9.4，因为 webpack4 使用了大量的ES6语法，这些语法在 nodejs新版 v8 中得到了原生支持

2、升级webpack主要部件，包括webpack、webpack-bundle-analyzer、webpack-dev-server、webpack-merge

　　升级的操作很简单，先删除，再安装即可。但要注意的是webpack4版本中 cli 工具分离成了 webpack 核心库 与 webpack-cli 命令行工具两个模块，需要使用 CLI，必安装 webpack-cli 至项目中
```shell

npm uninstall -D webpack webpack-bundle-analyzer webpack-dev-server webpack-merge


npm install -D webpack webpack-cli webpack-bundle-analyzer webpack-dev-server webpack-merge

```
3、升级webpack相关插件，包括copy-webpack-plugin、css-loader、eslint-loader、file-loader、html-webpack-plugin、url-loader、friendly-errors-webpack-plugin、optimize-css-assets-webpack-plugin、uglifyjs-webpack-plugin

```shell
npm uninstall -D copy-webpack-plugin css-loader eslint-loader file-loader html-webpack-plugin url-loader  friendly-errors-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin

npm install -D copy-webpack-plugin css-loader eslint-loader file-loader html-webpack-plugin url-loader  friendly-errors-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin

```
4、升级vue-loader

　　由于vue-loader升级到版本15后，配置有较多的变化，稳妥起见，可以只将vue-loader升级到14.4.2

```shell
npm uninstall -D vue-loader
npm install -D vue-loader
```

5、替换webpack相关插件，extract-text-webpack-plugin替换为mini-css-extract-plugin
```shell
npm uninstall -D extract-text-webpack-plugin
npm install -D mini-css-extract-plugin
```

## 代码层面：
webpack.base.conf.js 添加
```js
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode : 'development',
    ***
    plugins: [
        new VueLoaderPlugin()
    ],
    ***
}

```

### 生产环境升级

在 prod 环境中添加 mode ： ‘production’ 
用 optimization 代替以前的 

webpack.optimize.CommonsChunkPlugin 、  
uglifyjs-webpack-plugin 、  
webpack.optimize.ModuleConcatenationPlugin

```js
const webpackConfig = merge(baseWebpackConfig, {
    // ...
    mode: 'production',
    // webpack4 内置
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          minChunks: 2,
          name: 'vendors',
        },
       
        // 以下这部分，是把所有css文件合并成一个文件，vendors除外，如果vendors也打包进去，把注释的那行替换一下
        // 如果不想合并，喜欢按需加载，把下边的都注释就可以了
        "styles-compiled": {
          name: "styles",
          test: module =>
            module.nameForCondition &&
            // /\.(s?css|vue)$/.test(module.nameForCondition()) && !/^javascript/.test(module.type),
            /\.vue$/.test(module.nameForCondition()) && !/^javascript/.test(module.type),
          chunks: "all",
          enforce: true
        }
      }
    },
    runtimeChunk: { name: 'runtime' }
  },
  // ...
  pluins: {
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     beautify: false,
    //     comments: false,
    //     compress: {
    //       warnings: false,
    //       drop_console: true
    //     }
    //   },
    //   sourceMap: config.build.productionSourceMap,
    //   parallel: true
    // }),

    // ...

    // enable scope hoisting
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks (module) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity
    // }),
    // // This instance extracts shared chunks from code splitted chunks and bundles them
    // // in a separate chunk, similar to the vendor chunk
    // // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'app',
    //   async: 'vendor-async',
    //   children: true,
    //   minChunks: 3
    // }),
  }
}

```

### 替换依赖 “mini-css-extract-plugin”

修改 webpack.prod.conf.js 
```js
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// ...
// extract css into its own file
// new ExtractTextPlugin({
// ...
// })
// 升级 webpack4， 由 ExtractTextPlugin 改用 MiniCssExtractPlugin
new MiniCssExtractPlugin({
  filename: utils.assetsPath('css/[name].[contenthash].css'),
  allChunks: true,
}),

```

修改utils.js 
```js

// utils.js
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// ...

// generate loader string to be used with extract text plugin
function generateLoaders (loader, loaderOptions) {
  const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: Object.assign({}, loaderOptions, {
        sourceMap: options.sourceMap
      })
    })
  }

  // Extract CSS when that option is specified
  // (which is the case during production build)
  // if (options.extract) {
  //   return ExtractTextPlugin.extract({
  //     use: loaders,
  //     fallback: 'vue-style-loader'
  //   })
  // } else {
  //   return ['vue-style-loader'].concat(loaders)
  // }
  // 升级 webpack4， 由 ExtractTextPlugin 改用 MiniCssExtractPlugin
  return [
    options.extract ? MiniCssExtractPlugin.loader : 'vue-style-loader',
  ].concat(loaders)
}

```

## 最后babel-loader
在webpack.base.conf.js文件里，babel-loader后边加上一个参数，项目构建时间再缩减一半
loader: 'babel-loader?cacheDirectory=true',

- cacheDirectory：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)。如果设置了一个空值 (loader: 'babel-loader?cacheDirectory') 或者 true (loader: babel-loader?cacheDirectory=true)，loader 将使用默认的缓存目录 node_modules/.cache/babel-loader，如果在任何根目录下都没有找到 node_modules 目录，将会降级回退到操作系统默认的临时文件目录。


## 其他
如果遇到postcss警告需要再升级下依赖
npm update  postcss-loader
打包报错，切换分支打包报错，记得再安装一次
npm install
