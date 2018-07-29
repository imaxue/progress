# 微信分享

## 一、原生微信分享

地址：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115

两种方式引入微信的js

* 直接引入js：<script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js" type="text/javascript"></script>
* 动态生成：
``` 
loadWxJs() {
        const s = document.createElement('script')
        s.type = 'text/javascript'
        s.async = true
        s.src = `https://res.wx.qq.com/open/js/jweixin-1.2.0.js`
        const x = document.getElementsByTagName('script')[0] as any
        x.parentNode.insertBefore(s, x)
        s.onload = () => {}
    }
```

### 客户端JS代码：

```

async componentDidMount() { 
            // 加载微信js
            this.loadWxJs()
            // 如果当前缓存不存在，就获取token；
            // 如果存在，并且当前时间和缓存时间的差值大于两小时，重新获取，并且缓存当前时间
            if (!hcTime || !ticket) {
                localStorage.setItem('hcTime', nowTime.toString())
                const url = location.origin + '/weixin/sha1'  // 在node服务端获取token和js——ticket的接口，如果你是用的express框架
                const ticketObj = await axios.get(url).then(res => res.data) as any
                if (ticketObj && ticketObj.ticket) {
                    localStorage.setItem('ticket', ticketObj.ticket)
                }
            } else {
                if (nowTime - Number(hcTime) > 7200000) {
                    localStorage.setItem('hcTime', nowTime.toString())
                    const url = location.origin + '/weixin/sha1'
                    const ticketObj = await axios.get(url).then(res => res.data) as any
                    if (ticketObj && ticketObj.ticket) {
                        localStorage.setItem('ticket', ticketObj.ticket)
                    }
                }
            }
}

async shareWX(shareObj, type) {
        const ticket = localStorage.getItem('ticket')
        const noncestr = Math.random().toString(36).substr(2)
        const timestamp = new Date().getTime()
        const jsapi_ticket = ticket || ''
        const url = 'https://www.autodis.cn/' + this.props.url
        const string1 = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
        const signature = sha1(string1)
        // const ticketObj = await axios.get(location.origin + '/weixin/sha1').then(res => res.data) as any
        const obj = {
            debug: true, // 开启调试模式
            appId: 'wxe6346d3144edbe38', // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: noncestr, // 必填，生成签名的随机串
            signature: signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
        }
        /*权限验证配置*/
        wx.config(obj)
        if (Utility.$judgeIsMobile()) {   // 如果是手机端
            wx.ready(() => {
                WeixinJSBridge.call('showOptionMenu')
                /*1-分享给朋友*/
                wx.onMenuShareAppMessage(shareObj)
                /*2-分享给朋友圈*/
                wx.onMenuShareTimeline(shareObj)
                /*3-分享到QQ好友*/
                wx.onMenuShareQQ(shareObj)
                /*4-分享到QQ空间*/
                wx.onMenuShareQZone(shareObj)
                /*5-分享到腾讯微博*/
                wx.onMenuShareWeibo(shareObj)
            })
            wx.error((res) => {})
        }
    }
    
```

### 客户端调用：

```

   // 分享到
    shareToType(ee, type) {
        if (ee && ee.target) {
            ee.preventDefault()
            ee.nativeEvent.stopPropagation()
        }
        const { title, url, article } = this.props
        const { cmsImages } = article
        const src = cmsImages[0].src
        const _url = 'https://www.autodis.cn/' + url
        const obj = {
            title: title,  // 分享标题
            desc: title,   // 分享描述
            link: _url,    // 分享链接
            imgUrl: src,   // 分享图标
            success: () => {},
            cancel: () => {}
        }
        if (type) {
            this.shareWX(obj, type)
        }
    }    
    
```

### 服务端获取token接口：express封装接口

```

const express = require('express')
const router = new express.Router()
const axios = require('axios')
module.exports = router
// 微信：获取token和ticket
router.get('/weixin/sha1', async (req, res, next) => {
    try {
        const tokenObj = await axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={appid}&secret={secret}')
        const access_token = tokenObj.access_token
        if (access_token) {
            const ticket = await axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`)
            return res.json(ticket)
        }
    } catch(error) {
        next(error)
    }
})

```

### 加密方式：sah1

1、npm包：node-sha1

```
npm i --save node-sha1
const sha1 = require('sha1')
const string1 = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
const signature = sha1(string1)

```

2、node

首先要按照微信的生成秘钥的方式，在项目中引入公钥和私钥
https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=24_7

```
一定是在服务器端执行：

import * as crypto from 'crypto'
const fs = require('fs')
const resolve = require('resolve')
// import * as resolve from 'resolve'
module.exports = function getRsaEncryption (prestr) {
  const privatePem = fs.readFileSync(resolve('cert/rsa_private_key.pem'))
  const key = privatePem.toString()
  const signer = crypto.createSign('RSA-SHA1') // RSA-SHA256
  signer.update(prestr)
  return signer.sign(key, 'base64')
}

```

**注意：这是微信环境的分享，h5或者浏览器并不支持，除非你要拉起微信的应用**



## 二、引导分享：浏览器提供了菜单栏

https://www.npmjs.com/package/m-share


#### 安装

		<script src="m-share.js"></script>
		
#### 快速开始

	<div class="m-share"></div>
	<script>
		const config = {...}; // config配置参考下面“基本使用-配置项”
		Mshare.init(config);
	</script>

#### 配置项
	
    const config = {
      link:  'http://www.qq.com', // 网址，默认使用window.location.href
      title: '标题',  // 标题，默认读取document.title 
      desc:  '分享描述', // 描述, 默认读取<meta name="description" content="desc" />
      imgUrl: 'http://backtonature.github.io/project/m-share/demo1.png' // 图片, 默认取网页中第一个img标签
      types: ['wx', 'wxline', 'qq', 'qzone', 'sina'], // 启用的社交分享,默认为全部启用
      infoMap: { // 针对不同平台设定不同分享内容
        wx: {
          link: '分享到微信的链接', // 覆盖分享到微信的链接
          title: '分享到微信的标题', // 覆盖分享到微信的标题
          desc: '分享到微信的描述', // 覆盖分享到微信的标题
          imgUrl: '分享到微信的图片链接' // 覆盖分享到微信的图片链接
        }
      },
      fnDoShare(type) {
        // 执行分享的回调，type为'wx', 'wxline', 'qq', 'qzone', 'sina'
      }
    };
	
***注意：***

1. 所有的配置参数都不是必填项
2. ```其他浏览器```并没有开放native分享的api，所以对分享到```微信```、```朋友圈```、```QQ好友```设置的```infoMap```参数，在```其他浏览器```和```手机qq客户端```下不会生效.
3. 这个分享的图标是i标签的伪元素生成的，你可以自己写样式，[图标来自于阿里的](http://www.iconfont.cn/)



    
    
    
    
    
    
    
    
    
    
    
    
    
