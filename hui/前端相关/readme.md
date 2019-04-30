
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

```
写了一个css阴影的动态效果 然后某些人的电脑出现了字体模糊的效果 

钉一个解决办法

出现原因transform: translate(-50%, -50%)
写上transform：translateZ(0)

或者在发生文字模糊的地方加上transform: translate3d(0,0,0)，解决文字模糊以及的问题。


```

```
说出来你们可能不信 我其实是写了笔记的 还是ts的学习笔记 但是不知道怎么了  他就不见了  初步怀疑是办公室有鬼 偷摸改我代码了 

恩（d(･｀ω´･d*)）认真脸

首先我们用那个啥啥学习法  （忘记了） 反正是一个很牛逼的学习法

1  首先选定一个知识点  （TypeScript）

2 然后假设我们要讲解这个知识点

3 如果我们讲解的过程中出现问题重新回顾一下知识点

4 让你讲的越来越容易懂

OK -------黑喂狗

首先 什么是ts  个人理解就是一个给js提供了很多扩展方法的工具 

官方说法 
JavaScript 的一个超集，扩展了 JavaScript 的语法。
TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。

TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。

那么他多了那些东西呢？

Class类  
接口 Interfaces 
模块 Modules 
类型注解 Type annotations 
(我就看了这么多)

好了  文档看完  还是自己摸有意思

下载  $ npm install -g typescript

然后 我们可以创建一个ts后缀的文件  然后我们可以用 tsc去编译他

例如我们可以 创建一个  xiaohuihui.ts  

然后我们命令行执行 tsc xiaohuihui.ts  

编译成功后 就会在同样的目录下生成一个同名的js文件 

好了基本我们了解了以后  我们开始第一步  hello world

开始写一个index.html  

<!DOCTYPE html> 
<html> 
<head> 
<meta charset="utf-8"> 
<title>TypeScript</title>
</head> 
<body> 
    <script src="hello.js"></script>
</body> 
</html>

然后 我们创建一个hello.ts  里面写一句

console.log('hello world TypeScript!');

编译他 tsc hello.ts

然后我们可以看到console  完美 ok  完结撒花

好吧 现在我们可以编译 并且运行了  那么就可以开始试试那些ts多的方法了 

类型注解

其实就是给传值规定类型 

例如
function Add(left: number, right: number): number {
    return left + right;
}
我给left/right规定他只能传number （其实你传其他也行 只是报WARNING并不会影响你运行 对于我这种从不看WARNING的人简直是一种打击）


第二个

接口 Interfaces 

个人理解 他其实就是把一个对象里面的值都规定了一下类型、、、

写一个Interfaces.ts

interface Shape {
    name: string;
    width: number;
    height: number;
    color?: string;
}
 
function area(shape : Shape) {
    var area = shape.width * shape.height;
    return "I'm " + shape.name + " with area " + area + " cm squared";
}
 
console.log( area( {name: "rectangle", width: 30, height: 15} ) );
console.log( area( {name: "square", width: 30, height: 30, color: "blue"} ) );

然后 把index.html里面引入改成Interfaces.js

看一眼console ok

第三个 

Class类  

不知道是不是因为我一直接触react的原因啊 我一直就是写class 

class XXX extends React.Component emmm

来一个ts类

class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);

注意的是，在构造函数的参数上使用public等同于创建了同名的成员变量。

运行tsc OK


然后 模块 Modules 

这个我一直没看懂 

因为我觉得 他就是把我单独写的ts变成js然后引入了index

但是我们写项目本身一直都是这么做的  我们写react也是编译成js 然后按需加载


```

this指向的一些问题

#首先了解一下函数调用

函数调用三种方法（ES5）：

+ func(p1, p2)
+ obj.child.method(p1, p2)
+ func.call(context, p1, p2) // 先不讲 apply


第三中调用形式才是正确的调用形式，其他两种都是语法糖，可以等价的变换：

```
// 称此代码为「转换代码」
func(p1, p2) 等价于
func.call(undefined, p1, p2)
 
obj.child.method(p1, p2) 等价于
obj.child.method.call(obj.child, p1, p2)
// 第二个等价举例
var obj = {
  foo: function(){
    console.log(this)
  }
}
obj.foo()
// 等价于
obj.foo.call(obj)
```

所以，this 就是你 call 一个函数时，传入的 context。

如果你的函数调用形式不是 call 形式，请按照「转换代码」将其转换为 call 形式。


默认绑定规则：this绑定给window;

在严格模式下，默认绑定规则会把this绑定undefined上；

```
function foo() {
	console.log( this.a );
}
var a = 2;
(function(){
	"use strict";
	foo(); //2
})();

```
> 这里有一个微妙但是非常重要的细节，虽然 this 的绑定规则完全取决于调用位置，但是只有 foo()运行在非 严格模式下时，默认绑定才能绑定到全局对象；	严格模式下调用foo()不会影响默认绑定规则;

```
function foo() {
	"use strict";
	console.log( this.a );
}
var a = 2;
foo(); //undefined
```
> 无论函数是在哪个作用域中被调用,只要是独立调用则就会按默认绑定规则被绑定到全局对象或者undefined上。

##隐式绑定的规则：

this给离函数最近的那个对象；

判断函数调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含；
```
//隐式绑定的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含
//当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象
function foo() {
	console.log( this.a );//2
}
var obj = {
	a: 2,
	foo: foo
};
obj.foo(); //会打印出2
```
> 当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象；
> 对象属性引用链中只有最顶层或者说最后一层会影响调用位置；

```
//对象属性引用链中只有最顶层或者说最后一层会影响调用位置
function foo() {
	console.log( this.a );
}
var obj2 = {
	a: 42,
	foo: foo
};
var obj1 = {
	a: 2,
	obj2: obj2
};
obj1.obj2.foo(); //42
```
##隐式丢失
将函数通过隐式调用的形式赋值给一个变量；
```
注意：经典面试题，这是一个隐式丢失：
function foo() {
	console.log( this.a );//oops, global
}
var a = "oops, global"; 
var obj = {

	a: 2,
	foo: foo
};
var bar = obj.foo; //把obj.foo赋予别名bar，造成了隐式丢失，因为只是把foo()函数赋给了bar，而bar与obj对象则毫无关系
bar(); 

//等价于
var a = "oops, global"; 
var bar = function foo(){
    console.log( this.a );
}
bar();//oops, global
```
将函数通过隐式调用的形式进行传参；
```
var a = 0;
function foo(){
    console.log(this.a);
};
function bar(fn){
    fn();
}
var obj = {
    a : 2,
    foo:foo
}
//把obj.foo当作参数传递给bar函数时，有隐式的函数赋值fn=obj.foo。与上例类似，只是把foo函数赋给了fn，而fn与obj对象则毫无关系。
bar(obj.foo);//0

//等价于
var a = 0;
function bar(fn){
    fn();
}
bar(function foo(){
    console.log(this.a);
});
```
内置函数：内置函数与上例类似，也会造成隐式丢失
```
var a = 0;
function foo(){
    console.log(this.a);
};
var obj = {
    a : 2,
    foo:foo
}
setTimeout(obj.foo,100);//0

//等价于
var a = 0;
setTimeout(function foo(){
    console.log(this.a);
},100);//0
```
##正规/显式绑定：call()、apply()、bind()
通过call()、apply()、bind()方法把对象绑定到this上，是我们常用的绑定方法 我写react就一直用bind(this)。
```
//普通对象的属性查找 
function foo(a,b) {
	console.log( this.a,a,b );
}
var obj = {
	a:2
};
foo.call( obj,"a","b"); //2 a b
foo.apply(obj,["a","b"])//2 a b
```
显式绑定规则：call，apply和bind指定的对象（第一个参数）；
硬绑定：硬绑定是显式绑定的一个变种，使this不能再被修改。它有一个包裹函数，有一个目标函数的显示调用（bind，返回只是一个函数）；可以用来解决隐式丢失。

```
//	我们来看看这个显式绑定变种到底是怎样工作的。我们创建了函数 bar() ，并在它的内部手动调用了 foo.call(obj) ，因此强制把 foo 的 this 绑定到了 obj 。无论之后如何调用函数 bar ，它总会手动在 obj 上调用 foo 。这种绑定是一种显式的强制绑定，因此我们称之为硬绑定。
function foo() {
	console.log( this.a );
}
var a =1;
var obj = {a:2};
var obj_test = {a:"test"};
var bar = function() {
	console.log( this.a );
	foo.call( obj );};
bar(); // 1 2
setTimeout( bar, 1000 ); // 1 2
bar.call( obj_test ); //test  2   
//硬绑定的bar不可能再修改它的this(指的是foo中的this)

//硬绑定的典型应用场景就是创建一个包裹函数，传入所有的参数并返回接收到的所有值
	function foo(arg1,arg2) {
		console.log( this.a,arg1,arg2);
		return this.a + arg1;
	}
	var obj = {a:2};
	var bar = function() {
		return foo.apply( obj, arguments);
	};
	var b = bar(3,2); // 2 3 2
	console.log( b ); // 5
```
##new绑定
```
//3. 这个新对象会绑定到函数调用的 this 。
function foo(a) {
	this.a = a;
}
var bar = new foo(2);
console.log( bar.a ); // 2		
//使用 new 来调用 foo(..) 时，我们会构造一个新对象并把它绑定到 foo(..) 调用中的 this 上。 new 是最
//后一种可以影响函数调用时 this 绑定行为的方法，我们称之为 new 绑定。	
```
###箭头函数
- 箭头函数：this的绑定和作用域有关。如果在当前的箭头函数作用域中找不到变量，就向上一级作用域里去找。
- 箭头函数内部的 this 是词法作用域，由上下文确定，此作用域称作 Lexical this ，在代码运行前就可以确定。没有其他大佬可以覆盖。
- 这样的好处就是方便让回调函数的this使用当前的作用域，不怕引起混淆。所以对于箭头函数，只要看它在哪里创建的就行。

```
function foo() {
	 setTimeout(() => {
	    console.log('id:', this.id); //id: 42
	  }, 100);
}
var id = 21;
foo.call({ id: 42 })

// 再举个栗子
var returnThis = () => this
returnThis() // window
new returnThis() // TypeError
var boss1 = {
  name: 'boss1',
  returnThis () {
    var func = () => this
    return func()
  }
}
returnThis.call(boss1) // still window
var boss1returnThis = returnThis.bind(boss1)
boss1returnThis() // still window
boss1.returnThis() // boss1
var boss2 = {
  name: 'boss2',
  returnThis: boss1.returnThis
}
boss2.returnThis() // boss2
```









