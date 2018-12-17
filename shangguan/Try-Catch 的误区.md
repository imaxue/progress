
##### Try-Catch 的误区
try-catch 只能捕获到同步的运行时错误，对语法和异步错误却无能为力，捕获不到。

1.同步运行时错误：

```
try {
  let name = 'jartto';
  console.log(nam);
} catch(e) {
  console.log('捕获到异常：',e);
}
```
输出：

```
捕获到异常： ReferenceError: nam is not defined
    at <anonymous>:3:15
```

2.不能捕获到语法错误，我们修改一下代码，删掉一个单引号：

```
try {
  let name = 'jartto;
  console.log(nam);
} catch(e) {
  console.log('捕获到异常：',e);
}
```
输出：
```
Uncaught SyntaxError: Invalid or unexpected token
```
3.异步错误

```
try {
  setTimeout(() => {
    undefined.map(v => v);
  }, 1000)
} catch(e) {
  console.log('捕获到异常：',e);
}
```
输出：
```
Uncaught TypeError: Cannot read property 'map' of undefined
    at setTimeout (<anonymous>:3:11)
```
**====并没有捕获到异常====，这是需要我们特别注意的地方。**
