小程序中没有过滤器filter，为实现相似功能可使用小程序WXS 可实现。

> WXS（WeiXin Script）是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。
> ##### 注意
> 1. wxs 不依赖于运行时的基础库版本，可以在所有版本的小程序中运行。
> 1. wxs 与 javascript 是不同的语言，有自己的语法，并不和 javascript 一致。
> 1. wxs 的运行环境和其他 javascript 代码是隔离的，wxs 中不能调用其他 javascript 文件中定义的函数，也不能调用小程序提供的API。
> 1. wxs 函数不能作为组件的事件回调。
> 1. 由于运行环境的差异，在 iOS 设备上小程序内的 wxs 会比 javascript 代码快 2 ~ 20 倍。在 android 设备上二者运行效率无差异。
> 
##### 1. .wxs 文件
在其中直接编写 WXS 脚本，时间格式化代码示例如下：

```
   var timeFr = {
       getTime: function (time) {
           if (!time) return '';

           var date = getDate(time);
           var M = date.getMonth() + 1;
           var y = date.getFullYear();
           var d = date.getDate();
           var h = date.getHours();
           var m = date.getMinutes();
           var s = date.getSeconds();

           if (M < 10) M = "0" + M;
           if (d < 10) d = "0" + d;
           if (h < 10) h = "0" + h;
           if (m < 10) m = "0" + m;
           if (s < 10) s = "0" + s;

           return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
       }
   }

   module.exports = {
       getTime: timeFr.getTime
   }
```
##### 2.WXS代码在wxml文件中的使用

WXS 代码可以编写在 wxml 文件中的 <wxs> 标签内，或以 .wxs 为后缀名的文件内。
每个 wxs 模块均有一个内置的 module 对象。

```
<wxs module="timeFr" src="../../filter/timeFr.wxs"></wxs>
<view>提交时间：{{timeFr.getTime(item.cTime)}}</view>
```


