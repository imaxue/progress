app拉起小程序传递url如下：

```
'pages/redirect/redirect?target=wxapp.html?appID=wx123456'
```

该url用于打开小程序中的webview，由于参数中有两个“?”，小程序无法识别第二个"?"，该url在小程序中的onLaunch或onLoad的options内容如下：


```
options.path = 'pages/shikeCash/bind'
options.target = 'wxapp.html'
```

更换一种思路，将url先转义传递过去，在小程序中再解码

调用native拉起小程序传参如下：

（由于native接口要统一decodeURIComponent一次，所以这里进行两次encodeURIComponent）


```
window.WebViewJavascriptBridge.callHandler(
    'openwxmini', {
        'url': 'pages/redirect/redirect?target='+encodeURIComponent(encodeURIComponent('wxapp.html?appID='+param))
    },
    function (responseData) {}
);
```
小程序中的处理：

```
onLoad: function (options) {
    options = options || {};
    if(wx.getSystemInfoSync().platform!='ios'){
      options.target = decodeURIComponent(options.target)
    }
    this.setData({ target: 'https://shike.com/' + (options.target ? options.target : 'xcx404.html')})
}
```


