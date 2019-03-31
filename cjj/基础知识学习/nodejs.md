# Node学习

基本上是学到啥写啥，没啥条理。哈哈
## assert 断言

## nodejs中使用es6模块
- 第一步。安装babel-node
```shell
> npm i babel-cli babel-preset-env transform-object-rest-spread --save-dev
```
- 第二步。创建.babelrc文件
```json
{
  "presets": [
    [
      "env",
      {
        "target": {
          "node": "current"
        }
      }
    ]
  ],
  "plugins": [
    "transform-object-rest-spread"
  ]
}
```
- 第三步。运行
```shell
> npx babel-node app.js
```
或者
```shell
> npm ./node_modules/.bin/babel-node app.js
```
``transform-object-rest-spread``这个babel插件是支持扩展和剩余运算符的，可以不装