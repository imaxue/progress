
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


#### window.onerror 

```
/**
* @param {String}  message    错误信息
* @param {String}  source    出错文件
* @param {Number}  lineno    行号
* @param {Number}  colno    列号
* @param {Object}  error  Error对象（对象）
*/
window.onerror = function(message, source, lineno, colno, error) {
   console.log('捕获到异常：',{message, source, lineno, colno, error});
}
```
window.onerror 函数只有在返回 true 的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 Uncaught Error: xxxxx

需要注意：
1. onerror 最好写在所有 JS 脚本的前面，否则有可能捕获不到错误；
1. onerror 无法捕获语法错误；
2. onerror 捕获不到静态资源加载异常

在实际的使用过程中，onerror 主要是来捕获预料之外的错误，而 try-catch 则是用来在可预见情况下监控特定的错误，两者结合使用更加高效。

#### window.addEventListener
当一项资源（如图片或脚本）加载失败，加载资源的元素会触发一个 Event 接口的 error 事件，并执行该元素上的onerror() 处理函数。这些 error 事件不会向上冒泡到 window ，不过（至少在 Firefox 中）能被单一的window.addEventListener 捕获。

```
<scritp>
    window.addEventListener('error', (error) => {
        console.log('捕获到异常：', error);
    }, true)
</script>
<img src="./jartto.png">
```
由于网络请求异常不会事件冒泡，因此必须在捕获阶段将其捕捉到才行，但是这种方式虽然可以捕捉到网络请求的异常，但是无法判断 HTTP 的状态是 404 还是其他比如 500 等等，所以还需要配合服务端日志才进行排查分析才可以。

需要注意：
1. 不同浏览器下返回的 error 对象可能不同，需要注意兼容处理。
1. 需要注意避免 addEventListener 重复监听。

#### Promise Catch
在 promise 中使用 catch 可以非常方便的捕获到异步 error ，这个很简单。

没有写 catch 的 Promise 中抛出的错误无法被 onerror 或 try-catch 捕获到，所以我们务必要在 Promise 中不要忘记写 catch 处理抛出的异常。

解决方案： 为了防止有漏掉的 Promise 异常，建议在全局增加一个对 unhandledrejection 的监听，用来全局监听Uncaught Promise Error。使用方式：

```
window.addEventListener("unhandledrejection", function(e){
  e.preventDefault()
  console.log('捕获到异常：', e);
  return true;
});
Promise.reject('promise error');
```
如果对 Promise 不进行 catch 呢？

```
window.addEventListener("unhandledrejection", function(e){
  e.preventDefault()
  console.log('捕获到异常：', e);
  return true;
});
new Promise((resolve, reject) => {
  reject('jartto: promise error');
});
```
事实证明，也是会被正常捕获到的。

所以，正如我们上面所说，为了防止有漏掉的 Promise 异常，建议在全局增加一个对 unhandledrejection 的监听，用来全局监听 Uncaught Promise Error。

补充一点：如果去掉控制台的异常显示，需要加上：

```
event.preventDefault();
```
#### VUE errorHandler

```
Vue.config.errorHandler = (err, vm, info) => {
  console.error('通过vue errorHandler捕获的错误');
  console.error(err);
  console.error(vm);
  console.error(info);
}
```

