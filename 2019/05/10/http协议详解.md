# http协议详解

## MIME(多功能因特网邮件扩展)

最初是用来解决在不同的电子邮件系统之间搬移报文时存在的问题。后来被HTTP采纳，用来描述标记多媒体内容。

常见MIME类型：
+ text/html
+ text/plain
+ image/jpeg
+ image/gif
+ video/quicktime

浏览器控制台出现 `MIME type error...`

> 此时一般是mime类型错误，一般情况是请求首部中的content-type与其文件的格式不匹配, [匹配表](http://www.xuebuyuan.com/2118801.html)

## URI
+ URI是URL和URN的统称
+ URN少见，一般为URL
+ URI在世界范围内唯一标识并定位资源信息

### 格式
`<scheme>://<user>:<password>@<host>:<port>/<path>;<parms>?<query>#<frag>`

### DNS

### URL快捷方式

+ 浏览器会对url自动扩展
+ 相对url
    1. 在资源中显示提供，如`<base>`
    2. 基础URL：将它所属资源的URL作为基础
    
>> 所有URL在最终发起请求之前都会被浏览器拼接成完整的绝对URL
>> 不安全字符需要编码，如%xx

![8b1c32d61304127674aaffa7bc8a8e02.png](en-resource://database/889:1)

## 状态码
+ 1 收到请求初始部分，愿意继续接受主体
+ 2 成功
+ 3 重定向
+ 4 客户端错误
+ 5 服务端错误

## TCP
+ TCP的数据通过IP分组的小数据块来发送
+ 协议栈：HTTP over TCP over IP
+ HTTPS: 在HTTP和TCP之间插入一个密码加密层（TLS或SSL）
+ 性能
    1. TCP握手
    2. TCP慢启动 connection: keey-alive(哑代理，proxyconnection盲转发)
    3. 延迟确认，没收到则重发

## 服务器
接收请求，处理请求，产生响应

## 代理
+ 代表客户端完成事务处理的中间人
+ 功能：过滤器，资源访问控制，防火墙，缓存，反向代理，内容路由器，转码器，匿名
+ 部署：出口代理，入口代理，反向代理，网络交换代理
+ 层次结构
