## 简单的字符串模板，例如：
```js
<li class = "mui-table-view-cell">
<a class = "mui-navigate-right">
<div class = "mui-elipsis-2">Hi, 李明明，申请交行信息卡，100元等你拿，李明明
申请交行信息卡，100元等你拿</div>
<h5>所属栏目：为堂课防守打法大是大非</h5>
</a>
</li>
```
生成之后是  
```js
'<li class = "mui-table-view-cell">' +
 
'<a class = "mui-navigate-right">' + 

'<div class = "mui-elipsis-2">Hi, 李明明，申请交行信息卡，100元等你拿，李明明申请交行信息卡，100元等你拿</div>' + 

'<h5>所属栏目：为堂课防守打法大是大非</h5>' + 
'</a>' + 
'</li>'
```
## 代码如下：  
```js
 let fs = require('fs');
let iconv = require('iconv-lite');

var fileStr = fs.readFileSync('1.txt',{encoding:'binary'});
console.log('fileStr',fileStr);
var buf = new Buffer(fileStr,'binary');
console.log('buf',buf);
var str0 = iconv.decode(buf,'GBK');
console.log('str0',str0);
var str1 = "'";
var ii = 0;
var leftstr = str0;
while(leftstr.length > 	0 ){
	ii = leftstr.indexOf("\n");
	if(leftstr.indexOf("\n") == -1){
		str1 += leftstr.replace(/(^\s*)|(\s*$)/g,"");
		break ;
	}
	str1+= leftstr.substring(0,ii+1).replace(/(^\s*)|(\s*$)/g,"")+"' + \n'";
	leftstr = leftstr.substr(ii + 1)

} 
str1 += "'";
fs.writeFile("answer.txt",str1,{flag:'w',encoding:'utf-8',mode:'0666'},function(error){
	if(error){
		console.log('文件写入失败');
	}else{
		console.log('转化成功，打开answer.txt复制粘贴即可！')
	}

}) 
```
