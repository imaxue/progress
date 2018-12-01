# 前言
在node编程中，对于错误处理是一个十分常见的问题，常用的处理方法就是**try catch**

# 问题
但是，使用**try catch**的方法有一个弊端，那就是异步错误是没办法捕获到的
```js
try {
    process.nextTick(function my_app() {
        throw new Error('Catch me');
    })
} catch(e) {
    // never called
}
```

# 解决方法
那么，如何才能正确的catch到异步中的错误呢？node其实为我们提供了一个进程事件[uncaughtexception](http://nodejs.cn/api/process.html#process_event_uncaughtexception)
```js
process.on('uncaughtException', (err) => {
    console.log(err.message, 'caught_by_uncaughtException');
    throw err;
});

```
这个事件的作用是当触发了未被捕获的error时，会被接收到。如果不加上这个事件，正常情况下node进程会直接被干掉，导致线上挂调或者重启

# 但是
千万不要认为监听uncaughtException就可以完美的解决进程崩溃的问题，因为uncaughtException也有自己的缺点，那就是没办法获取当前的context环境
```js
var express = require('express');

function external(cb) {
    process.nextTick(function () {
        throw new Error();
        cb.call(null, 'sunny');
    })
}

var app = express();
app.get('/weather', function (req, res) {
    external(function (data) {
        res.end('Weather of Beijing is ' + data);
    })
})
app.listen(8018);

function noop(){}
process.on('uncaughtException', noop)
```
当前端调用weather接口获取天气数据后，我们马上抛出了错误也并没有进行任何的catch，这样会导致uncaughtException监听到错误并执行了空函数noop。虽然我们避免了程序错误会造成的进程中断问题，但如果前端一直在频繁的请求该接口的数据则会造成``I/0``一直处于等待状态，服务器内存上涨，也会造成服务器的崩溃！

# 最佳实践
做过node开发的同学在看到前面讲的之后一定会说到node自身还有一个**domain**模块用来catch异步的错误，但是，domain模块有自身的一些缺点，感兴趣的请移步[Node.js 异步异常的处理与domain模块解析](https://cnodejs.org/topic/516b64596d38277306407936)，最佳的方法是将domain与uncaughtException结合起来，一般uncaughtException用来做最后的兜底。这样才能更好的处理全部有可能遇见的错误！