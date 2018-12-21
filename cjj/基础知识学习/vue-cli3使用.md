配置自定义的环境变量与模式  
1. 需要在项目根目录创建``.env.[mode]``文件，如自定义一个mock模式则创建 ``.env.mock``
2. 在文件内写上需要的环境变量
    ```
    NODE_ENV=production
    VUE_APP_MOCKURL=https://www.easy-mock.com/mock/.....
    BASEURL=/mock
    ```
    此处说明一下：在客户端里面使用的变量需要加上``VUE_APP_``前缀才能通过``process.env.VUE_APP_[variable]``获取到对应的变量。如上面代码中的``VUE_APP_MOCKURL``。在webpack中使用就不需要这样做，直接``process.env.[variable]``就能获取到
  1. 在package.json中配置
      ```json
      {
        "scripts": {
          "build&Mock": "vue-cli-service build --mode mock" // 此处的mock就是第一步创建的文件.env.mock中的mock字段
        },
      }
      ```
      注意：通过vue ui运行对应的模式的话注意一定要将环境设置为``(unset)``，不然默认的``production``模式会覆盖掉你自定义的模式，同时记得在自定义模式中设置``NODE_ENV``，不然默认的NODE_ENV为``development``

3. 配置多页面应用时，访问不同的页面返回的都是index页面的内容。此时需要在vue.config.js中做如下配置：
```javascript
// vue.config.js
module.exports = {
  pages: {
    index: '.src/index.js',
    otherpage: '.src/otherpage.js'
  },
  devServer: {
    //...
    historyApiFallback: {
      rewrites: [
        { from: /^\/subpage/, to: '/subpage.html' } // 页面路由指向特定的html文件
      ]
    }
  }
}
```
4. 开启gzip
- 第一步 安装compression-webpack-plugin
  ```shell
  npm i -D compression-webpack-plugin
  ```
- 第二步 在vue.config.js中配置
  ```javascript
  module.exports = {
    //...
    configureWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
        return {
          plugins: [
            /* gzip压缩 */
            new CompressionPlugin({
              test: /\.js$|\.html$|.\css/, // 匹配文件名
              threshold: 10240, // 对超过10k的数据压缩
              deleteOriginalAssets: false // 不删除源文件
            })
          ]
        }
      }
    }
  }
  ```
