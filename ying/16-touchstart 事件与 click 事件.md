
# 一 · 业务场景的描述
> 1.在对已完成的PC站点进行移动端适配时，我们想要站点在移动设备上有更快的响应速度，
以带给用户更好的体验，此时，我们应该使用移动设备专用的事件系统，例如，使用 touchstart 事件代替 click 事件。

> 2.在移动端如果双击被重定义了，我们也可以采用 touchstart 避免 click事件执行过慢，或被双击事件补获。

>原因

>移动设备上的浏览器将会在 click 事件触发时延迟 300ms ，以确保这是一个“单击”事件而非“双击”事件。
而对于 touchstart 事件而言，则会在用户手指触碰屏幕的一瞬间触发所绑定的事件。

>冲突

>由于pc浏览器上面是没有touchstart等事件的。而移动端浏览器是有click 和 touchstart 两个事件的。
所以如果一个页面要同时APP和pc浏览器都要使用的话。同时注册click 和 touchstart在移动端上是有问题的。会间隔300ms先后触发两次。

# 二解决方案

> 1.使用 preventDefault

>在 touchstart 事件回调函数中使用该方法，可以阻止后续 click 事件的发生。

>这从道理上是讲不通的，毕竟，我们添加的 click 事件并不是元素的“默认事件”，但它确实奏效了，或者说，被浏览器实现了.

```javascript
const Button = document.getElementById("targetButton")

Button.addEventListener("touchstart", e => {
    e.preventDefault()
    console.log("touchstart event!")
})

Button.addEventListener("click", e => {
    e.preventDefault()
    console.log("click event!")
})
```

>2.基于功能检测绑定事件

>根据当前环境判定元素应该绑定的事件类型
>通过增加一次判断，为元素减少了一个不必要的事件绑定，从而避免了 touchstart 与 click 事件的冲突问题

```javascript
const Button = document.getElementById("targetButton")

const clickEvent = (function() {
    if ('ontouchstart' in document.documentElement === true)
        return 'touchstart';
    else
        return 'click';
})();

Button.addEventListener(clickEvent, e => {
    console.log("things happened!")
}
    
    ```

>3.节流阀

>事件函数的执行都记下当前时间， 只有当前时间与上次执行时间有一定间隔的时候才会去执行真正的逻辑

    ```javascript
function throttleMe(cb){
    console.log('click');
    var start = +new Date();
    return function(){
        var now = new Date();
        if(now - start > 1000){
            start  = now;
            cb();
        }
    }
}
document.getElementById('targetButton').addEventListener('click', throttleMe(function(){
    console.log('timer');
}));
    ```