在 webpack 支持的前端代码模块化中，我们可以使用类似 import * as m from './index.js' 来引用代码模块 index.js。

引用第三方类库则是像这样：import React from 'react'。webpack 构建的时候，会解析依赖后，然后再去加载依赖的模块文件，那么 webpack 如何将上述编写的 ./index.js 或 react 解析成对应的模块文件路径呢？

webpack 中有一个很关键的模块 enhanced-resolve 就是处理依赖模块路径的解析的，这个模块可以说是 Node.js 那一套模块路径解析的增强版本，有很多可以自定义的解析配置。

## 模块解析规则

简单整理一下基本的模块解析规则，以便更好地理解后续 webpack 的一些配置会产生的影响。

- 解析相对路径   
1. 查找相对当前模块的路径下是否有对应文件或文件夹
2. 是文件则直接加载
3. 是文件夹则继续查找文件夹下的 package.json 文件
4. 有 package.json 文件则按照文件中 main 字段的文件名来查找文件
5. 无 package.json 或者无 main 字段则查找 index.js 文件
- 解析模块名   
查找当前文件目录下，父级目录及以上目录下的 node_modules 文件夹，看是否有对应名称的模块
- 解析绝对路径(不建议使用)   
直接查找对应路径的文件
