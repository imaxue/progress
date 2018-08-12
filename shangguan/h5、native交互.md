###### h5、native的交互方式一：
native创建本地服务，比如启动8410端口，前端根据接口地址发起请求即可，示例代码如下：

```
fecth.get('http://127.0.0.1:8410'+ '/download', {
    baseURL: '/',
    timeout: 10000,
    params: {
        aaa: 'xxx'
    }
    }).then(res => {
        // do something
    })
    .catch(res => {
        console.log(res);
    });
```

###### 方式二：使用JSBridge

发起请求的示例代码：

```
window.WebViewJavascriptBridge.callHandler(
    'download',
    {
        'aaa': 'xxx'
    },
    function (responseData) {
        // do something
    }
);
```
流程：H5->通过某种方式触发一个url->Native捕获到url,进行分析->原生做处理->Native调用H5的JSBridge对象传递回调。

使用JSBridge的完整代码流程：


```
//connectWebViewJavascriptBridge
this.connectWebViewJavascriptBridge(this.initBridge)
```

```
//判断是否native已创建出WebViewJavascriptBridge对象
//注册回调函数，第一次连接时调用 初始化函数
connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener(
            "WebViewJavascriptBridgeReady",
            function () {
                callback(WebViewJavascriptBridge);
            },
            false
        );
    }
},
```

```

initBridge(bridge) {
  //初始化
  bridge.init(function (message, responseCallback) {
    document.getElementById("show").innerHTML = '默认接收到Java的数据： ' + message;
    var responseData = 'js默认接收完毕，并回传数据给java';
    responseCallback(responseData); //回传数据给java
  });
  //接收安卓发来的消息   并返回给安卓通知
  bridge.registerHandler("functionInJs", function (data, responseCallback) {
    document.getElementById("show").innerHTML = '指定接收到Java的数据： ' + data;
    var responseData = 'js指定接收完毕，并回传数据给java';
    responseCallback(responseData); //回传数据给java
  });
  //下面为具体业务代码，请求native数据
  const _this = this;
  bridge.callHandler(
    'deviceInfoWithEncode',     //接口地址
    {},                         //参数
    function (responseData) {   //回调函数
      if (responseData) {
        _this.saveDeviceInfo(responseData)
      } else {
        console.log('设备信息native接口失败')
      }
    }
  );
  //发送数据给native
  window.WebViewJavascriptBridge.send({
    msg: 'hello jsbridge!'
  }, function (responseData) {
    alert(responseData);
  });
},
```



