## 分析原因

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

## 解决方法

- 发送简单请求

```
1，get、post、head 请求类型
2，不要设置列表之外的header（如： user-agent）
3，Content-Type 只能是：
application/x-www-from-urlencoded
multipart/from-data
text/plain
```
序列化数据
```js
axios.post(this.authUrl,JSON.stringify(this.userInfo))
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
```

- 后端开启option请求限制

但是goserver没有option请求，其他后端语言可以

- nginx代理接口

彻底解决这个问题，也可以减少请求数量，缓解服务器压力
