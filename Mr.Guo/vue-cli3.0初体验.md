## vue-3.0初体验

安装vue-cli3.0前请检查一下node版本，需要v8.x

### 安装cli

```shell
  npm install -g @vue/cli
```

安装完成之后，检查一下是否安装成功,执行```vue -V```命令，注意是大写的V

### 创建项目目录

```
  vue create project-name
```

这时候你会看到

```
  Vue CLI v3.0.0-beta.6
? Please pick a preset: (Use arrow keys)
> default (babel, eslint)
  Manually select features
```

按键盘上下键选择默认（default）还是手动（Manually），如果选择default，一路回车执行下去就行了（注：现在vue-cli3.0默认使用yarn下载），这里我选择手动

接卸来，选择配置，这时你会看见一些选项,你要集成什么就选就行了，我这里选个我比较常用的（注：空格键是选中与取消，A键是全选）

```
  ? Please pick a preset: Manually select features
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) TypeScript
 ( ) Progressive Web App (PWA) Support
 (*) Router
 (*) Vuex
 (*) CSS Pre-processors
 (*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing
```

这里我就不选择Unit Testing了，这个检测有时候会和eslint冲突，会很麻烦

选择好配置后，选择路由模式

```
? Please pick a preset: Manually select features
? Check the features needed for your project: Router, Vuex, CSS Pre-processors, Linter, Unit
? Use history mode for router?(Requires proper server settup for index fallback in production) Y/n
```

我们这里选择hash模式，下面就是选择CSS预处理器

```
  Pick a CSS pre-processor(PostCSS, Autoprefixer and CSS Modules are supported by default):
  > SCSS/SASS
    LESS
    Stylus
 ```
  
  这里我们选择Stylus，然后选择eslint规则
  
```
  ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
  ? Pick a linter / formatter config: (Use arrow keys)
  > ESLint with error prevention only
    ESLint + Airbnb config
    ESLint + Standard config
    ESLint + Prettier
```
  我也不懂这些规则之间有什么具体的差异，随便选一个吧，ESLint + Prettier，接卸来选择语法检查方式，这里我选择保存就检测
  
 ```
 > ( ) Lint on save // 保存就检测
   ( ) Lint and fix on commit // fix和commit时候检查
```

  然后它会问你 ，把babel,postcss,eslint这些配置文件放哪，这里随便选，我选择放在独立文件夹
  
```
  ? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)
> In dedicated config files // 独立文件放置
  In package.json // 放package.json里
```

  最后一步，键入N不记录，如果键入Y需要输入保存名字

```
  ? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
  ? Save this as a preset for future projects? (Y/n) // 是否记录一下以便下次继续使用这套配置
```
  
  然后就完成了，等待下载各种依赖。
 
 ```
  .
├── README.md
├── babel.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.vue
    ├── assets
    │   └── logo.png
    ├── components
    │   └── HelloWorld.vue
    ├── main.js
    ├── router.js
    ├── store.js
    └── views
        ├── About.vue
        └── Home.vue
```

目录结构长这个样子，各种配置文件都不见了。修改配置，在根目录下创建vue.config.js，比如：

```
devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 1234,
        https: false,
        hotOnly: false,
        // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        proxy: null, // string | Object
        before: app => {}
    },
```
