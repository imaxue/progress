## Websocket简介

WebSocket 是一种网络通信协议。RFC6455 定义了它的通信标准。
WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。
为什么需要Websocket
HTTP 协议是一种无状态的、无连接的、单向的应用层协议。它采用了请求/响应模型。通信请求只能由客户端发起，服务端对请求做出应答处理。
所以当我们想服务器主动给客户端发送消息，HTTP是做不到的，我们只能使用轮询或者长轮询来实现类似的功能，这样的方式效率低并且浪费资源，为了解决这样的问题，WebSocket诞生了。

##### 为什么要做心跳重连
在使用原生WebSocket的时候，我们经常会感觉不太稳定，服务端发送的消息有时候客户端接收不到，或者是客户端发送的消息服务端接收不到，虽然WebSocket也提供了onError和onClose的方法，但是经常会有各种未知情况导致断开连接而并不触发Error或Close事件。这样就导致实际连接已经断开了，而客户端和服务端却不知道，还在傻傻的等着消息来。

保证连接状态，连接断开时让客户端与服务端都能知道，进而重连。

###### 页面载入后,我们连接socket先


```
  onLoad(){
    this.linkSocket()
  },
  linkSocket(){
    let that = this
    wx.connectSocket({
      url: app.globalData.wsUrl + 'websocket?' + this.data.taskId + '&' + this.data.userId,
      success() {
        console.log('连接成功')
        that.initEventHandle()
      }
    })
  },
```

###### 然后调用initEventHandle来绑定各种各样的事件
  
```
  initEventHandle(){
    let that = this
    wx.onSocketMessage((res) => {
      //收到消息
    })
    wx.onSocketOpen(()=>{
      console.log('WebSocket连接打开')
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败')
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  },
```

###### 断线重连
  
```
  reconnect(){
    if (this.lockReconnect) return;
    this.lockReconnect = true;
    clearTimeout(this.timer)
    if (this.data.limit<12){
      this.timer = setTimeout(() => {
        this.linkSocket();
        this.lockReconnect = false;
      }, 5000);
      this.setData({
        limit: this.data.limit+1
      })
    }
  },
```

复制代码我们设置一个锁和最大的重连次数，避免出现无限重连的情况，为了不给服务器太大的压力我这里设置的是5秒重试一次，最多请求12次。

改造一下initEventHandle这样我们就可以实现一般的触发Error的断线重连。

  
```
  initEventHandle(){
    let that = this
    wx.onSocketMessage((res) => {
      //收到消息
    })
    wx.onSocketOpen(()=>{
      console.log('WebSocket连接打开')
    })
    wx.onSocketError((res)=>{ 
      console.log('WebSocket连接打开失败')
      this.reconnect()
    })
    wx.onSocketClose((res)=> {
      console.log('WebSocket 已关闭！')
      this.reconnect()
    })
  },
```

###### 心跳对象


```
 let heartCheck = {
  timeout: 10000, 
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function () {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function () {
    this.timeoutObj = setTimeout(()=> {
      console.log("发送ping");
      wx.sendSocketMessage({
        data:"ping",
        // success(){
        //   console.log("发送ping成功");
        // }
      });
      this.serverTimeoutObj = setTimeout(() =>{
        wx.closeSocket(); 
      }, this.timeout);
    }, this.timeout);
  }
};
```

心跳对象内timeout为每10秒发一次心跳,timeoutObj、serverTimeoutObj是清除定时器用的对象，reset方法重置定时器，start发送心跳。

继续改造我们的initEventHandle

  
```
initEventHandle(){
    let that = this
    wx.onSocketMessage((res) => {
      //收到消息
      if (res.data == "pong"){
        heartCheck.reset().start()
      }else{
        \\处理数据
      }
    })
    wx.onSocketOpen(()=>{
      console.log('WebSocket连接打开')
      heartCheck.reset().start()
    })
    wx.onSocketError((res)=>{ 
      console.log('WebSocket连接打开失败')
      this.reconnect()
    })
    wx.onSocketClose((res)=> {
      console.log('WebSocket 已关闭！')
      this.reconnect()
    })
  },
```

如果超过10秒服务端还没回复“pong”，则认为连接断开的



