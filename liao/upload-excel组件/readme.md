# 上传excel组件

项目中需要npm install --save xlsx

## 使用方法

```html
<!-- html -->
<excel-upload size="mini" :onSuccess="parseExcel" type="success">上传excel</excel-upload>
```

```js
import ExcelUpload from '@/components/ExcelUpload'

components: { ExcelUpload },


<!-- 事件 -->
parseExcel(data){
    console.log(data)
}
// 打印结果
// {
//     header: Array(19)
//     results: Array(100)
// }
```