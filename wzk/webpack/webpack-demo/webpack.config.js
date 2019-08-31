const path = require("path");

module.exports = {
    //__dirname是nodejs里的一个全局变量，它指向的是我们项目的根目录
    //入口文件的位置
    entry: './main.js',
    output: {
        //打包后的文件名称
        filename: 'bundle.js',
        //打包后的文件存放位置
        path: path.resolve(__dirname, './dist'), 
        //`path.resolve()` 方法会把一个路径或路径片段的序列解析为一个绝对路径。
    }
}
