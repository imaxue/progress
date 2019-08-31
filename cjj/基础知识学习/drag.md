# drag
## 拖放事件
源对象
- dragstart
- drag
- dragend

过程对象
- dragenter
- dragover
- dragleave

目标对象
- drop

## DataTransfer
属性
- dropEffect 在dragstart中使用
  + none 禁止放置
  + copy 复制到新位置
  + link 建立一个源位置到新位置的链接
  + move 移动到新位置
- effectAllowed 通常在dragenter和dragover中使用
  + uninitialized
  + copy
  + copyLink
  + copyMove
  + link
  + linkMove
  + all
  + move
  + none
- files 拖拽上传文件时的文件列表
- types 拖拽对象的数据类型列表
方法
- clearData 删除与给定类型关联的数据。一般很少用到
- getData 获取指定类型的数据
```javascript
event.datatransfer.getData('text/plain')
```
- setData 为一个给定的类型设置数据
```javascript
event.datatransfer.setData('text/plain', 'hello world')
```
- setDragImage 设置拖动时的图片
```javascript
event.datatransfer.setDragImage(imgElement, offsetX, offsetY)
```
