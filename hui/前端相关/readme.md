# 老黄的笔记


> 看到一个好玩的东西  运行在console里面

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
> emmm 使整个页面可编辑 （ps 我也感觉没什么用 不过挺有意思的）

```
document.body.contentEditable='true';


document.designMode='on'; 

```
> 让鼠标不见 emmm 也没什么用

```
// 返回所有该网站用到的样式列表
document.styleSheets

// 创建一个新的样式元素
var style = document.createElement("style"); 

// 在该样式元素中创建新的节点（样式）
style.appendChild(document.createTextNode("*{cursor:none !important}"));  

//或者让你的世界变得模糊
style.appendChild(document.createTextNode("
p {
    color: transparent;
    text-shadow: #111 0 0 5px;
}
"));  



// 将该样式元素添加到DOM中
document.head.appendChild(style); 

//然后鼠标就不见啦  啦啦啦啦啦啦

```

> 为王的诞生 献上礼炮 ╮(╯▽╰)╭

```
console.log("%c为王的诞生 献上礼炮", "font-size:16px;color:#ff6700;padding:200px 300px;line-height:120px;background:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532077451611&di=52feacb5a51215a302a1b56a452e6c72&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2Fde0b5c2293ecc048f6323fa499ec8c9031d458f0.jpg') no-repeat;");
```

> 随机生成头像！！！！！ 感觉有一点点用哦  实际呢、、管他呢

只需 HTTP 请求 <font color='#F5F5DC'>http://www.gravatar.com/avatar/{hash}?s=256&d=identicon</font> 其中：

+ hash：生成一个随机数填充
+ s：尺寸，像素为单位
+ d：风格，目前可选 identicon、monsterid、wavatar、retro、robohash 等


> 今天特别累 随便写一点 小Tips
+ 首先是我项目中遇到的一个问题 hcharts中 我们地图上显示不了所有的省市名 （例如 北京和天津  一般都只显示北京 天津 默认就隐藏了  但是有时候 需求要全部显示）
+ 解决办法： https://api.hcharts.cn/highmaps#series<map>.dataLabels   先把 所有我们需要显示的省市写在Label中 然后 设置series<map>.dataLabels为true 也就是强制显示我们所有的Label
+ 然后 一行评分代码 "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate); 
+ 在分享一个https://github.com/hustcc/canvas-nest.js/blob/master/README-zh.md  好玩的插件  

> 介绍一个css 未来可能会推出的新特性 @supports

传统的 CSS 特性检测都是通过 javascript 实现的，但是未来，原生 CSS 即可实现。

CSS @supports 通过 CSS 语法来实现特性检测，并在内部 CSS 区块中写入如果特性检测通过希望实现的 CSS 语句。

```
语法：
@supports <supports_condition> {
    /* specific rules */
}

举个例子：

div {
    position: fixed;
}
 
@supports (position:sticky) {
    div {
        position:sticky;
    }
}


```

上面的例子中，position: sticky 是 position 的一个新属性，用于实现黏性布局，可以轻松实现一些以往需要 javascript 才能实现的布局（戳我了解详情），但是目前只有在 -webkit- 内核下才得到支持。

上面的写法，首先定义了 div 的 position: fixed ，紧接着下面一句 @supports (position:sticky) 则是特性检测括号内的内容，如果当前浏览器支持 @supports 语法，并且支持 position:sticky 语法，那么 div 的 则会被设置为 position:sticky 。

我们可以看到，@supports 语法的核心就在于这一句：@supports (...) { } ，括号内是一个 CSS 表达式，如果浏览器判断括号内的表达式合法，那么接下来就会去渲染括号内的 CSS 表达式。除了这种最常规的用法，还可以配合其他几个关键字：

@supports not && @supports and && @supports or

@supports not -- 非

not 操作符可以放在任何表达式的前面来产生一个新的表达式，新的表达式为原表达式的值的否定。看个例子：

```
@supports not (background: linear-gradient(90deg, red, yellow)) {
    div {
        background: red;
    }
}
```

因为添加了 not 关键字，所以与上面第一个例子相反，这里如果检测到浏览器不支持线性渐变 background: linear-gradient(90deg, red, yellow) 的语法，则将 div 的颜色设置为红色 background: red 。

非常厉害  希望以后 会被实现

```
有意思的console

console.log((!(~+[]) + {})[--[~+""][+[]] * [~+[]] + ~~!+[]] + ({} + [])[[~!+[]] * ~+[]]);
```
