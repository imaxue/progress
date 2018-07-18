### CSS3之多列布局columns详解

前段时间用css3的多列布局实现了瀑布流列表

特别注意：使用这个特性的不好一点是，列表是按照先渲染左边的列，再渲染右边的列，导致的效果是顺序会打乱

CSS3提供了个新属性columns用于多列布局。
基本属性如下：

1. columns: <'column-width'> || <'column-count'>
设置对象的列数和每列的宽度。复合属性。

```
/*列数及列宽固定*/
-moz-columns: 200px 3;
-webkit-columns: 200px 3;
columns: 200px 3;

/*列宽固定，根据容器宽度液态分布列数*/
-moz-columns: 200px;
-webkit-columns: 200px;
columns: 200px;
```

2. column-width：<length> | auto 设置对象的宽度；使用像素表示。
auto：根据 <' column-count '> 自定分配宽度

```
/*列宽固定，根据容器宽度液态分布列数*/
-moz-column-width: 200px;
-webkit-column-width: 200px;
column-width: 200px;

```

3. column-count：<integer> | auto 用来定义对象中的列数，使用数字 1-10表示。
auto：根据 <' column-width '> 自定分配宽度
```
/*列数固定，根据容器宽度液态分布列宽*/
-moz-column-count:5;
-webkit-column-count:5;
column-count:5;
```
4. column-gap: normal || length， normal是默认值，为1em， length 是用来设置列与列之间的间距。
```
/* 固定列间隙为40px */
-moz-column-gap: 40px;
-webkit-column-gap: 40px;
column-gap: 40px;

/* 列间隙column-gap: normal；font-size为14px时，列间隙column-gap:normal的计算值也为14px */
-moz-column-gap: normal;
-webkit-column-gap: normal;
column-gap: normal;
```
5. column-rule：<' column-rule-width '> || <' column-rule-style '> || <' column-rule-color '>
设置对象的列与列之间的边框。复合属性
```
/* 在列与列之间设置绿色间隔线 */
-moz-column-rule: 10px solid #090;
-webkit-column-rule: 10px solid #090;
column-rule: 10px solid #090;
```
6. column-fill：auto | balance
设置对象所有列的高度是否统一;
auto： 列高度自适应内容;
balance： 所有列的高度以其中最高的一列统一

7. column-break-before：auto | always | avoid | left | right | page | column | avoid-page | avoid-column
设置对象之前是否断行;
auto： 既不强迫也不禁止在元素之前断行并产生新列;
always： 总是在元素之前断行并产生新列
avoid：避免在元素之前断行并产生新列

8. column-break-after：auto | always | avoid | left | right | page | column | avoid-page | avoid-column
设置对象之后是否断行

9. column-break-inside：auto | avoid | avoid-page | avoid-column
设置对象内部是否断行;
auto：既不强迫也不禁止在元素内部断行并产生新列;
avoid：避免在元素内部断行并产生新列

column-span: none（默认值）|| all，none是不跨越任何列。all 是元素跨越所有列，并定位在列的Z轴之上。

浏览器支持：

Internet Explorer 10+ 和 Opera 支持 column-width 属性。
Firefox 支持替代的 -moz-column-width 属性。
Safari 和 Chrome 支持替代的 -webkit-column-width 属性。
注释：Internet Explorer 9 以及更早版本的浏览器不支持 column-width 属性。

下面使用column实现一个瀑布流布局的demo如下：

先预览看效果

碰到的问题如下：
1. 在做demo的时候，需要显示内容的div设置高度为100% 和 overflow: auto; 否则的话，多列样式column-width布局时内容被截断、错乱。
比如上面的demo的样式添加如下代码：

.item {
  height: 100%;
  overflow: auto;
}
下面是html代码如下：

```
<!DOCTYPE html>
 <html>
    <head>
        <meta charset="utf-8">
        <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
        <meta content="yes" name="apple-mobile-web-app-capable">
        <meta content="black" name="apple-mobile-web-app-status-bar-style">
        <meta content="telephone=no" name="format-detection">
        <meta content="email=no" name="format-detection">
        <title>标题</title>
        <link rel="shortcut icon" href="/favicon.ico">
        <link href="./index.css" rel="stylesheet"/>
    </head>
    <body>
      <div class="container">
        <div class="waterfall">
          <div class="item">
            <img src="http://dummyimage.com/640x4:3" />
            <p>我来测试demo111111</p>
          </div>
          <div class="item">我来测试demo2222</div>
          <div class="item">
            <img src="http://dummyimage.com/640x3:4" />
            <p>我来测试demo3333</p>
          </div>
          <div class="item">
            <img src="http://dummyimage.com/480x4:3" />
            <p>我来测试demo4444</p>
          </div>
          <div class="item">
            <img src="http://dummyimage.com/480x4:3" />
            <p>我来测试demo5555</p>
          </div>
          <div class="item">
            <img src="http://dummyimage.com/480x3:4" />
            <p>我来测试demo6666</p>
          </div>
          <div class="item">
            <img src="http://dummyimage.com/640x21:10" />
            <p>我来测试demo7777</p>
          </div>
          <div class="item">
            <p>我来测试demo8888</p>
          </div>
          
        </div>
      </div>
    </body>
</html>
```
CSS代码如下：

```
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 96%;
  margin: 20px auto 20px;
}
.waterfall {
  column-count: 2;
  -webkit-column-count: 2;
  -moz-column-count: 2;
  -ms-column-count: 2;
  -o-column-count: 2;

  column-gap: 15px;
  -webkit-column-gap: 15px;
  -moz-column-gap: 15px;
  -ms-column-gap: 15px;
  -o-column-gap: 15px;

}
.item {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  padding: 1em;
  background-color: white;
  border: 1px solid #ccc;

  border-radius: 4px;
  -webkit-border-radius: 4px;

  /* 设置上下间距 */
  margin-bottom: 10px;

  /*  需要设置 height: 100%; overflow: auto */
  height: 100%;
  overflow: auto;
}
.item img {
  width: 100%;
  padding-bottom: 1em;
  margin-bottom: 0.5em;
  border-bottom: 1px solid #cccccc;
}
```
