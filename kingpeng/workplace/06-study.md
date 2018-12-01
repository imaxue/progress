# css裁剪图片

## 一、裁剪图片

### 1、css图片居中剪切，避免图片变形

给图片设置宽高

加入object-fit: cover;这行代码

例如：

```

.panorama li img{
     display: block;
     width:100%;
     height: 6.917rem;  // height: 100%;
     object-fit: cover;
}

```

### 2、简单粗暴的方式

父盒子样式：

```

div {

    overflow: hidden;
    display: flex;
     align-items: center;
     position: relative;

    img {
          maxHeight: 100%;
          maxWidth: 100%;
          margin: auto;
     }

}

<div key={'childs_' + index} style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', position: 'relative' }}>
    <img style={{ maxHeight: '100%', maxWidth: '100%', margin: 'auto' }} src='' alt="" />
</div>

```

### 3、居中裁剪：等比例不失真

**推荐这个**

```

.imgCss {
    height: 5rem;     // 固定高度裁剪，给父盒子高度
    overflow: hidden;

    > img {
    width: 100%;    // 宽度填充
    display: block; // 兼容底部的间隙
    position: relative; // 裁剪图片
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    transform: translateY(-50%);
    }
}

<div className={styles.imgCss}>
    <img src={item && item.smallUrl !== '' ? item.smallUrl.replace('.webp', '') : ''} alt="" />
</div>

```

### 4、给图片一定的尺寸裁剪

#### a、图片是长大于宽的，为了保证图片看起来不被压缩，可以固定宽度，从图片中间向左右两侧裁剪以保留图片的核心内容

```

img  {
    height: 100%;
    width: auto;
    left:50%;
    position: relative;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
}
.cover  {
    margin:100px auto;
    width: 400px;
    height: 400px;
    overflow: hidden;
    border: 1px solid cornflowerblue;
    position: relative;
}

<div class="cover">
    <img src="img/cover.jpg"/>
</div>

```

#### b、若原始图片大小为683*984，即长小于宽，为了保证图片看起来不被压缩，可以固定长度，从图片中间向上下两端裁剪以保留图片的核心内容

```

img
{
    width: 100%;
    height: auto;
    top:50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    position: relative;
}

```

#### c、网站背景图片符合响应式布局，从台式机到手机，显示面积变小，从中间向四周截取部分作为背景显示。

```

.jumbotron   {
    padding: 0;
    background-image: url(../img/cover.jpg);
    background-position: center center; 
}

```

## 二、获取图片原始尺寸

### 1、react中使用

```
componmentDidMount() {
  this.loadImgHeight()
}

loadImgHeight() {
    const { resImg } = this.props as any
    if (!resImg || !Array.isArray(resImg.childs)) return
    const ImgFirst = resImg.childs[0]
    if (JSON.stringify(ImgFirst) !== '{}') {
      const img_url = ImgFirst.url || ''
      // 创建对象
      const img = new Image() 
      // 改变图片的src
      img.src = img_url;
      // 加载完成执行 
      const _this = this
      img.onload = function() {    
          // alert('width:'+img.width+',height:'+img.height) 
          if (img.height > 720) {
            // console.log(this) 
            _this.setState({ IsColumImg: true })
          }

      }
    }
  }
  
```

### 2、获取图片的真实宽高

获取图片高度：jq用的是height()

获取图片宽度：jq用的是width()

**注意：这个是渲染后的宽高，也就是css设置后的宽高

javascript是： offsetWidth offsetHeight

同样，这个也是浏览器渲染后的大小

那如果我想获取图片原本的大小呢？

这个时候就需要用到Image对象了

```

var img_url ='mid/01.jpg';    
// 创建对象    
var img = new Image();    
// 改变图片的src    
img.src = img_url;    
// 加载完成执行    
img.onload = function(){    
    // 打印    
    alert('width:'+img.width+',height:'+img.height);    
}

现在我们知道Image可以获取到图片原本的宽高

```

### 3、[获取图片实际渲染的宽度、高度与图片原始的宽度和高度](https://www.cnblogs.com/jf-67/p/7798544.html)

  在写页面时经常会遇到需要获取图片的宽度、高度等情况。然而以前总是获取的是图片实际渲染的宽度和高度，也就是你用css或js设置后的图片的宽度和高度，
  
  并不是图片原始的尺寸。今天突然遇到这个问题，一时之间不知如何做，查了下资料，自己摸索了一下。特此总结一下。

　例如。有这样一张图片，代码如下：　　
 
 ```
  <img src="创建ajax的过程.png" alt="" >
 ```
#### A、获取图片渲染的宽度和高度(可用js或jQuery实现)。

　（1）、使用js获取图片实际渲染的宽度、高度。

　　这里也有两种方式:

　　一种是： document.getElementsByTagName("img")[0].width // 获取实际渲染宽度  document.getElementsByTagName("img")[0].height // 获取实际渲染高度

　　另一种： document.getElementsByTagName("img")[0].offsetWidth // 获取实际渲染宽度 document.getElementsByTagName("img")[0].offsetHeight // 获取实际渲染高度

　　（2）、使用jQuery·获取图片实际渲染宽度和高度。

　　 $("img").width()  // 获取实际渲染宽度  

　　 $("img").height()  // 获取实际渲染高度

　　
　　然而当我们通过css或者js重新设置了图片的宽度和高度后，再用上述方法并不能获取图片的原始尺寸，它获取的是图片实际渲染的宽度和高度，为了达到目的，我们需要使用下面这种方法。

#### B、获取图片原始的尺寸，也就是无论你是否用css、js设置过图片的宽度、高度，始终获取的是图片的原始尺寸。

　　HTML5提供了新属性naturalWidth/naturalHeight可以直接获取图片的原始宽、高，这两个属性在Firefox/Chrome/Safari/Opera及IE9+里已经实现。

　　直接就是 document.getElementsByTagName("img")[0].naturalWidth   document.getElementsByTagName("img")[0].naturalHeight 

　　由于该属性对于IE8及以下不支持，所以这里需要做一个兼容性处理。

　　html代码：
```
    <img src="完整的http请求过程.png" alt="" style="width:400px" id="img">
 
```
　　js代码为：

```

　　<script>
        // 获取图片原始尺寸的兼容性写法。
        window.onload = function(){
            function getNaturalSize (img) {
　　　　　　　　　if(window.naturalWidth && window.naturalHeight) {
                    naturalWidth = img.naturalWidth; 
                } else {   // 兼容IE8及以下版本
                    var image = new Image();
                    image.src = img.src;
                    var naturalWidth = image.width;
                }
                return naturalWidth;
            }
            var natural = document.getElementById('img');
            alert(getNaturalSize (natural));
        }
    </script>
    
```

　　**注意IE6/7/8的处理，创建了一个新的img，仅设置其src，这时需要让图片完全载入后才可以获取其宽高。**













