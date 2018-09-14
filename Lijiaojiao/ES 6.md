##  常见小问题
> 1. ES6 的 class 里面不用function，否则会报错
 2. import 进来的函数，调用不用加this，自定义的需要this
 3. 箭头函数 
  . 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
  ```
  var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
  ```
  
  . 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
  ```
  var sum = (num1, num2) => { return num1 + num2; }
  ```
  
  . 如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
  
 ```
 let getTempItem = id => ({ id: id, name: "Temp" });
 ```
  .箭头函数this的定义：箭头函数中的this是在定义函数的时候绑定，而不是在执行函数的时候绑定。

