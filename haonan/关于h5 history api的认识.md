# History API
HTML5 History API包括2个方法：history.pushState()和history.replaceState()，和1个事件：window.onpopstate

### pushState
history.pushState(stateObject, title, url)，包括三个参数
+ stateObject用于存储该url对应的状态对象，该对象可在onpopstate事件中获取，也可在history对象中获取
+ title是标题，目前浏览器并未实现
+ url是设定的url。一般设置为相对路径，如果设置为绝对路径时需要保证同源

pushState函数向浏览器的历史堆栈压入一个url为设定值的记录，并改变历史堆栈的当前指针至栈顶

### replaceState
该接口与pushState参数相同，含义也相同。唯一的区别在于replaceState是替换浏览器历史堆栈的当前历史记录为设定的url。需要注意的是，replaceState不会改动浏览器历史堆栈的当前指针

### onpopstate
该事件是window的属性。该事件会在调用浏览器的前进、后退以及执行history.forward、history.back、和history.go触发，因为这些操作有一个共性，即修改了历史堆栈的当前指针。在不改变document的前提下，一旦当前指针改变则会触发onpopstate事件

### 盗了张图显示下pushState与replaceState对于浏览器history对象的操作
![](http://op4gevqna.bkt.clouddn.com/blog_20180722.png)

### 总结：
+ 浏览器针对每个页面维护一个History栈。执行pushState函数可压入设定的url至栈顶，同时修改当前指针
+ 当执行back操作时，history栈大小并不会改变（history.length不变），仅仅移动当前指针的位置
+ 若当前指针在history栈的中间位置（非栈顶），此时执行pushState会改变history栈的大小
+ 总结pushState的规律，可发现当前指针在history栈顶部时执行pushState，会增加history栈大小；若current指针不在栈顶则会在当前指针所在位置添加项
+ 执行back操作并不修改history栈大小，因此可以通过back和forward在当前大小的history栈中自由移动