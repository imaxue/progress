# 老黄的笔记

#### 简单的爬虫页面

```
import http from 'http'
import zlib from 'zlib'


var url = 'http://www.bilibili.com/video/game.html';
http.get(url,function(res){
    const chunks = [];
    const size = 0;
    res.on('data',function(data){
        chunks.push(data);
        size += data.lenght;
    });
    res.on('end',function(){
        const buf = Buffer.concat(chunks,size);
        const newbuf = zlib.gunzipSyunc(buf);
        console.log(newbuf.toString())
    })
}).on('error',function(){
    console.log('error')
})
```
> 简单的获取页面数据  数据处理逻辑 自己想要什么就去改

#### 补充 内容 链接服务器 两种方式（ssh和sftp） 获取和上传 

> 如果是用图形界面的就不用看了 我这里介绍的是用命令行的方式 主要是出于锻炼自己的目的才使用的（个人建议还是使用图形界面）


> ssh

```
//链接服务器
ssh root@serverip 

//输入你的服务器密码
root@serverip password:

//找到你需要下载的文件或者目录  这里介绍一下ssh的find方法
find ./ -name router  
//find（查找） ./（从根目录开始查） -name（已名字为查找项） router（你所找的文件名 可以不全）

//找到文件后 获取一下它的路径
pwd

//ssh 的拉取文件到本地 这里你需要再开一个进程 此进程要在你本地运行 
scp root@serverip:你pwd获取到的地址 ./
//scp 拷贝 root@serverip:你pwd获取到的地址 服务器上你想获取文件的地址 ./这是你想拷贝到本机的位置

//ssh 推送本地文件到服务器 （与拉取相反就行了）
scp 要推送的文件 root@ip地址:/路径


```

> sftp

```
//链接服务器
sftp root@serverip

//输入你的服务器密码
root@serverip password:

//移动到文件所在地 获取你所需要的文件
get router.js
// 注意 你get获取的文件  文件位置 会在你此进程所在的位置  比如我在./进入的服务器 那么get的文件就会在本机./下 如果在Downloads目录下 那么get文件就会在Downloads文件下

//推送文件
put router.js
//put 提交文件 提交文件的时候 他会搜索你本机所在文件目录有没有这个文件 例如我在./下 他就会搜索本机./目录下router.js 

//最后 exit 退出
exit


```

> 刚刚看到有人分享kill进程方法  这里推荐一个懒人方法


```
//杀死所有node进程 你起的其他node进程也会被杀死 起多个进程的项目 不推荐使用 单个进程少量进程的可以 免去查找进程这一步骤
pkill -9 node 

```

> 看到一个好玩的东西

```

(function () {
	if (!window.console) {
		window.console = {
			log: function () {}
		};
		return;
	}
	var me = 19;
	var Star = function () {
		this.x = 0;
		this.speed = 1;
		this.y = 0;
	}
	var score = 0;
	var strs = function () {
		var result = '';
		for (var i = 0; i < 20; i++) {
			result += "\n"
			for (var n = 0; n < 40; n++) {
				var now = '一'
				if (i == 19 && n == me) {
					now = "码"
				}
				if (i == 19 && n == me + 1) {
					now = "农"
				}
				stars.forEach(function (star) {
					var x = Math.floor(star.x);
					var y = Math.floor(star.y)
					if (x == n && y == i) {
						if (Math.abs(star.y - 19) < 1 && (n == me || n == me + 1)) {
							die()
						}
						now = "车"
					}
				})
				result += now;

			}

		}
		result += "       《躲车车》得分：" + score
		return result;
	}
	window.onkeydown = function (e) {
		if (e.keyCode == 37) {
			me -= 1;
			if (me < 0) me = 0;
		} else if (e.keyCode == 39) {
			me += 1
			if (me > 38) me = 38
		}
	}
	var count = 0;
	var die = function () {
		clearInterval(timer1)
		clearInterval(timer2)
		clearInterval(timer3)
		setTimeout(function () {
			console.log('游戏结束，您的得分:' + score)
		}, 100)

	}
	var stars = []
	var appearP = 1
	var timer1, timer2, timer3;
	var begin = function () {
		timer1 = setInterval(function () {
			var createCount = Math.floor(Math.random() * 5 * appearP)
			for (var i = 0; i < createCount; i++) {
				var star = new Star();
				star.x = Math.floor(Math.random() * 40)
				star.y = 0;
				star.speed = Math.random() * appearP; //Math.floor(Math.random()*3+1)
				stars.push(star)
			}

		}, 1000)
		timer2 = setInterval(function () {
			stars.forEach(function (star, i) {
				star.y += star.speed;
				if (star.y >= 31) {
					stars.splice(i, 1);
					score++
				}
			})
			console.log(strs())
			count++;
			if (count > 300) {
				console.clear()
				count = 0;
			}
		}, 100)
		timer3 = setInterval(function () {
			appearP *= 1.1
		}, 3000)
	}
	console.log("输入 start(); 后即可开始《码农躲车车》游戏！")
	window.start = function () {
		appearP = 1.1
		starts = [];
		score = 0;
		me = 19;
		count = 0;
		console.log("%c请先用鼠标点击一下弹个车网页页面，游戏需要捕捉网页上的键盘事件（你应该懂吧）！", "font-size:16px;color:#ff6700;")
		console.log("使用键盘左右键移动最下方的码农，躲开所有的汽车，汽车数量和速度会一直增加，看看谁坚持的最久吧！")

		var countdown = 6;
		setTimeout(function () {
			if (countdown-- <= 1) {
				begin();
			} else {
				console.log(countdown)
				setTimeout(arguments.callee, 1000)
			}
		}, 1000)
		return ("倒计时！")
	}
})();
```
> 新加一个好玩的东西 调用摄像头拍照 （emmm 可以当镜子用）
```
<!DOCTYPE html>  
<html>  
<head>  
    <title>页面调用摄像头</title>  
    <meta charset="utf-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1">  
</head>  
<body>  
<video id="video" autoplay=""style='width:640px;height:480px'></video>  
<button id="paizhao">拍照</button>   
<canvas id="canvas" width="640" height="480"></canvas>  
<script type="text/javascript">  
    var video=document.getElementById("video");  
    var context=canvas.getContext("2d");  
    var errocb=function(){  
        console.log("sth srong");  
    }  
    if(navigator.getUserMedia){  
        navigator.getUserMedia({"video":true},function(stream){  
            video.srcObject=stream;  
            video.play();  
        },errocb);  
    }else if(navigator.webkitGetUserMedia){  
        navigator.webkitGetUserMedia({"video":true},function(stream){  
            video.src=window.webkitURL.createObjectURL(stream);  
            video.play();  
        },errocb);  
    }  
    document.getElementById("paizhao").addEventListener("click",function(){  
        context.drawImage(video,0,0,640,480);  
    });  
</script>  
</body>  
</html>  

```