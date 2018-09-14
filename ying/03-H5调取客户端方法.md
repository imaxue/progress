# H5与客户端交互
>一 、 H5调取客户端方法
>>方案1：
```javascript
1.组装数据
2.var imgData = JSON.stringify(this.isMobileData);
3.
<!-- 调取客户端公共的方法 -->
this.showImagesBrowser(imgData);
<!-- 客户端公共的方法 -->
showImagesBrowser(data) {

DDAppWebView.showImagesBrowser && DDAppWebView.showImagesBrowser(data);

}
4.代码
openImageProxy: function(event) {

if (this.isMobile.Iphone()) {

if (event.target.nodeName === "IMG") {

this.isMobileData.images = [];

var imgLength = document.querySelectorAll("img");

for (var i = 0; i < imgLength.length; i++) {

if (event.target.src == imgLength[i].src) {

this.imgIndex = i;

}

this.isMobileData.images.push(imgLength[i].src);

}

this.sendData();

}

}

},

sendData: function() {

this.isMobileData.default_select_index = this.imgIndex;

JSON.stringify(this.isMobileData);

var imgData = JSON.stringify(this.isMobileData);

this.showImagesBrowser(imgData);

},

showImagesBrowser(data) {

DDAppWebView.showImagesBrowser && DDAppWebView.showImagesBrowser(data);

}
```


>>方案2

https://www.cnblogs.com/dailc/p/5931324.html



