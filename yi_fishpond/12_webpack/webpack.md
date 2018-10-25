# webpack

>  本质上，webpack是一个现代JavaScript应用程序的静态模块打包器。在webpack处理应用程序时，它会在内部创建一个依赖图，用于映射到项目需要的每个模块，然后将所有这些依赖生成一个或多个bundle。

## 核心概念

+ 入口（entry）

webpack应该使用哪个模块，来作为构建其内部依赖图的开始，webpack会找出有哪些模块和library是入口起点（直接或间接）依赖的。

```js
module.exports = {
    entry : './path/to/my/entry/file.js'
}
```

+ 输出（output）

webpack在哪里输出它所创建的bundle,以及如何命名这些文件，主输出默认文件为`./dist/main.js`,其他生成文件的默认目录是`./dist`。

```js
const path = require('path');

module.exports = {
    entry : './path/to/my/entry/file.js',
    output : {
        path : path.resolve(_dirname,'dist'),
        //path.resolve()方法可以将多个路径解析为一个规范化的绝对路径。
        filename : 'my-first-webpack.dundle.js'
    }
}

//例
const path = require('path'); 
let myPath = path.join(__dirname,'/img/so'); 
let myPath2 = path.join(__dirname,'./img/so'); 
let myPath3 = path.resolve(__dirname,'/img/so'); 
let myPath4 = path.resolve(__dirname,'./img/so'); 
console.log(__dirname); //D:\myProgram\test 
console.log(myPath); //D:\myProgram\test\img\so 
console.log(myPath2); //D:\myProgram\test\img\so 
console.log(myPath3); //D:\img\so<br> 
console.log(myPath4); //D:\myProgram\test\img\so
```

+ loader

webpack自身只支持javaScript。而loader能够让webpack处理那些非JavaScript文件，并且先将它们转化为有效的模块,然后再添加到依赖图中去，这样就可以提供给应用程序使用。

    - 特性1,test属性，用于标识出应该对应的loader进行转化的某个或某些文件。
    - 特性2,表示进行时，应该使用哪个loader。 

+ 插件（plugins）

打包优化、资源管理和注入环境变量

