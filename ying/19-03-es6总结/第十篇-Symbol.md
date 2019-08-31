#### 概述
ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值
它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。
```
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();
s1 === s2 // false
// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');
s1 === s2 // false
```
Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。


Symbol 值不能与其他类型的值进行运算，会报错。
```
let sym = Symbol('My symbol');
`your symbol is ${sym}`
// TypeError: can't convert symbol to string
```
Symbol 值可以显式转为字符串。
```
String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
```
Symbol 值也可以转为布尔值，但是不能转为数值
```
Boolean(sym) // true
!sym  // false
```

#### Symbol.prototype.description
创建 Symbol 的时候，可以添加一个描述
const sym = Symbol('foo');
sym.description // "foo"

#### 作为属性名的 Symbol
由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
#### 实例：消除魔术字符串
魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。

#### 属性名的遍历
该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回

##### Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。

```
const obj = {};

let foo = Symbol("foo");

Object.defineProperty(obj, foo, {
  value: "foobar",
});
for (let i in obj) {
  console.log(i); // 无输出
}
Object.getOwnPropertyNames(obj)
// []
Object.getOwnPropertySymbols(obj)
// [Symbol(foo)]
```

##### Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
```
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};
Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]
```

#### Symbol.for()，Symbol.keyFor()
Symbol.for()
```
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2 // true
```
Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
```
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```
#### Symbol.hasInstance
对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass() // true

#### Symbol.isConcatSpreadable
