## 多页启动优化小工具

webpack改造

```js

/**
 * 作者：大春春
 * 链接：https://www.jianshu.com/p/0a30aca71b16
 * 來源：简书
 * 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/

// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
var glob = require('glob')
    // 页面模板
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的page文件夹
var PAGE_PATH = path.resolve(__dirname, '../src/page')

// 用于做相应的merge处理
var merge = require('webpack-merge')


//多入口配置
// 通过glob模块读取page文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function() {
    var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
    var map = {}
    entryFiles.forEach((filePath) => {
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
    })
    return map
}

//多页面输出配置
// 与上面的多页面入口配置相同，读取page文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function() {
    let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')

    // npm run -- --entry=mpms
    // console.log(PAGE_PATH, process.env.npm_config_entry, 123)
    // let entryHtml = ''
    // let { npm_config_entry } = process.env
    // if (npm_config_entry) {
    //   entryHtml = glob.sync(PAGE_PATH + `/${npm_config_entry}/${npm_config_entry}.html`)
    // } else {
    //   entryHtml = glob.sync(PAGE_PATH + `/*/*.html`)
    // }

    let arr = []
    entryHtml.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let conf = {
            // 模板来源
            template: filePath,
            // 文件名称
            filename: filename + '.html',
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: ['manifest', 'vendor', filename],
            inject: true
        }
        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            })
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}

```


```js
let entry = {};
if (process.env.NODE_ENV === 'production') {
  entry = utils.entries();
} else {
  // 加一层判断，如果未输入单一entry则加载全部
  if(process.env.entry != undefined){
    const entryFile = process.env.entry && resolve(`/src/page/${process.env.entry}/${process.env.entry}.js`);
    entry[process.env.entry] = entryFile;
  }else{
    entry = utils.entries();
  }
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  
  // 单页时候的入口
  /* entry: {
    app: './src/main.js' 
  }, */
  // entry: utils.entries(),  // 会加载所有
  entry: entry,


```



```js
const utils = require('./config/utils')
const shell = require('shelljs')
const inquirer = require('inquirer')
const entry = utils.entries();
// console.log(Object.keys(entry))
const choices = ['全部', ...Object.keys(entry)]

inquirer.prompt([{
    type: 'list',
    message: '选择启动整个项目还是单个项目',
    name: 'object',
    choices: choices
}]).then(function (answers) {
    console.log(`您选择的是项目${answers.object}`)
    if(answers.object == '全部'){
        shell.exec(`npm run dev`)
    }else{
        shell.exec(`entry=${answers.object} npm run dev`)
    }
    
})

```
