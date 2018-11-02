# npm script

> 带着一个问题npm script有什么优势来学习关于npm scirpt相关知识。

## 用 npm init快速创建项目

package.json文件生成的两种方式

- 手动创建package.json文件

- 在终端执行text命令自定义
    + npm init
    + npm init -f (快速生成)


```js
    package name: (hello-npm-script)//包名称
    version: (0.1.0)//版本号
    description: hello npm script//描述
    entry point: (index.js)//入口文件
    test command://测试指令
    git repository://仓库地址
    keywords: npm, script//关键字
    license: (MIT)//许可协议
```

最终生成如下配置文件

```js
{
  "name": "fish",
  "version": "0.0.1",
  "description": "hello npm script",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "npm",
    "script"
  ],
  "author": "https://github.com/pettyfish",
  "license": "MIT"
}
```

也可单独修改默认配置：

```js
    npm config set init.author.email "zy9230311@163.com";
    npm config set init.author.name "fish";
    npm config set init.author.url "https://github.com/pettyfish";
    npm config set init.license "MIT";
    npm config set init.version "0.0.2";
```

## 用 npm run执行任意命令

在创建的package.json文件中包含了scripts字段：

```js
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    }
```

在终端运行`npm run test`或简写形式的`npm test`得到的结果都是相同的。



## 职责

优化用户体验

## 解决问题(css)

+ 官方文档(mdn,w3c)

    book => css世界

+ 

