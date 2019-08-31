
## 基本示例
```html
<div class="wrapper">
  <div class="one">One</div>
  <div class="two">Two</div>
  <div class="three">Three</div>
  <div class="four">Four</div>
  <div class="five">Five</div>
  <div class="six">Six</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
.item {
  background: tan;
  opacity: 0.8;
}
.one {
  grid-column: 1 / 3;
  grid-row: 1;
}
.two { 
  grid-column: 2 / 4;
  grid-row: 1 / 3;
}
.three {
  grid-row: 2 / 5;
  grid-column: 1;
}
.four {
  grid-column: 3;
  grid-row: 3;
}
.five {
  grid-column: 2;
  grid-row: 4;
}
.six {
  grid-column: 3;
  grid-row: 4;
}
```
效果如下
![](http://cdn.imaxue.com/2019-06-29-082020.png)

### 下面来解释代码中出现的相关属性的含义：

`grid-template-columns` 属性用来设置表格有几列，以及每列的宽度，比如下面代码表示表格有三列，每列100px：
```css
grid-template-columns: 100px 100px 100px;
```
效果如下
![](http://cdn.imaxue.com/2019-06-29-134903.png)

当然也可以给每列设置不同的宽度，比如：
```css
grid-template-columns: 100px 150px 200px
```
效果如下：
![](http://cdn.imaxue.com/2019-06-29-134646.png)

`repeat()`是一种缩写方式，本质就是为了减少我们重复书写多个值的问题。
像下面的代码
```css
grid-template-columns: 100px 100px 100px;
```
就可以使用`repeat()`简写为:
```css
grid-template-columns: repeat(3, 100px);
```
并且`repeat()`还可以重复多个不同值
```css
grid-template-columns: repeat(2, 100px 50px);
```

`fr`单位：表示按什么比例平分剩余空间
举个栗子：
```css
grid-template-columns: repeat(3, 1fr);
```
上面的代码就表示网格一共有三列，每列的宽度都是`1fr`，这样的话，就相当于这三列的宽度相同。

当然这也并不能看出`fr`属性的好处，那想象一下我们要实现一个这样的布局：*左侧是一个固定宽度200px的菜单，右侧三列平分剩余空间*，

当然你可能有很多方式来完成这个需求，但是我觉得一定不会像这样这么简单：
```css
grid-template-columns: 200px repeat(3, 1fr);
```

`grid-auto-rows` 属性用来设置表格每行的高度, 用法和`grid-template-columns`比较相似

`grid-gap`和 `grid-row-gap`用来设置列之间的间距和行之间的间距

要定位和调整 items(子元素) 大小，我们将使用 `grid-column` 和 `grid-row` 属性来设置：

```css
grid-column: 1 / 4;
```
第一条网格线开始，到第四条网格线结束。换句话说，它将独立占据整行。 以下是在屏幕上显示的内容：
![](http://cdn.imaxue.com/2019-06-29-143340.jpg)

