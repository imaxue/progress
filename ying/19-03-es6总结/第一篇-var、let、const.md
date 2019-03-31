### var、let、const

##### 1.var 存在变量提升,let 和 const 不存在变量提升

```
console.log(a); // undefined
===>  a已声明还没赋值，默认得到undefined值
var a = 100;
```

##### 2.var 声明的变量会挂载在 window 上，而 let 和 const 声明的变量不会

var a = 100;
console.log(a,window.a);
let b = 10;
console.log(b,window.b); // 10 undefined

##### 3.同一作用域下 let 和 const 不能声明同名变量，而 var 可以

var a = 100;
console.log(a); // 100
var a = 10;
console.log(a); // 10

##### 4.let,const 暂存死区

只要块级作用域内存在 let 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```
var tmp = 123;
if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

##### 5.let 与 const 只在块级作用域中有效

ES6 允许块级作用域的任意嵌套。
外层作用域无法读取内层作用域的变量

```
{{{{
{let insane = 'Hello World'} console.log(insane); // 报错}}}};
```

##### 6.const 声明一个只读的常量。

1.const 保存的是：变量指向的那个内存地址所保存的数据不得改动。 2.对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。 3.对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。

##### 块级作用域与函数声明

ES5 1.函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。 2.但是浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。

```
if (true) {
  function f() {}
}
```

ES6 1.允许在块级作用域内声明函数。 2.函数声明类似于 var，即会提升到全局作用域或函数作用域的头部。 3.同时，函数声明还会提升到所在的块级作用域的头部。

```
//题目
function f() { console.log('I am outside!'); }
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();
}());

// ES5 环境
function f() { console.log('I am outside!'); }

(function () {
  function f() { console.log('I am inside!'); }
  if (false) {
  }
  f();
}());
// ES6 环境
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }

  f();
}());
```
