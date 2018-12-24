# ElementUI自定义主题及接需引入配置
- 安装babel-plugin-component插件
  ```shell
    npm install babel-plugin-component -D
  ```
- 安装主题工具、及chalk主题
  ```shell
    npm install element-theme element-theme-chalk -D
  ```
- 在babel.config.js中配置babel-plugin-component
  ```javascript
  module.exports = {
    'plugins': [
      [
        'component',
        {
          'libraryName': 'element-ui',
          'styleLibraryName': '~src/theme' // 自定义主题存放的路径
        }
      ]
    ]
  }
  ```
- 在根目录执行``et -i``生成默认的主题变量文件``element-variables.scss``；
  ``et -i [filename]``可以指定生成的文件名

- 创建自定义主题变量文件
```scss
  $--color-primary: #66cf90; // 自定义主题色

  // 引入上一步生成的默认主题变量文件,此处注意一点，这个引用的路径是相对于et命令执行时的路径
  @import './element-variables.scss';
```

- 在package.json中对et主题工具进行相关配置
  ```json
  "element-theme": {
    "browsers": [
      "ie > 9",
      "last 2 versions"
    ],
    "out": "./src/theme", // 为打包后的主题文件存放的目录
    "config": "./src/custom-theme-variables.scss", // 自定义主题变量文件
    "theme": "element-theme-chalk",
    "minimize": true,
    // 按需引入的组件
    "components": [
      "button",
      "select",
      ...
    ]
  ```
- 执行命令``et``，在上一步定义的``out``字段指定的目录中生成了自定义的主题文件。

- 创建``src/plugins/element.js``
```javascript
  import Vue from 'vue'
  import {
    Button,
    Select
  }
  Vue.use(Button)
  Vue.use(Select)
```
- 在``main.js``中引入
```javascript
  import './plugins/element.js'
```
