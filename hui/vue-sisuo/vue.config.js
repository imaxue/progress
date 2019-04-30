var webpack = require('webpack')
module.exports={
    pages:{
        index: {
            entry: './src/login.js',
            template: './public/login.html'
        },
        home: {
            entry: './src/main.js'
        }
    },
    configureWebpack:{
        plugins: [
            new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery",
              jquery: "jquery",
              "window.jQuery": "jquery"
            })
          ],
    }
}