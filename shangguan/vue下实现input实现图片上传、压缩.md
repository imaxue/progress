###### 目前保存图片的两种方式：
- 1.保存对应图片的url，而实际的图片资源会放在阿里等图片服务器上
- 2.在自己的数据库中保存图片base64格式的字符串


首先，我们先要从用户那里获取图片资源，这个时候，我们需要用到html的<input>标签，type值为file,指定input标签为文件类型的表单输入，并将其 accept属性设置为"image/*",指定只接受图片资源的文件；

```
<input type="file" accept="image/*" />
```

接下来，我们就要获取用户选择的文件，当用户选择完文件的时候，就会触发input标签的change事件，我们可以通过监听该事件，并获取事件对象event，来获取图片文件：

```
<input accept="image/*" style="display: none;" :name="'img-'+index" type="file" :id="'img-'+index"
  @change="fileChange($event,index)"/>
```
当点击获取文件后，我们可以通过event对象，获取event.target.files[0]来获取图片资源文件对象，至于为什么要加索引值，是因为文件上传input表单是支持多文件上传的，只需要在input标签上增加multiple属性。文件对象中存在一个size属性，表明图片的大小，我们可以通过验证该属性的值是否为空，来达到检验文件是否已经被我们获取到指定操作；
```
fileChange(el, index) {
    if (!el.target.files[0].size) return;
}
```
至此，我们已经获取到我们想要的文件对象。

##### 图片压缩
第一步获取图片资源，获取后对其简单的校验；

```
compress(event) {
        var file = event.target.files;
        var reader = new FileReader(), imgFile = file[0];
        if (imgFile.type.indexOf('image') == 0) {
          reader.readAsDataURL(imgFile);
        } else {
          this.$Message.infor('文件类型仅为图片')
        }
 }
```
FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据，这里我们主要是用于监听onload来判断是否读取完成，读取完成时，我们把读取的结果赋值给我们新创建的Image对象，作为后面压缩的对象；这是时候，我们会发现，我们读取后的结果其实是一个base64格式的字符串。

base64的字符串在这里就出现了，它可以作为一个值复制给<img>标签的src属性，同样可以达到渲染图片的目标，因此也有人选择保存该格式的图片；但是着并非主流的方式，同时也会造成我们数据库过于冗余；

```
 compress(event) {
        var file = event.target.files;
        var reader = new FileReader(), imgFile = file[0];
        if (imgFile.type.indexOf('image') == 0) {
          reader.readAsDataURL(imgFile);
        } else {
          this.$Message.infor('文件类型仅为图片')
        }
        let img = new Image();
        reader.onload = function (e) {
          img.src = e.target.result;
        };
 }
```
图片进行压缩，主要是利用canvas是实现该功能，通过canvas.getContext('2d').drawImage()方法重新绘制图片，并利用canvas.toDataURL(type, encoderOptions)方法返回一个包含图片展示的 dataURI，type为图片格式，encoderOptions为图片的清晰度，0到1递增，这个压缩的过程不难理解，思路就是获取图片的高宽，计算其像素大小，并与以一个自己设定的界限值进行比较，来看一下我们大小是否需要压缩，如例子中的ratio表示图片宽高的压缩比例 ，我们是可以实现不改宽高来修改图片的文件大小，通过drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)重新绘制图片，他可以传进九个参数,分别代表着绘制到上下文的元素，源图像的矩形选择框的左上角 X 坐标，源图像的矩形选择框的左上角 Y 坐标，源图像的矩形选择框的宽度，源图像的矩形选择框的高度，目标画布的左上角在目标canvas上 X 轴的位置，目标画布的左上角在目标canvas上 Y 轴的位置，在目标画布上绘制图像的宽度，在目标画布上绘制图像的高度；

整个函数实现如下：

```
compress(event) {
        var file = event.target.files;
        var reader = new FileReader(), imgFile = file[0];
        if (imgFile.type.indexOf('image') == 0) {
          reader.readAsDataURL(imgFile);
        } else {
          this.$Message.infor('文件类型仅为图片')
        }
        let img = new Image();
        reader.onload = function (e) {
          img.src = e.target.result;
        };
        var imgP = new Promise((resolve, reject) => {
          img.onload = () => {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext('2d');
            //    瓦片canvas
            var tCanvas = document.createElement("canvas");
            var tctx = tCanvas.getContext("2d");
            var initSize = img.src.length;
            var width = img.width;
            var height = img.height;
            //图片像素大于400万像素，计算压缩到400万以下
            var ratio;
            if ((ratio = width * height / 4000000) > 1) {
              ratio = Math.sqrt(ratio);
              width /= ratio;
              height /= ratio;
            } else {
              ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片太大则使用瓦片绘制
            var count;
            if ((count = width * height / 1000000 > 1)) {
              count = ~~(Math.sqrt(count) + 1);//计算分成的瓦片数
              var nw = ~~(width / count);
              var nh = ~~(height / count);
              tCanvas.width = nw;
              tCanvas.height = nh;
              for (var i = 0; i < count; i++) {
                for (var j = 0; j < count; j++) {
                  tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                  ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
                }
              }
            } else {
              ctx.drawImage(img, 0, 0, width, height)
            }
            //进行最小压缩
            var ndata = canvas.toDataURL('image/jpeg', 0.3);
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            resolve(ndata)
          }
        })
        return Promise.all([imgP])
      }
```
