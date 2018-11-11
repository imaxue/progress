### 1、概念
Fiddler是位于客户端和服务器端的HTTP代理，也是目前最常用的http抓包工具之一 。 它能够记录客户端和服务器之间的所有 HTTP请求，可以针对特定的HTTP请求，分析请求数据、设置断点、调试web应用、修改请求的数据，甚至可以修改服务器返回的数据，功能非常强大，是web调试的利器。

既然是代理，也就是说：客户端的所有请求都要先经过Fiddler，然后转发到相应的服务器，反之，服务器端的所有响应，也都会先经过Fiddler然后发送到客户端，基于这个原因，Fiddler支持所有可以设置http代理为127.0.0.1:8888的浏览器和应用程序。

### 2、安装配置
- fiddler配置：
1. 开启Fiddler的远程连接，Fiddler 主菜单 Tools -> Fiddler Options…-> Connections页签，选中Allowremote computers to connect；
2. Fiddler Options…-> HTTPS页签，选中Decrypt HTTPS traffic；
- 手机配置：
1. cmd-->ipconfig查看“无线网络连接”电脑IP；
2. 手机设置-->HTTP代理-->手动-->服务器输入IP和端口号；
### 3、基本使用
1. 菜单栏-->remove all：清理所有http请求；
2. Inspectors模块：分为上下两个部分，上半部分是请求头部分，下半部分是响应头部分。

### 4、Fiddler使用界面简介
主界面中主要包括四个常用的块：
1. Fiddler的菜单栏，包括捕获http请求，停止捕获请求，保存http请求，载入本地session、设置捕获规则等功能。
2. Fiddler的工具栏,包括Fiddler针对当前view的操作（暂停，清除session,decode模式、清除缓存等）。
3. web Session面板，主要是Fiddler抓取到的每条http请求（每一条称为一个session）,主要包含了请求的url，协议，状态码，body等信息，详细的字段含义如下图所示：
4. 详情和数据统计面板。

### 为什么是Fiddler?
抓包工具有很多，小到最常用的web调试工具firebug，达到通用的强大的抓包工具wireshark.为什么使用fiddler?原因如下：

a.Firebug虽然可以抓包，但是对于分析http请求的详细信息，不够强大。模拟http请求的功能也不够，且firebug常常是需要“无刷新修改”，如果刷新了页面，所有的修改都不会保存。

b.Wireshark是通用的抓包工具，但是比较庞大，对于只需要抓取http请求的应用来说，似乎有些大材小用。

c.Httpwatch也是比较常用的http抓包工具，但是只支持IE和firefox浏览器（其他浏览器可能会有相应的插件），对于想要调试chrome浏览器的http请求，似乎稍显无力，而Fiddler2 是一个使用本地 127.0.0.1:8888 的 HTTP 代理，任何能够设置 HTTP 代理为 127.0.0.1:8888 的浏览器和应用程序都可以使用 Fiddler。

### 相关链接
- http://blog.csdn.net/qq_21792169/article/details/51628123
- http://www.jianshu.com/p/4a8dae519efe
- http://tmq.qq.com/2017/03/fiddler/