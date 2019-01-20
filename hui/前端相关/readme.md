
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

最近发现了一个以前没有注意的小玩意  当我本机请求后台服务器的时候  产生了跨域  后台要求的是 请求方法是PUT Content-Type 是 json 然后我就发现 我调试不通  

浏览器自动认为这是一个非简单请求 自动发送了一个OPTIONS 做嗅探 后台虽然能接收到我发送的值 我也能console 出res 但是 浏览器上 不会显示任何东西 而且他会发送第二次请求  第二次请求才是真正的请求 

当然这种情况 以前没有出现 是因为我一直都是moke的数据 上线也是直接打包 发给后台 后台把前端包和自己的代码 一起部署上去 就不存在跨域问题所以一直没发现 

这个问题当时我查看了 阮一峰的博客 http://www.ruanyifeng.com/blog/2016/04/cors.html 说设置Access-Control-Max-Age一个缓存时间就不会有问题  但是Chrome浏览器 对于这个设定是有BUG的

 即使Access-Control-Max-Age设置为600，下次请求时依然会发送options请求，此bug在2012年被提出，但至今未修复。具体见 https://bugs.chromium.org/p/chromium/issues/detail?id=131368

 但是Firefox 不会有问题 当然 前后台 联调一下 这个问题也不算什么问题

 心情不好 随便写点


```
将彻底屏蔽鼠标右键，无右键菜单

<body oncontextmenu=window.event.returnvalue=false>


取消选取、防止复制

<body onselectstart=return false>


不准粘贴

<body onpaste=return false>


防止复制

<body oncopy=return false; oncut=return false;>
```


```
I don't know what to write

I am very tired

```


```
发现一个特别有意思的 弹幕实现技术

https://juejin.im/post/5be54a286fb9a049ae07641b  


主要是使用canvas 

```

```
首先 写一段tag 打包上传的错误代码

#!/bin/bash
set -e

read -p "Enter Version [major,minor,patch or version number]:" verb
verb=${verb:-"patch"}
#npm publish
cver=`npm version $verb`
#git tag cver
cver=${cver:1}
#git tag v${cver}

npm run buildUC

curl -v -F r=releases \
        -F hasPom=false \
        -F g=com.blueocn.tps-ui \
        -F a=ent-usersystem \
        -F v=${cver} \
        -F p=zip \
        -F file="@latest.zip" \
        -u admin:oneAPM123 \
        http://10.128.7.197:8081/nexus/service/local/artifact/maven/content
#cd ..
git push origin --follow-tags
git push origin v${cver}


上面这段代码 用的时候会出现两个错误 第一个 会出现tag版本一直报错已存在
原因是 git tag v${cver} 他先一步创建了tag版本

第二个  最下面的 push 没法执行  因为cd ..
注释这两句 就好了
```

```
有意思的代码  如何让下式成立
if(a == 1 && a == 2 && a == 3){
    console.log("我走进来了");
}

<!--答案1:-->
var a = {num:0};
a.valueOf = function(){
    return ++a.num
}

<!--答案2：-->
var num = 1;
function a(){
    return num++;
}
if(a() == 1 && a() == 2 && a() == 3){
    console.log("我走进来了");
}

<!--答案3:-->

var num = 0;
Function.prototype.toString = function(){
	return ++num;
}
function a(){}

<!--答案4:-->
var  a = {[Symbol.toPrimitive]: ((i) => () => ++i) (0)};
```

```
1楼防止班长偷窥

2楼开始写代码

<input
	type="number"
	max={100}
	min={0}
	name="visitCollectRatio"
	value={this.state.settings.visitCollectRatio}
	className="form-control"
	onChange={this.onChangeHandler.bind(this, "visitCollectRatio")} />{__('%')}


onChangeHandler(attr, event) {
    let eventType = event.target.type, settings = _.clone(this.state.settings);

    if (eventType === "number") {
      // const value = _.parseInt(event.target.value);
      const value = event.target.value.replace(/^0/g, '')
      if ((attr === "actionCollectRatio" || attr === "visitCollectRatio") && (value > 100 || value < 0)) {
        Warning("只能输入0到100之间的数据");
      } else if (attr === "blockActivityThreshold" && value < 500) {
        Warning("卡顿阈值不得小于 500 ms");
      } else {
		// if(_.isNaN(value)){	
        if (value === '') {
          settings[attr] = 0;
        } else {
          settings[attr] = value;
        }
      }
    } else if (eventType === "checkbox") {
      settings[attr] = event.target.checked;
    }

    if (!_.isEqual(settings, this.state.settings)) {
      this.setState({
        settings: settings
      });
    }
  }

一段简单的代码  但是在我修改前 用户界面会出现 输入框 032 这种现象 但是我注入的value 和 setState的值 却是32 不清楚什么原因  
后来我就改成了一开始我不进行parseInt保留用户输入的值 然后只是去判断是否为空 这样确实不会出现 032这种现象 但是 settings的值就变成了 字符串的数字 就像这样  visitCollectRatio:'32' 所以 前端的解决办法是在发送请求的时候再一次进行一次parseInt 后台的解决办法就是 要他接受我字符串的数字 他进行一次转化



```


```
1楼给班长看

2楼开始撸代码 


写一个简单的继承方法  现场原因  我司有一个公共组件库 公共组件内右一个组件判断有问题 于是我要重写这个方法


import '../../styles/modules/dashBoard.css'
import React, {Component} from 'react'
import {bindStores} from '../provider'
import TimeStore from '../../stores/TimeStore'

import {Select, Modal} from 'one-ui'
import {Success, Warning, Info} from '../../publicComponents/Notify'

// import {fetchaddwidgets, fetchGetallDashboard, fetchaddDashboard} from '../../actions/midashboard'

import $ from 'jquery';
import { setTimeout } from 'timers';

class Selectchange extends Select {
  constructor(props){
    super(props);
    this.state = {
      ...this.props
    };
  }
  fireChangeEvent(newState) {
    if (this.props.onChange) {
      this.props.onChange(this.props.multi ? newState.values : newState.values[0]);
    }
  }
}

就是Select组件内的fireChangeEvent方法 写一个例子 方便以后查阅


```


```
首先推荐一款react 多行文本省略组件text-ellipsis

然后推荐一款 vue tooltips 插件 v-tooltip

然后我不想写了  但是我怕班长骂我 还有廖神 不过廖神最近抑郁了

一个很好的公共组件


export class NoticeContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notices: _notices
    }
    this._onChange = this._onChange.bind(this)
  }
  _onChange(){
    this.setState({
      notices: _notices
    })
  }
  componentDidMount(){
    noticeStore.addChangeListener(this._onChange)
  }
  componentWillUnmount(){
    noticeStore.removeChangeListener(this._onChange)
  }
  close(notice){

  }
  render(){
    return (
      <div className="notice-list" style={{zIndex: 9999}}>
        <ul>
          {
            this.state.notices.map(function(notice){
              return (
                <Notice
                  ref={notice.$id}
                  key={notice.$id}
                  id={notice.$id}
                  autoClose={notice.autoClose}
                  noticeType={notice.noticeType}
                >
                  {notice.children}
                </Notice>
              )
            }, this)
          }
        </ul>
      </div>
    )
  }
}
class Notice extends React.Component{
  constructor(props){
    super(props);
    this.close = this.close.bind(this)
  }
  close(){
    if(this.timer){
      clearTimeout(this.timer)
    }
    if(this.animating){
      return ;
    }
    var id = this.props.id;
    this.animating = true
    $(this.refs.root).fadeOut(function(){
      this.animating = false
      noticeStore.remove(id)
    })
  }
  componentDidMount(){
    var _this = this
    if(this.props.autoClose){
      this.timer = setTimeout(function(){
        _this.close()
      }, 3 * 1000)
    }
  }
  componentWillUnmount(){
    if(this.timer){
      clearTimeout(this.timer)
    }
  }
  render(){
    var noticeType;
    switch(this.props.noticeType){
    case 'success':
      noticeType = 'notice-success';
      break;
    case 'info':
      noticeType = 'notice-info';
      break;
    case 'warning':
      noticeType = 'notice-warning';
      break;
    case 'error':
      noticeType = 'notice-error';
      break;
    default:
      break;
    }
    return (
      <li ref="root">
        <div className={cx('notice', noticeType)}>
          <a className="iconfont close" href="javascript:;" onClick={this.close}>&#xe64a;</a>
          <div className="notice-inner">
            {_.isFunction(this.props.children) ? this.props.children(this) : this.props.children}
          </div>
        </div>
      </li>
    )
  }
}


alert 弹窗

```

```
写一个始终保持全屏的样式


onWindowResize(){
	const initWindowWidth = 1920;
	const initWindowHeight = 1080;
	const curWindowWidth =  document.body.clientWidth;
	const curWindowHeight = document.body.clientHeight;

	const scaleX = curWindowWidth/initWindowWidth;
	const scaleY = curWindowHeight/initWindowHeight;
	document.querySelector("youid").style.transform = 'scale('+scleX+','+scaleY+')'；

}


组件加载的时候

this.onWindowResize();
window.addEventListener('resize',()=>{
	this.onWindowResize()
})




```

```
出现场景  现在需要紧急发版 基于上一个版本添加一个小功能  但是这个版本的开发的都不要上线 
利用git tag 

首先查找git tag 查找上一个tag号
然后git checkout -b mi-ui-5.4.6.6 tags/mi-ui-5.4.6.6   创建切换到以tag版本号为主的新分支

然后添加新功能 照常开发 照常push 发版


```

```
一个 把对象转化成url挂载参数的方法

mapOBJ(obj){
    var geturl = '?';
    if(typeof(obj) === 'undefined' || obj == null || typeof(obj) !== 'object'){
      return '';
    }else{
      Object.keys(obj).forEach(function(key){
        geturl += `${key}=${obj[key]}&`;
      });
    }
    return geturl.substr(0, geturl.length - 1);
  }

```

```
移动端适配 怒抄之

1.先设置header里面的meta标签：

<meta name="viewport" content="initial-scale=1,maximum-scale=1, minimum-scale=1">

2.在header写上<script>标签


 <script type="text/javascript">
 　　document.documentElement.style.fontSize = document.documentElement.clientWidth / 640*100 + 'px';
 </script>

640是设计稿的宽度  

```








