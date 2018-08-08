const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");



module.exports = {
    //webpack 4 引入了模式（mode），它有 development、production、none 三个值，我们不指定值时，默认使用 production。
    mode :'development',
    /*
      webpack 执行模式
      development：开发环境，它会在配置文件中插入调试相关的选项，比如 moduleId 使用文件路径方便调试
      production：生产环境，webpack 会将代码做压缩等优化
      */
    optimization: {
        /*
        上面提到 chunkFilename 指定了 chunk 打包输出的名字，那么文件名存在哪里了呢？
        它就存在引用它的文件中。这意味着一个 chunk 文件名发生改变，会导致引用这个 chunk 文件也发生改变。
        runtimeChunk 设置为 true, webpack 就会把 chunk 文件名全部存到一个单独的 chunk 中，
        这样更新一个文件只会影响到它所在的 chunk 和 runtimeChunk，避免了引用这个 chunk 的文件也发生改变。
        */
        runtimeChunk: true,
        splitChunks: {
            /*
            默认 entry 的 chunk 不会被拆分
            因为我们使用了 html-webpack-plugin 来动态插入 <script> 标签，entry 被拆成多个 chunk 也能自动被插入到 html 中，
            所以我们可以配置成 all, 把 entry chunk 也拆分了
            */
           chunks:"all",
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "xixixi",
                    chunks: "all",
                    minChunks:2
                }
            }
        }
    },
    plugins: [
        //打包清理 dist 文件夹
        new CleanWebpackPlugin(['dist']),
        //自动生成index.html文件在dist目录下
        new HtmlWebpackPlugin({
            title: 'webpack--hui',
            template: './index.html',
            /* 因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none https://github.com/jantimon/html-webpack-plugin/issues/870 */
            chunksSortMode: 'none'
        }),
        
    ],
    output: {
        path: path.join(process.cwd(), 'dist'),
        libraryTarget: 'umd',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    // 加载器
    module: {
        // rules 是一个数组，里边可以添加多个加载器（loader).  每一个加载器用对象的方式组织
        rules: [{
                // react jsx加载
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                    //新特性 加载器
                    plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import'],
                }
            },
            {
                //图片加载
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            },
            {
                // css加载
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]


            }
        ]
    },

}