#### 1、Vue Loader 是什么？
- Vue Loader 是一个 webpack 的 loader，它允许你以一种名为单文件组件 (SFCs)的格式撰写 Vue 组件
- Vue Loader 还提供了很多酷炫的特性：
  - 允许为 Vue 组件的每个部分使用其它的 webpack loader，例如在 <style> 的部分使用 Sass 和在 <template> 的部分使用 Pug；
  - 为每个组件模拟出 scoped CSS；
  - 在开发过程中使用热重载来保持状态
- 简而言之，webpack 和 Vue Loader 的结合为你提供了一个现代、灵活且极其强大的前端工作流，来帮助撰写 Vue.js 应用。

#### 2、 webpack中的loader
- loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）
- loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理
- 在更高层面，在 webpack 的配置中 loader 有两个目标：
  - 1、test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
  - 2、use 属性，表示进行转换时，应该使用哪个 loader。
  - 代码示例：webpack.config.js
    ```
    const path = require('path');
    
    const config = {
      output: {
        filename: 'my-first-webpack.bundle.js'
      },
      module: {
        rules: [
          { test: /\.txt$/, use: 'raw-loader' }
        ]
      }
    };
    
    module.exports = config;
    //“嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先使用 raw-loader 转换一下。
    ```
#### 3、在项目中配置Vue Loader
- 项目中配置Vue Loader有两种方式：
  - vue-cli中默认已配置；
  - 手动在webpack中配置Vue Loader
- 手动在webpack中配置Vue Loader
    ```
    // webpack.config.js
    const VueLoaderPlugin = require('vue-loader/lib/plugin')
    
    module.exports = {
      module: {
        rules: [
          // ... 其它规则
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
        ]
      },
      plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin()
      ]
    }
    ```
#### 4、Vue Loader处理资源路径
- 当 Vue Loader 编译单文件组件中的 <template> 块时，它也会将所有遇到的资源 URL 转换为 webpack 模块请求。
- 例如，下面的模板代码片段：
```
<img src="../image.png">
//将会被编译成为：
createElement('img', {
  attrs: {
    src: require('../image.png') // 现在这是一个模块的请求了
  }
})
```
- 此外，如果你配置了为 <style> 块使用 css-loader，则你的 CSS 中的资源 URL 也会被同等处理;
- **配置相关的 Loader**
  - 因为像 .png 这样的文件不是一个 JavaScript 模块，你需要配置 webpack 使用 file-loader 或者 url-loader 去合理地处理它们。
  - 通过 Vue CLI 创建的项目默认已经把这些预配置好了
- **转换资源 URL 的好处**
  - 1、file-loader 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。此外，这意味着 你可以就近管理图片文件，可以使用相对路径而不用担心部署时 URL 的问题。使用正确的配置，webpack 将会在打包输出中自动重写文件路径为正确的 URL。
  - url-loader 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。

#### 5、使用预处理器
- 在 webpack 中，所有的预处理器需要匹配对应的 loader
- Vue Loader 允许你使用其它 webpack loader 处理 Vue 组件的某一部分。它会根据 lang 特性以及你 webpack 配置中的规则自动推断出要使用的 loader
- 能配置使用的预处理器列表
    - sass
    - less
    - Stylus
    - PostCSS
    - Babel
    - TypeScript
    - Pug
- less的具体配置
  - 1、安装less-loader： npm install -D less less-loader
  - 2、webpack配置
    ```
        // webpack.config.js -> module.rules
        {
          test: /\.less$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'less-loader'
          ]
        }
    ```
#### 6、Scoped CSS 样式作用域
- .vue文件中，当 <style> 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素
    ```
    <style scoped>
    .example {
      color: red;
    }
    </style>
    
    <template>
      <div class="example">hi</div>
    </template>
    //转换结果：
    <style>
    .example[data-v-f3f3eg9] {
      color: red;
    }
    </style>
    
    <template>
      <div class="example" data-v-f3f3eg9>hi</div>
    </template>
    ```
- 混用本地和全局样式
    ```
    <style>
    /* 全局样式 */
    </style>
    
    <style scoped>
    /* 本地样式 */
    </style>
    ```
- 使用 scoped 后，父组件的样式将不会渗透到子组件中
  - 不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式
- **深度作用选择器 >>>**
  - 如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符
  - 有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 操作符取而代之——这是一个 >>> 的别名，同样可以正常工作

#### 7、CSS Modules
- CSS Modules 是一个流行的，用于模块化和组合 CSS 的系统
- vue-loader 提供了与 CSS Modules 的一流集成，可以作为模拟 scoped CSS 的替代方案

#### 8、热重载
- 热重载是什么？
  - “热重载”不只是当你修改文件的时候简单重新加载页面
  - 启用热重载后，当你修改 .vue 文件时，该组件的所有实例将在不刷新页面的情况下被替换
  - 当你调整模版或者修改样式时，这极大地提高了开发体验
- 如何配置热重载
  - 当使用脚手架工具 vue-cli 时，热重载是开箱即用的，说白了就是cli默认配置好了，使用者可以傻瓜似的使用；
  - 当手动设置你的工程时，热重载会在你启动 webpack-dev-server --hot 服务时自动开启

#### 9、函数式组件
- 在一个 *.vue 文件中以单文件形式定义的函数式组件，现在对于模板编译、scoped CSS 和热重载也有了良好的支持。
- 说白了就是.vue文件就是一个函数式组件，而.vue组件支持热重载、scoped CSS、模板编译
- 模板编译是啥，待深入学些

#### 10、自定义块
- 在 .vue 文件中，你可以自定义语言块；
- 自定义的语言快需要配置对应的webpack loader
- 应用于一个自定义块的 loader 是基于这个块的 lang 特性、块的标签名以及你的 webpack 配置进行匹配的
- 自定义语言快貌似类似自定义标签，甚至是别的编程语言，待确认；

#### 11、CSS 提取
- webpack打包vue项目的时候默认会把vue里的css打包到页面上
- webpack.config.js里的plugins加上某个插件的配置，可以把css提取到公共style里，如插件mini-css-extract-plugin
- 插件mini-css-extract-plugin
  - 此插件将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。它支持CSS和SourceMaps的按需加载
  - 它建立在新的webpack v4功能（模块类型）之上，并且需要webpack 4才能工作
- 注意：请只在生产环境下使用 CSS 提取，这将便于你在开发环境下进行热重载

#### 12、代码校验 (Linting)
- 本质：配置具体webpack的loader插件，已达到在开发过程中就会自动进行代码校验；
- 代码演示：
```
//1、安装插件
npm install -D eslint eslint-loader
//2、在webpack中配置插件
// webpack.config.js
module.exports = {
  // ... 其它选项
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  }
}
//那么你的 *.vue 文件在开发过程中每次保存的时候就会自动进行代码校验
```
- 官方的 eslint-plugin-vue 同时支持在 Vue 单文件组件的模板和脚本部分的代码校验;
- stylelint 支持在 Vue 单文件组件的样式部分的代码校验

#### 相关链接
- https://vue-loader.vuejs.org/zh/#vue-loader-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F