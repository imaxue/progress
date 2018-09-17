###### 1.absolute + 负margin
- tip: 居中元素的宽高必须固定
```
.parent {
    position: relative;
}
.son {
    position: absolute;;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
```
###### 2.absolute + margin auto
通过设置各个方向的距离都是0，此时再讲margin设为auto，就可以在各个方向上居中了
- tip: 居中元素的宽高必须固定
```
.parent {
    position: relative;
}
.son {
    position: absolute;;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```
###### 3.absolute + calc
- tip1: 居中元素的宽高必须固定
- tip2: 兼容性依赖calc的兼容性
```
.parent {
    position: relative;
}
.son {
    position: absolute;;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
}
```
###### 4.absolute + transform
1. 兼容性依赖translate2d的兼容性
```
.parent {
    position: relative;
}
.son {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```
###### 5.lineheight
利用行内元素居中属性也可以做到水平垂直居中
- tip: 这种方法需要在子元素中将文字显示重置为想要的效果
```
.parent {
    line-height: 300px;
    text-align: center;
    font-size: 0px;
}
.son {
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    line-height: initial;
    text-align: left; /* 修正文字 */
}
```
###### 6.writing-mode
writing-mode可以改变文字的显示方向，比如可以通过writing-mode让文字的显示变为垂直方向

更神奇的是所有水平方向上的css属性，都会变为垂直方向上的属性，比如text-align，通过writing-mode和text-align就可以做到水平和垂直方向的居中了，只不过要稍微麻烦一点
```
<div class="parent">
    <div class="parent-inner">
        <div class="son">123123</div>
    </div>
</div>
.parent {
    writing-mode: vertical-lr;
    text-align: center;
}
.parent-inner {
    writing-mode: horizontal-tb;
    display: inline-block;
    text-align: center;
    width: 100%;
}
.son {
    display: inline-block;
    margin: auto;
    text-align: left;
}
```
###### 7.table
tabel单元格中的内容天然就是垂直居中的，只要添加一个水平居中属性就好了
```
<table>
    <tbody>
        <tr>
            <td class="parent">
                <div class="son">123123</div>
            </td>
        </tr>
    </tbody>
</table>
.parent {
    text-align: center;
}
.son {
    display: inline-block;
}
```
###### 8.css-table
css新增的table属性，可以让我们把普通元素，变为table元素的现实效果，通过这个特性也可以实现水平垂直居中
```
<div class="parent">
    <div class="son">123123</div>
</div>
.parent {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.son {
    display: inline-block;
}
```
###### 9.flex
- tip:目前在移动端已经完全可以使用flex了，PC端需要看自己业务的兼容性情况
```
<div class="parent">
    <div class="son">123123</div>
</div>
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```
###### 10.grid
- tip:兼容性不如flex，不推荐使用
```
<div class="parent">
    <div class="son">123123</div>
</div>
.parent {
    display: grid;
}
.son {
    align-self: center;
    justify-self: center;
}
```