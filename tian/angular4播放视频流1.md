### 1.下载ckpalyer整个包并导入
### 2.引入ckplayer.js
angular2中，在angular-cli.json中找到script,添加上ckplayer.js  
```js
"scripts": ["./assets/ckplayer/ckplayer.js"]
```
### 3.编写html
```js
<div id="video" class="video"></div>
```
### 4.编写实现函数
```js
player: any;
videoPlay(){
        var videoObject = {
            container: ‘#video‘,//“#”代表容器的ID，“.”或“”代表容器的class
            variable: ‘player‘,//该属性必需设置，值等于下面的new chplayer()的对象
            autoplay: false,//自动播放
            live: true,
            poster: ‘material/poster.jpg‘,//视频封面
            video:‘rtmp://live.hkstv.hk.lxdns.com/live/hks‘//视频地址
        };
        this.player = new ckplayer(videoObject);
    }
```
###  5.最后发现ckplayer一直有波浪线，同时还有报错,此时需要将ckplaer进行declare一下，找到src目录下的typings.d.ts，加入以下代码
```js
declare var ckplayer: any;
```
### 6..调试浏览器中的报错此时程序中不再有报错了，但是打开网页发现视频仍然不能播放，在console栏中看到localhost：4200/ckplayer.swf 404
```js
"assets": [
        "assets",
        "favicon.ico",
        "favicon.png",
        "ckplayer.swf",
        "language.xml",
        "style.xml"]
```

github地址：[demo](https://github.com/bainana/angular-ckplayer-demo)
