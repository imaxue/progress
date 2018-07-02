#小程序socket
文档地址https://developers.weixin.qq.com/minigame/dev/document/network/websocket/wx.connectSocket.html
1. //创建连接
wx.connectSocket({
    url: "ws://localhost:12345",
})
2. //监听WebSocket 连接打开事件
wx.onSocketOpen(function () {
    wx.sendSocketMessage({
        data: 'stock',
    })
})
3. //监听WebSocket 接受到服务器的消息事件
wx.onSocketMessage(function (data) {
    var objData = JSON.parse(data.data);
    console.log(data);
})

4. //监听WebSocket 连接关闭事件
wx.onSocketClose(function () {
    console.log('websocket连接失败！');
})
5. //关闭 WeSocket 连接
wx.closeSocket(Object object)


6. //监听网络状态变化事件
wx.onNetworkStatusChange(function callback)