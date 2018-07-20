## 1.下载  html2canvas.js 
## 2.引入插件
```js
<script type="text/javascript" src="js/html2canvas.js"></script>
<script type="text/javascript" src="js/jquery2.2.4.min.js"></script> //基于jq的，所以需要引入jq
```
## 3.页面事件
```js
<div class="pageTwo">
    <!--  要截图的区域，因为是动态生成的答案， 所以写入了js -->
    <div class="con01" id="con"></div> 
    
    <!--截图生成图片所存放的url-->   
    <img id="screenShotImg" class="pic">
    <!--  截图按钮  -->
    <img src="img/share_press.png" class="share" /> 
    <p class="share_txt">长按保存，分享朋友圈引爆颜值暗战！</p>
</div>
```
## 4.h2canvas核心操作
```js
<script type="text/javascript">

    $(document).ready(function () {

        document.querySelector('.share').onclick = function(){   

                  html2canvas(document.querySelector("#con")).then(function (canvas) {

                  //获取截取图片路径

                  var base64Url = canvas.toDataURL('image/png');

                  //存入页面指定位置

                  document.getElementById("screenShotImg").src = base64Url;

                  //后台操作处理

                  var base64 = "<img src=" + base64Url + " />"

                  $('.share').css('display','none');

                  $('.share_txt').css('display','block');

               });

        }

    });

</script>
```
