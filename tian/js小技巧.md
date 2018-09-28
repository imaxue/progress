### 将彻底屏蔽鼠标右键
```js
    oncontextmenu="window.event.returnValue=false"
    < table border oncontextmenu=return(false)>< td>no< /table> 可用于 Table
```
### 取消选取、防止复制
```js
< body onselectstart=”return false”>
```
### JS不允许粘贴
```js
onpaste=”return false”
```
### JS防止复制
```js
oncopy=”return false;” oncut=”return false;”
```
### IE 地址栏前换成自己的图标
```js
    < link rel=”Shortcut Icon” href=”favicon.ico”>
    在文件的根目录放进去这个图片，后缀修改成ico就可以了
```
### 可以在收藏夹中显示出你的图标
```js
< link rel=”Bookmark” href=”favicon.ico”>
```
### 关闭输入法
```js
< input style=”ime-mode:disabled”>
```
### 防止被人 frame
```js
< SCRIPT LANGUAGE=JAVASCRIPT>
< !– if (top.location != self.location)top.location=self.location;// –>
< /SCRIPT>
```
### 判断上一页的来源
```js
javascript:
document.referrer
```
### 网页不会被缓存
```js
< META HTTP-EQUIV=”pragma” CONTENT=”no-cache”>
< META HTTP-EQUIV=”Cache-Control” CONTENT=”no-cache, must-revalidate”>
< META HTTP-EQUIV=”expires” CONTENT=”Wed, 26 Feb 1997 08:21:57 GMT”>
或者< META HTTP-EQUIV=”expires” CONTENT=”0″>
```
### 脚本永不出错
```js
    < SCRIPT LANGUAGE=”JavaScript”>
    < !– Hide
    function killErrors() {
    return true;
    }
    window.onerror = killErrors;
    // –>
    < /SCRIPT>
```





















