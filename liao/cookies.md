# cookies

简单说，Cookie 就是浏览器（客户端）存储在用户电脑上的一小段文本，每个域名的 Cookie 最大为 4KB。当浏览器要发 HTTP 请求时，会检测是否有请求域的 Cookie，有则添加到 Request Header 中的 Cookie 字段中，浏览器会自动帮我们做这些事，免去了手动操作可能导致的错误。
前端技术发展到现在，其实 Cookie 没那么重要，要实现相同的功能，我们可以在每次 Ajax 请求中注入一个标识 Token 的 Request Header，在每次请求时自动发送。
同源限制

- 协议相同
- 域名相同
- 端口相同

只有同源的网页才能共享 Cookie，服务器可以在设置 Cookie 的时候，指定 Cookie 的所属域名为一级域名，比如.example.com。
这样的话，二级域名和三级域名不用做任何设置，都可以读取这个 Cookie。
属性
属性之间由一个分号和空格隔开。
## expires
设置 Cookie 的过期时间，必须是 GMT 格式的时间（new Date().toGMTString() 或 new Date().toUTCString() 获得）
expires=Thu, 25 Feb 2018 04:18:00 GMT 表示 Cookie 在 2018 年 2 月 25 日 4:18 分失效，浏览器会清空失效的 Cookie。
如果没有设置 expires，默认有效期为 Session，即会话 Cookie，关闭浏览器后清空。
expires 是 http 1.0 中的属性，在 http 1.1 中由 max-age 代替，两种的作用一样，只是语法不同。
max-age 是以秒为单位时间段，cookie失效时刻 = 创建时刻 + max-age，也就是存活多少秒。默认值为 -1，表示浏览器关闭就删除的会话 Cookie，0 表示马上失效（删除）。
## domain
domain 域名，限制 Cookie 被发送到哪些域，举个例子就明白的：
假设有一个 domain 为 baidu.com 的 Cookie。若请求的域名是 baidu.com、api.baidu.com 都会发送该 Cookie（一级域名包含二级域名）。如果请求 google.com 就不会发送这个 Cookie。
domain 的默认值为设置该 Cookie 的网页所在域名。
如果是跨域 XHR 请求，即使 domain 和 path 都满足 Cookie 的 domain 和 path，默认情况下 Cookie 也不会添加到请求头中。
domain 可以设置为页面本域或父域，例如 www.baidu.com 可以设置 www.baidu.com 和 baidu.com 这两个域。
## path
path 路径，限制 Cookie 被发生到哪些目录，/ 表示所有路径。
path 的默认值为设置该 Cookie 的网页所在目录。
## secure
设置 Cookie 在确保安全的请求中才会发生，如 HTTPS。默认情况下，Cookie 不会带 secure 选项。
## httpOnly
设置 Cookie 是否能通过 javaScript 访问，默认情况下，Cookie 不会带 httpOnly 选项。可以通过 JavaScript 读取、修改、删除 Cookie。
## 跨域
从安全角度考虑，浏览器无法获取跨域的 Cookie 是不会变的，跨域携带 Cookie 只有两种方法：

nginx 转发到同一个域名
前后台设置 withCredentials、Access-Control-Allow-Credentials

在 Web 页面中可以随意地载入跨域的图片、视频、样式等资源， 但 AJAX 请求通常会被浏览器应用同源安全策略，禁止获取跨域数据，以及限制发送跨域请求。虽然有多种方法利用资源标签进行跨域，但能够进行的数据交互非常有限。 在 2014 年 W3C 发布了 CORS Recommendation 来允许更方便的跨域资源共享。 默认情况下浏览器对跨域请求不会携带 Cookie，但鉴于 Cookie 在身份验证等方面的重要性， CORS 推荐使用额外的响应头字段来允许跨域发送 Cookie。
在 open XMLHttpRequest之后，设置 withCredentials = true 可让该跨域请求携带 Cookie（携带的是目标页面所在域的 Cookie）。
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.withCredentials = true;
xhr.send();
```
复制代码Access-Control-Allow-Credentials
只设置客户端当然是没用的，还需要目标服务器接受你跨域发送的 Cookie。 否则会被浏览器的同源策略挡住：
服务器同时设置 Access-Control-Allow-Credentials 响应头为 "true"， 即可允许跨域请求携带 Cookie。
## Access-Control-Allow-Origin
除了设置 Access-Control-Allow-Credentials 之外，跨域发送 Cookie 还要求 Access-Control-Allow-Origin 不允许使用通配符 *。
事实上不仅不允许通配符，而且只能指定单一域名：
If the credentials flag is true and the response includes zero or more than one Access-Control-Allow-Credentials header values return fail and terminate this algorithm. –W3C Cross-Origin Resource Sharing
否则，浏览器还是会阻止跨域请求。
## javaScript
在 javaScript 可以通过 document.cookie 读取到 Cookie。
