
# 通过user-agent判断浏览器环境

先看看user-agent的大概样子
```html
pc端
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36

移动端
Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1

```
- 判断是否微信环境
```js

export const _isWechat = () => { 
  let ua = window.navigator.userAgent.toLowerCase(); 
  return ua.match(/MicroMessenger/i) == 'micromessenger'
}
```
- 判断是安卓还是IOS
```js

export const _deviceType = () => {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  let isiOS = u.indexOf('iPhone') > -1; //ios终端
  if(isAndroid){
    return 'Android'
  }else if(isiOS){
    return 'iOS'
  }else{
    return null
  }
}
```


- 可以判断多种浏览器或者APP内部webview环境
```js
// 判断浏览器类型
export const _deviceType = () => {
  let u = navigator.userAgent
  let type = [
    {type:'weChat', sign: ['MicroMessenger']},
    {type:'weiBo', sign: ['Weibo']},
    {type:'MQQBrowser', sign: ['MQQBrowser']},
    {type:'UCWEB', sign: ['UCWEB']},
    {type:'iosBrowser', sign: ['iPhone','Version']},
    {type:'iPadBrowser', sign: ['iPad','Version']},
    {type:'androidApp', sign: ['Android', 'Version']},
    {type:'iosApp', sign: ['iPhone']},
    {type:'iPadApp', sign: ['iPad']},
    {type:'androidBrowser', sign: ['Android']},
  ]
  let temp = ''
  for (let value of type) {
    // console.log(value)
    if(value.sign.every(e => u.indexOf(e) > -1)){
      temp = value.type
      return value.type
      break
    }
  }
  // 如果什么都不是，先按照安卓处理
  if(temp === ''){
    return 'androidBrowser'
  }
}

```

## 特殊情况
有个别浏览器（如猎豹）会改掉默认的user-agent，这就没办法根据上述情况判断了，如果要兼容只能放弃了

> 判断是否是app的webview内，最准确的就是app端修改webview的user-agent,给个特殊的标识，这样就可以判断了

> 还有一些业务情况，是分享页和嵌入页公用一套H5，可以给H5外边套个父组件，两端给不同的路径，这样根据路径可以判断是什么环境
