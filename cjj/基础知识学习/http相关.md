# HTTP 相关知识
---
## HTTP 发展史
HTTP是基于TCP/IP协议的应用层协议。不涉及数据的传输，主要规定了客户端和服务器之间通信的格式，默认使用80端口
1. HTTP/0.9
  发布日期： 1991年
  只有GET方式，且只能请求HTML文档。服务器只能回应HTML格式的字符串。服务器发送完毕就关闭TCP连接
    ```
      GET /index.html
    ```
2. HTTP/1.0
  发布日期： 1996年5月
  增加了POST、HEAD命令。请求与响应的格式发生了变化。每次通信都必须包含头信息(HTTP Header)
    - 请求头信息(Request Headers)
      ```
        GET /index.html HTTP/1.0
        User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)
        Accept: */*
        Accept-Encoding: gzip, deflate
      ```
      第一部分是请求行，用来说明请求的类型、要访问的资源及所使用的http版本
      第二部分是是请求头，accept字段表明客户端能接受的文件类型
    - 响应头信息(Response Headers)
      ```
        Cache-Control: no-cache, private
        Content-Length: 952
        Content-Type: application/json
        Expires: Wed, 20 Mar 2019 06:14:54 GMT
        Connection: keep-alive
        Server: Apache 0.84
      ```
    在1.0版本中，connection并不是一个标准字段，主要是为了克服每个TCP连接只能发送一个请求的缺点。添加此字段为keep-alive要求服务器在完成一个请求之后不要关闭连接，方便后续的请求继续复用这个连接。
    ***注： 为什么要复用连接涉及到TCP连接的三次握手，后续在讲TCP/IP协议的时候会提到**
3. HTTP/1.1
  发布日期： 1997年1月
  - 持久连接，TCP连接默认不关闭。客户端和服务器发现对方一段时间没有活动，就可以主动关闭连接。不过，规范的做法是，客户端在最后一个请求时，发送Connection: close，明确要求服务器关闭TCP连接。
  目前，对于同一个域名，大多数浏览器允许同时建立6个持久连接。
  - 管道机制。同一个TPC连接可以发送多个请求。服务器按序处理请求。服务器只有处理完一个回应，才会进行下一个回应。要是前面的回应特别慢，后面就会有许多请求排队等着。这称为"队头堵塞"（Head-of-line blocking）。为了避免这个问题，只有两种方法：一是减少请求数，二是同时多开持久连接。这导致了很多的网页优化技巧，比如合并脚本和样式表、将图片嵌入CSS代码、域名分片（domain sharding）等等。
4. SPDY协议
  发布日期：2009年
  谷歌公开了自行研发的 SPDY 协议，主要解决 HTTP/1.1 效率不高的问题。
这个协议在Chrome浏览器上证明可行以后，就被当作 HTTP/2 的基础，主要特性都在 HTTP/2 之中得到继承。
5. HTTP/2
  发布日期： 2005年
    - 二进制协议
    - 多工
    - 数据流
    - 头信息压缩
    - 服务器推送
---
## URI 统一资源标识符 (Uniform Resource Identifier)
URI是以一种抽象的，高层次概念定义统一资源标识。包括了URL、URN。URL和URN是具体的资源标识的方式
- URL (Uniform Resource Locator) 统一资源定位符 如: http://www.zebra-c.com
- URN (Uniform Resource Name) 统一资源命名 如： mailto:junjun.chen@zebra-c.com