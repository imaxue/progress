## Vue CLI 3 项目构建基础

1. 脚手架( vue-cli )

a.安装

```shell
    npm i -g @vue/cli
```

b. 构建

```shell
    # vue-cli 项目名称
    vue create vue-cli
```

c. 启动

```shell
    # 打开项目目录
    cd vue-cli

    # 启动项目
    npm run serve
```

d.目录结构

```javascript
├── node_modules     # 项目依赖包目录
├── public
│   ├── favicon.ico  # ico图标
│   └── index.html   # 首页模板
├── src 
│   ├── assets       # 样式图片目录
│   ├── components   # 组件目录
│   ├── views        # 页面目录
│   ├── App.vue      # 父组件
│   ├── main.js      # 入口文件
│   ├── router.js    # 路由配置文件
│   └── store.js     # vuex状态管理文件
├── .gitignore       # git忽略文件
├── .postcssrc.js    # postcss配置文件
├── babel.config.js  # babel配置文件
├── package.json     # 包管理文件
└── yarn.lock        # yarn依赖信息文件...
```