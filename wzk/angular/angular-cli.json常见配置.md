#### angular-cli.json常见配置
```
{
  "project": {
    "name": "ng-admin", //项目名称
    "ejected": false // 标记该应用是否已经执行过eject命令把webpack配置释放出来
  },
  "apps": [
    {
      "root": "src", // 源码根目录
      "outDir": "dist", // 编译后的输出目录，默认是dist/
      "assets": [ // 记录资源文件夹，构建时复制到`outDir`指定的目录
        "assets",
        "favicon.ico"
      ],
      "index": "index.html", // 指定首页文件，默认值是"index.html"
      "main": "main.ts", // 指定应用的入门文件
      "polyfills": "polyfills.ts", // 指定polyfill文件
      "test": "test.ts", // 指定测试入门文件
      "tsconfig": "tsconfig.app.json", // 指定tsconfig文件
      "testTsconfig": "tsconfig.spec.json", // 指定TypeScript单测脚本的tsconfig文件
      "tsconfig":"tsconfig.app.json",

      "prefix": "app", // 使用`ng generate`命令时，自动为selector元数据的值添加的前缀名
      "deployUrl": "//cdn.com.cn", // 指定站点的部署地址，该值最终会赋给webpack的output.publicPath，常用于CDN部署
      "styles": [ // 引入全局样式，构建时会打包进来，常用于第三方库引入的样式
        "styles.css"
      ],
      "scripts": [ // 引入全局脚本，构建时会打包进来，常用语第三方库引入的脚本
      ],
      "environmentSource": "environments/environment.ts", // 基础环境配置
      "environments": { // 子环境配置文件
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts"
      }
    }
  ],
  "e2e": {
    "protractor": {
      "config": "./protractor.conf.js"
    }
  },
  "lint": [
    {
      "project": "src/tsconfig.app.json"
    },
    {
      "project": "src/tsconfig.spec.json"
    },
    {
      "project": "e2e/tsconfig.e2e.json"
    }
  ],
  "test": {
    "karma": {
      "config": "./karma.conf.js"
    }
  },
  "defaults": { // 执行`ng generate`命令时的一些默认值
    "styleExt": "scss", // 默认生成的样式文件后缀名
    "component": {
      "flat": false, // 生成组件时是否新建文件夹包装组件文件，默认为false（即新建文件夹）
      "spec": true, // 是否生成spec文件，默认为true
      "inlineStyle": false, // 新建时是否使用内联样式，默认为false
      "inlineTemplate": false, // 新建时是否使用内联模板，默认为false
      "viewEncapsulation": "Emulated", // 指定生成的组件的元数据viewEncapsulation的默认值
      "changeDetection": "OnPush", // 指定生成的组件的元数据changeDetection的默认值
    }
  }
}
```
#### 全局样式的设置示例
- 通过设置angular-cli.json文件中的style属性
    ```
      省略......
      "tsconfig": "tsconfig.app.json",
      "testTsconfig": "tsconfig.spec.json",
      "prefix": "app",
      "styles": [
        "../node_modules/normalize.css/normalize.css",
        "../node_modules/bootstrap/scss/bootstrap.scss",
        "app/theme/theme.scss",
        "styles.scss"
      ],
      省略......
    ```
