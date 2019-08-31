
# 原文：https://segmentfault.com/q/1010000000135980

##  原因：如果你在页面中没有使用<div data-role="page">，jquery mobile会自己创建一个，因为它必须依赖这个。

        它怎么创建呢？把body里面的内容复制一遍塞到div里去，body里有什么东西呢？除了你的img外还有两个script，因此它被塞入到新节点后，浏览器解释为需要加载scirpt里的内容，最后奇迹就发生了。。。


        1. 把引入js的代码放到<head></head>里面；

        2.把网页内容放到<div data-role="page"></div>容器里面（这种情况js引入代码可以放到它里面，或者也可以放到<head></head>里面）；