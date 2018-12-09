## 注册账号

**腾讯地图开放平台[官网](https://lbs.qq.com/)**


选择产品---微信小程序开发----微信小程序JavaScript SDK
  
根据入门及使用限制一步步操作

> 1. 申请开发者密钥（key）：申请密钥
          
> 2. 下载微信小程序JavaScriptSDK，微信小程序JavaScriptSDK v1.0
          
> 3. 安全域名设置，在“设置” -> “开发设置”中设置request合法域名，添加https://apis.map.qq.com

## 编写代码

* 选择逆地址解析(坐标位置服务),网址: <https://lbs.qq.com/qqmap_wx_jssdk/method-reverseGeocoder.html>


* 代码示例

```
// 引入SDK核心类
var QQMapWX = require('xxx/qqmap-wx.js');
        
// 实例化API核心类
var demo = new QQMapWX({
    key: '开发密钥（key）' // 必填
});
        
//获取地理位置
getLocation() {
   
	let page = this;
	wx.getLocation({
		type: 'wgs84',
       	success(res) {
       		const latitude = res.latitude
       		const longitude = res.longitude
       		const speed = res.speed
       		const accuracy = res.accuracy
       		console.log(res)
				// 2 把经纬度转成广州 北京。。 要通过腾讯地图来实现
				// 调用接口
				demo.reverseGeocoder({
     				location: {
          			latitude: latitude,
            			longitude: longitude
          		},
          		success: function (ret) {
          			console.log(ret);
             		if (ret.status == 0) {
             			let city = ret.result.address_component.city;
                 	page.setData({
                        city: city
                 	})
              	}
        		},
	     		fail: function (res) {
					console.log(res);
	     		},
          	complete: function (res) {
	       		console.log(res);
           	}
			});
		}
	})
},

```

* 最后在小程序的onload方法中记得调用getLocation方法