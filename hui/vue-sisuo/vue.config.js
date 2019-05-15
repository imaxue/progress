var webpack = require('webpack')
const FileManagerPlugin = require('filemanager-webpack-plugin');
module.exports={
    pages:{
        // index: {
        //     entry: './src/login.js',
        //     template: './public/login.html'
        // },
        index: {
            entry: './src/main.js'
        }
    },
    devServer: {
        proxy:{
            "/api": {
                target: "http://10.128.106.99:8090", //设置你调用的接口域名和端口号
                changeOrigin: true, //跨域
                ws:true,
                pathRewrite: {
                  "^/api": "/" 
                }
              }
        }
      },
    configureWebpack:{
        plugins: [
            new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery",
              jquery: "jquery",
              "window.jQuery": "jquery"
            }),
            new FileManagerPlugin({  //初始化 filemanager-webpack-plugin 插件实例
                onEnd: {
                  delete: [   //首先需要删除项目根目录下的dist.zip
                    './dist.zip',   
                  ],
                  archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
                    {source: './dist', destination: './dist.zip'},   
                  ]
                }
              })
          ],
        
    }
}