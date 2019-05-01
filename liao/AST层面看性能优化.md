# AST层面看性能优化


## 什么是AST

AST（Abstract syntax tree）即为“抽象语法树”，简称语法树，指代码在计算机内存的一种树状数据结构，便于计算机理解和阅读，是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构

```
var a = 1
var fun = (res) => {
	console.log(2)
  
}
```
以上代码编译成下边的json结构，

```
{
  "type": "Program",
  "start": 0,
  "end": 51,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 9,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 9,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 5,
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "start": 8,
            "end": 9,
            "value": 1,
            "raw": "1"
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "VariableDeclaration",
      "start": 10,
      "end": 51,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 14,
          "end": 51,
          "id": {
            "type": "Identifier",
            "start": 14,
            "end": 17,
            "name": "fun"
          },
          "init": {
            "type": "ArrowFunctionExpression",
            "start": 20,
            "end": 51,
            "id": null,
            "expression": false,
            "generator": false,
            "params": [
              {
                "type": "Identifier",
                "start": 21,
                "end": 24,
                "name": "res"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 29,
              "end": 51,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 32,
                  "end": 46,
                  "expression": {
                    "type": "CallExpression",
                    "start": 32,
                    "end": 46,
                    "callee": {
                      "type": "MemberExpression",
                      "start": 32,
                      "end": 43,
                      "object": {
                        "type": "Identifier",
                        "start": 32,
                        "end": 39,
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 40,
                        "end": 43,
                        "name": "log"
                      },
                      "computed": false
                    },
                    "arguments": [
                      {
                        "type": "Literal",
                        "start": 44,
                        "end": 45,
                        "value": 2,
                        "raw": "2"
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "module"
}
```

详细见https://astexplorer.net/

## 工作中我们会遇到各种AST的互相转化过程

- babel (babylon)
- JSX (acorn-jsx)
- vue to vnode(vue-loader)
- mpvue to wxml
- 各种loader
- postCSS
- eslint
- weex
等等都是通过一定的规则对代码转换成ast再转换成代码

相对于很早以前我们写代码写的html+css+js的模式，现在引入ast的各种转换事实上是增加了性能的消耗

但是为了开发效率，不得不使用这种模式，那么针对ast的各种转换性能消耗，我们需要做一些优化


- 删除无用代码
- 减少dom，合理布局
- 减少render次数
- 合理使用新api，减少babel编译
- 多用class，少用style
- 减少setState
babel会将新api转换成es5，但是同时增加了很大的代码体积

针对babel的问题，根据项目的不同，也要进行不同的配置

```
Nodejs:  8.9已经支持async await
vue-cli3： 可以编译两个版本js，面向现代浏览器
Chrome：只需要兼容chrome的项目
Rn-web：m站仍然要兼容X5
Weex: 要兼容X5和webview
Mpvue：需要兼容小程序环境和X5
Pc：需要兼容IE9、10、11
```
