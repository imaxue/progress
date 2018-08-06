# IOS8 与 display:flex 的兼容性问题
>加-webkit-
>display: flex;
>display: -webkit-flex;
>justify-content: space-between;
>-webkit-justify-content: space-between;
>https://www.cnblogs.com/vince-cup/p/5983745.html

# router.replace 在有些ios个别老机型上地址无法替换的问题
>改用location.replace

>router.replace内部是通过window.history.replaceState实现，大概是在微信环境不兼容吧
# overflow:scroll在IOS滚动卡顿的问题
>加上-webkit-overflow-scrolling: touch;
>https://www.cnblogs.com/lyingSmall/p/5235178.html

# nginx 重定向 严格匹配 和 模糊匹配
>严格匹配(只能有hello)  
```javascript
    location  ~ /hello$ {
        rewrite ^.*$  https://www.baidu.com/;
    }
```
>模糊匹配(含有hello即可)
```javascript
    location  ~ /hello {
        rewrite ^.*$  https://www.baidu.com/;
    }
```
