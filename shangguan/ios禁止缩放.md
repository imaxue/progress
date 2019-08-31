在iOS 10以前，iOS和Android都可以通过一行meta标签来禁止页面缩放

```
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
```
但iOS 10开始，meta设置在Safari内无效了。
1. 有一种解决办法如下：

```
window.onload=function () {
    document.addEventListener('touchstart',function (event) {
        if(event.touches.length>1){
            event.preventDefault();
        }
    })
    var lastTouchEnd=0;
    document.addEventListener('touchend',function (event) {
        var now=(new Date()).getTime();
        if(now-lastTouchEnd<=300){
            event.preventDefault();
        }
        lastTouchEnd=now;
    },false)
}
```
但是经过测试，这种方法只能禁止双击缩放。

原来在iOS里有一组双指手势操作的事件：gesturestart、gesturechange、gestureend

在上面的js方法里加入下面的事件监听：
```
document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
});
```
这样既不能双击缩放，也不能双指缩放。
