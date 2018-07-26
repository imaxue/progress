const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    //webpack 4 引入了模式（mode），它有 development、production、none 三个值，我们不指定值时，默认使用 production。
    mode :'development',

    //这里应该是抽取公共文件 但是没成功 我还在看
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    
    plugins:[
        //打包清理 dist 文件夹
        new CleanWebpackPlugin(['dist']),
        //自动生成index.html文件在dist目录下
        new HtmlWebpackPlugin({
            title:'webpack--hui',
            template:'./index.html',
        })
    ],
    output:{
        path:path.join(process.cwd(),'dist'),
        libraryTarget:'umd',
        filename:'[name].[chunkhash].js',
        chunkFilename:'[name].[chunkhash].js'
    },
    // 加载器
    module:{
        // rules 是一个数组，里边可以添加多个加载器（loader).  每一个加载器用对象的方式组织
        rules:[
            {
                // react jsx加载
                test:/(\.jsx|\.js)$/,
                exclude:/node_modules/,
                include:[
                    path.resolve(__dirname,'src')
                ],
                loader:'babel-loader',
                options:{
                    presets:['@babel/preset-react'],
                    //新特性 加载器
                    plugins:['@babel/plugin-proposal-class-properties','@babel/plugin-syntax-dynamic-import']

                }
            },
            {
                //图片加载
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{}
                    }
                ]
            },
            {
                // css加载
                test:/\.css$/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    }
                ]
                   
                
            }
        ]
    }
}
