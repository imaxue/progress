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

- node连接mysql8.0报错：Client does not support authentication protocol的解决办法
  + 授权远程连接
  ```shell
    mysql>GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'WITH GRANT OPTION; 
    mysql>FLUSH PRIVILEGES;
  ```
  + 更改加密规则
  ```shell
    mysql>ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;
    mysql>ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
    mysql>FLUSH PRIVILEGES;
  ```