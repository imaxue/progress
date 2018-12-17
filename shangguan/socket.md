#### 小程序socket
文档地址：https://developers.weixin.qq.com/minigame/dev/document/network/websocket/wx.connectSocket.html
###### 1.创建连接

```
wx.connectSocket({
    url: "ws://localhost:12345",
})
```

###### 2.监听WebSocket 连接打开事件

```
wx.onSocketOpen(function () {
    wx.sendSocketMessage({
        data: 'stock',
    })
})
```

###### 3.监听WebSocket 接受到服务器的消息事件

```
wx.onSocketMessage(function (data) {
    var objData = JSON.parse(data.data);
    console.log(data);
})
```


###### 4.监听WebSocket 连接关闭事件

```
wx.onSocketClose(function () {
    console.log('websocket连接失败！');
})
```

###### 5.关闭 WeSocket 连接

```
wx.closeSocket(Object object)
```



###### 监听网络状态变化事件

```
wx.onNetworkStatusChange(function callback)
```


下面是项目中实际应用的代码：

```
let instance
/**
 * WebSocket 统一处理
 * 
 * @export
 * @class WebSocket
 */
module.exports = class WebSocket {
    constructor(token) {
        if (instance)
            return instance

        instance = this

        this.online = true // 默认网络是在线的

        this.connect()

        this.socketOpen = false
        this.socketMsgQueue = [] //消息队列

        wx.onNetworkStatusChange(params => {
            if (params.isConnected) {
                this.connect()
                this.online = true
            } else {
                this.online = false
            }
        })

        wx.onSocketOpen(() => {
            console.log('链接成功')
            this.socketOpen = true
            if (this.socketMsgQueue.length > 0) {
                let item = this.socketMsgQueue.shift()
                this.sendMsg(item)
            }
            this.startHearbeat()
        })
        wx.onSocketClose(res => {
            console.log('WebSocket 已关闭！')
            this.socketOpen = false
            if(this.online){
                this.connect();
            }
            clearInterval(this.pingTimer)
        })

    }
    sendMsg(msg, fn) {
        if (this.socketOpen) {
            wx.sendSocketMessage({
                data: JSON.stringify(msg),
                success: function (res) {
                    if (msg.type !== 'ping') {
                        console.log('消息发送成功')
                    }
                    fn && fn(res)
                }
            })
        } else {
            // ping 值发送失败不加入队列
            if (msg.type !== 'ping') {
                this.socketMsgQueue.push(msg)
                let item = this.socketMsgQueue.shift()
                this.sendMsg(item)
                console.log('发送失败加入队列')
            }
        }
    }
    startHearbeat() {
        // 发送心跳
        this.pingTimer = setInterval(() => {
            this.sendMsg({
                type: 'ping'
            });
        }, 5000)
    }
    connect() {
        wx.connectSocket({
            url: Global.socket,
            header: {
                token: Global.token
            }
        })
    }
}
```
