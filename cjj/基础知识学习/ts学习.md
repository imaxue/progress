# typescript 学习
## 安装及编译
首先通过npm全局安装ts
```shell
  npm install -g typescript
```
然后创建.ts文件。通过命令行方式执行编译
```shell
tsc hello.ts
```
## 原始数据类型的声明
JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。
原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol。
- boolean
```javascript
  const flag: boolean = true
```
- number
```javascript
  const n: number = 1
```


## tips
1. 如何声明一个window对象上的新属性<自定义属性>
```typescript
declare global {
  interface Window {
    newProperty: any;
  }
}
```