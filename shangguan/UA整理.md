前端时间又重新整理了一些应用UA，内容及关键字如下：

safari————/^Mozilla\/[.\d]+ \(.+\) AppleWebKit\/[.\d]+ \(.+\) Version\/[.\d]+ (Mobile\S+ )?Safari\/[.\d]+$/
> Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1
> Safari-in——————————/^Mozilla\/[.\d]+ \(.+\) AppleWebKit\/[.\d]+ \(.+\) Mobile\/[0-9A-Za-z]+$/
> Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57

微信 android————————有MicroMessenger一定是微信
> Mozilla/5.0 (Linux; Android 8.0; ONEPLUS A3010 Build/OPR1.170623.032; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044408 Mobile Safari/537.36 MMWEBID/1767 MicroMessenger/7.0.3.1400(0x27000338) Process/tools NetType/WIFI Language/zh_CN

微信 ios————————MicroMessenger
> Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C101 MicroMessenger/7.0.3(0x17000321) NetType/4G Language/zh_CN

QQ ios空间——————————有Qzone
> QZONEJSSDK/8.2.7.1 QQJSSDK/1.2 Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57 Qzone/V1_IPH_QZ_8.2.7_1_APP_A NewVersion

QQ ios————————有QQ 且无MicroMessenger、MicroMessenger才是QQ
> Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C101 QQ/7.9.8.464 V1_IPH_SQ_7.9.8_1_APP_A Pixel/1080 Core/WKWebView Device/Apple(iPhone 7Plus) NetType/4G QBWebViewType/1 WKType/1

QQ浏览器 ios——————————有MQQBrowser 且无MicroMessenger才是QQ浏览器
> Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 MQQBrowser/9.0.3 Mobile/15E148 Safari/604.1 MttCustomUA/2 QBWebViewType/1 WKType/1

头条ios——————————NewsArticle
> Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57 NewsArticle/7.0.9.01 JsSdk/2.0 NetType/WIFI (News 7.0.9 12.100000)

UC  ios——————————UCBrowser
> Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/16C101 UCBrowser/12.3.0.1138 Mobile  AliApp(TUnionSDK/0.1.20.3)

百度 ios——————————baiduboxapp
> Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C101 baiduboxapp/11.3.6.10 (Baidu; P2 12.1.2)

微博ios——————————weibo
> Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C101 Weibo (iPhone9,4__weibo__9.2.0__iphone__os12.1.2)

微博android——————————weibo
> Mozilla/5.0 (Linux; Android 8.0.0; ONEPLUS A3010 Build/OPR1.170623.032; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/72.0.3626.105 Mobile Safari/537.36 Weibo (OnePlus-ONEPLUS A3010__weibo__9.2.1__android__android8.0.0)


```
testUA() {
      let ua =navigator.userAgent.toLowerCase()
      // let ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C101 Weibo (iPhone9,4__weibo__9.2.0__iphone__os12.1.2)'.toLowerCase();
      if(ua.match(/MicroMessenger/i) == "micromessenger"){
        alert('是微信')
      }else if(ua.match(/Qzone/i) == "qzone"){
        alert('是QQ空间')
      }else if(ua.match(/MQQBrowser/i) == "mqqbrowser" && ua.match(/MicroMessenger/i) != "micromessenger"){
        alert('是QQ浏览器')
      }else if(ua.match(/QQ/i) == "qq" && ua.match(/MicroMessenger/i) != "micromessenger" && ua.match(/MQQBrowser/i) != "mqqbrowser"){
        alert('是QQ')
      }else if(ua.match(/UCBrowser/i) == "ucbrowser"){
        alert('是UC')
      }else if(ua.match(/baiduboxapp/i) == "baiduboxapp"){
        alert('是百度')
      }else if(ua.match(/Weibo/i) == "weibo"){
        alert('是微博')
      }else if(ua.match(/NewsArticle/i) == "newsarticle"){
        alert('是头条')
      }
},
```
欢迎大家补充！