## 原始数据类型

```ts
let myName: string = 'Tom';
let myAge: number = 25;
let isDone: boolean = false;
let unusable: void = undefined;
let u: undefined = undefined;
let n: null = null;
let myFavoriteNumber: any = 'seven';
```

```ts
function sayHello(person:string): any {
  console.log('===');
  return {
    age: '12312',
    name: 'asds a'
  };
}
```

- 如果定义的时候没有赋值，都会被推断成 any 类型而完全不被类型检查.

## 联合类型

```ts
let myFavoriteNumber: string | number;
// myFavoriteNumber 既可以是 string 也可以是 number
```

访问联合类型的属性或方法

```ts
// 报错
function getLength(something: string | number): number {
    return something.length;
}
// 正确

function getString(something: string | number): string {
    return something.toString();
}

```


## 对象的类型

在 TypeScript 中，我们使用接口（`Interfaces`）来定义对象的类型。

### 什么是接口

在面向对象语言中, 接口(interfaces)是对象行为的抽象, 而具体如何行动需要由类(classes) 去实现(implements)

在 TS 中接口是一个非常灵活的概念, 除了可用于对类的一部分行为进行抽象, 也常用于对 `对象的形状(Shape)` 进行描述

```ts
interface Person {
  // 只读属性初始化时必须赋值, 赋值后不可更改
  readonly id: number,
  name: string,
  age?: number,
  gender?: string,
  [propName: string]: any

}

let tom: Person = {
  name: 'Tom',
  age: 12,
  gender: 'man',
  hobby: '奥术大师多',
  lll: '123撒大声地'
}
```

一旦定义了任意属性，那么确定属性和 **可选属性** 的类型都必须是它的类型的子集

```ts
interface Person {
  age?: number,
  [propName: string]: string

}
// age 可选属性的类型是 number 与任意属性的类型产生了冲突就是报错
let tom: Person = {
  age: 12,
  hobby: '奥术大师多',
  lll: '123撒大声地'
}
```

## 数组的类型

```ts
// 报错, 参数必须都是 number
let fibonacci: number [] = [1, 1, 2, 3, 5, '啊'];
// 通过, 参数可以是 number 或则是 string
let fibonacci: (number | string) [] = [1, 1, 2, 3, 5, '啊'];
// 报错, 不可以通过各种方式加入其它类型数据
fibonacci.push([213,12,3])

```

### 数组泛型

```ts
// 通过
let fibonacci : Array<number|string> = [123,123,12,3, '1231'];
```

### 用接口表示数组

```ts
// 只要 index 的类型是 number, 那么值得类型必须是 number
interface MyArray {
  [index: number]: number
}

let aaa : MyArray = [123,12,412]
```

### any 在数组中的应用

```ts
let list: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];

```

## 函数的类型

### 函数声明

```ts
// 这只定义了俩个函数, 多传参数或者少传参数都会报错
function sum(x: number, y: number): number {
    return x + y;
}
```

### 函数表达式

```ts
let mySum = function (x: number, y: number): number {
    return x + y;
};
```

### 用接口定义函数的形状

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}
```

### 可选参数

```ts
// 可选参数必选在必须参数后面, 否则会报错
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
      return firstName + ' ' + lastName;
  } else {
      return firstName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

### 参数默认值

```ts
function buildName(firstName: string = 'Tom', lastName: string) {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat');
```

### 剩余参数

```ts
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
```

### 函数重载

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

## 类型断言

比如我们访问一个不确定类型的属性或方法时, 比如:

```ts
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
```

## 声明文件

当使用第三方库时, 需引用其声明文件, 才能获得对应的代码补全和接口提示等功能

比如在 `ts` 中使用 `jQuery`, 需要使用 `declare var` 来定义其类型:

```ts
// 定义 jQuery, 参数是字符串, 返回值是任意类型
declare var jQuery: (selector: string) => any;
/**
 * declare var 并没有真的定义一个变量,
 * 只是定义了全局变量 `jQuery` 的类型,
 * 仅仅回用于编译时的检查.
 */
```

### 什么是声明文件

- 声明的文件必需以 `.d.ts` 为后缀。
- 一般来说, ts 会解析项目中所有的 *.ts 文件, 当将 jQuery.d.ts 放到项目中时, 其它所有的 *.ts 文件就都可以获得 jQuery 的类型定义.
- 通常会把生命语句放到一个单独的文件(jQuery.d.ts)中, 这就是声明文件:

```ts
// src/jQuery.d.ts
declare var jQuery: (selector: string) => any;
```

```md
/path/to/project
├── README.md
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
```

假如仍然无法解析，那么可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件。

这只是**全局变量**模式的声明文件形式.

### 第三方声明文件

推荐的是使用 `@types` 统一管理第三方库的声明文件.
`@types` 的使用方式很简单, 直接用 `npm` 安装对应的声明模块即可, 类似:

```md
npm install @types/jquery --save-dev
```

### 书写声明文件

当一个第三方库没有提供声明文件时, 我们就需要自己书写声明文件了.
在不同的场景下, 声明文件的内容和使用方式会所区别.

库的使用场景主要有以下几种:

- 全局变量：通过 `<script>` 标签引入第三方库，注入全局变量
- npm 包：通过 **import foo from 'foo'** 导入，符合 `ES6` 模块规范
- UMD 库：既可以通过 `<script>` 标签引入，又可以通过 `import` 导入
- 模块插件：通过 `import` 导入后，可以改变另一个模块的结构
- 直接扩展全局变量：通过 `<script>` 标签引入后，改变一个全局变量的结构。比如为 `String.prototype` 新增了一个方法
- 通过导入扩展全局变量：通过 import 导入后，可以改变一个全局变量的结构

### 全局变量

使用全局变量的声明文件时, 如果是以 `npm install @types/xxx --save-dev` 安装的, 则不需要任何配置.

全局变量的声明文件主要有一下几种语法

- `declare var` 声明全局变量
- `declare function` 声明全局方法
- `declare class` 声明全局类
- `declare enum` 声明全局枚举类型
- `declare namespace` 声明全局对象(含有子属性)
- `interface` 和 `type` 声明全局类型

[深度阅读](https://ts.xcatliu.com/basics/declaration-files.html)

```ts
export {
    name,
    getName,
    Animal,
    Directions,
    Options
}

export namespace foo {
    const name: string;
    namespace bar {
        function baz(): string;
    }
}

export default function foo(): string;

// 整体导出
module.exports = foo;
// 单个导出
exports.bar = bar;

// 整体导入
const foo = require('foo');
// 单个导入
const bar = require('foo').bar;

// 整体导入
import * as foo from 'foo';
// 单个导入
import { bar } from 'foo';

// 整体导入
import foo = require('foo');
// 单个导入
import bar = require('foo').bar;
```
注意，只有 `function`、`class` 和 `interface` 可以直接默认导出，其他的变量需要先定义出来，再默认导出：


## 类型别名

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

## 泛型

以输入值得类型作为输出值得类型

```ts
// 函数名后的 <T>, 其中 T 用来指任意输入的类型, 在后面的输入 value: T 和输出 Array<T> 中即可使用.
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```