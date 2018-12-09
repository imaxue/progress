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