# 使用渐变来做
```js
<!-- html 部分  -->
<div class="bd-t"></div>
//css3部分
.bd-t{
    position:relative;
 }
.bd-t::after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(0deg, transparent 50%, #e0e0e0 50%);
 }
 对于不同浏览器的兼容，我们需要使用不同的前缀如：
-webkit-linear-gradient 
-ms-linear-gradient 
-o-linear-gradient
```
# 使用缩放
```js
<!-- html 部分  -->
<div class="bd-t"></div>

/* css部分  */
.bd-t{
    position:relative;
 }
 .bd-t:after{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: #e0e0e0;
    /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
    -webkit-transform: scaleY(.5);
    transform:scaleY(.5);
 }

```
# 使用background-image和css3的九宫格裁减
```js
<div class="bd-t"></div>
.bd-t{ position: relative; } 
.bd-t::after { 
    content: " "; 
    position: absolute; 
    left: 0; 
    top: 0; 
    width: 100%; 
    border-top: 1px solid transparent; /* 下面用 stretch 和 round 都可以 */ 
    border-image: url('pic.png') 2 1 1 1 stretch; 
    -webkit-border-image: url('pic.png') 2 1 1 1 stretch;
 }
```
# weui的实现方式 
```js
.weui-cell:before{ 
    content: " "; 
    position: absolute; 
    left: 0; top: 0; 
    right: 0; 
    height: 1px; 
    border-top: 1px solid #D9D9D9; 
    color: #D9D9D9; 
    -webkit-transform-origin: 0 0; 
    transform-origin: 0 0; 
    -webkit-transform: scaleY(0.5); 
    transform: scaleY(0.5); 
}
```
