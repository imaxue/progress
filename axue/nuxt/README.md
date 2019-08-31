

## 目录结构

`assets`：资源目录

`components`：VUE 组件目录，这个目录下的组件不会被添加扩展的 asyncData() 方法

`layouts`：布局目录

`middleware`：中间件目录

`pages`：页面目录，会读取此目录下的文件配置为路由

`plugins`：插件目录

`static`：静态文件目录，不需要解析的文件，放到这个目录下，并且会被映射到根路径

`store`：组织应用的 vuex 状态树

`nuxt.config.js`：保存个性化配置，用于覆盖默认的配置





## Window 或 Document 对象未定义？

> 这是因为一些只兼容客户端的脚本被打包进了服务端的执行脚本中去。 对于只适合在客户端运行的脚本，需要通过使用 `process.BROWSER_BUILD` 变量来判断导入。

```javascript
if (process.BROWSER_BUILD) {
  require('external_library')
}
```



## CSS 配置

在 `nuxt.config.js` 中添加 CSS 资源：

> Nuxt.js 让你可以配置全局 CSS 文件、模块、库（每个页面都会被引入）。

- 类型: `Array`
  - 数组元素类型：`String | Object`

如果传入的是对象的话，其属性是：

- src: `String` (文件路径)
- lang: `String` ([所需的预处理器](https://zh.nuxtjs.org/faq/pre-processors))

```javascript
module.exports = {
  css: [
    // 加载一个 node.js 模块
    'hover.css/css/hover-min.css',
    // 同样加载一个 node.js 模块，不过我们定义所需的预处理器
    { src: 'bulma', lang: 'sass' },
    // 项目中的 CSS 文件
    '~assets/css/main.css',
    // 项目中的 Sass 文件
    { src: '~assets/css/main.scss', lang: 'scss' } // 指定 scss 而非 sass
  ]
}
```

 [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) 分析并可视化构建后的打包文件，你可以基于分析结果来决定如何优化它。



## vendor

Nuxt.js 允许你在自动生成的 `vendor.bundle.js` 文件中添加一些模块，以减少应用 bundle 的体积。这里说的是一些你所依赖的第三方模块 (比如 `axios`)

想要把模块打包进 vendor bundle，你可以在 `nuxt.config.js` 的 `build.vendor` 字段中配置：

```javascript
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```



## 中间件

中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。

```javascript
export default function (context) {
  context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
}
```

中间件执行流程顺序：

1. `nuxt.config.js`
2. 匹配布局
3. 匹配页面















