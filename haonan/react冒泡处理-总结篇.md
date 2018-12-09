# 前言
在上周处理了safari浏览器的冒泡问题后又遇到了新的问题

# 合成事件与原生事件
在react中，事件分为**合成事件**与**原生事件**

所谓合成事件，即通过jsx绑定的事件
```js
<button onClick={this.onButtonClick}>点击</button>
```
所谓原生事件，即通过原生js注册的事件
```js
document.getElementById('btn').addEventListener('click', () => {})
```

# 阻止冒泡的多种情况
如上图所示，我们设置这样一个页面：
![](http://op4gevqna.bkt.clouddn.com/blog-20181026174327.png)
```html
<!-- dom结构如下所示 -->
<div>
    <div className="dom1" onClick={this.dom1Click}>
        <div className="dom2" onClick={this.dom2Click}>
            <div className="dom3" id="target" onClick={this.dom3Click}></div>
        </div>
    </div>
</div>
```
**需求：当我们点击`dom3`的时候，需要阻止冒泡**

在react中，阻止事件冒泡需要考虑到**三种情况**：
1. 阻止合成事件的冒泡
对于合成事件来说，我们使用`e.stopPropagation`即可实现需求
```js
dom1Click = e => {
    console.log('dom1点击啦')
}

dom2Click = e => {
    console.log('dom2点击啦')
}

dom3Click = e => {
    e.stopPropagation()
    console.log('dom3点击啦')
}

// dom3点击啦
```
2. 阻止原生事件的冒泡
对于原生事件来说，我们需要使用`e.nativeEvent.stopImmediatePropagation`来阻止事件对于document的冒泡，详见前面的文章
```js
componentDidMount() {
    document.addEventListener('click', function() {
        console.log('document点击啦')
    })
}

dom1Click = e => {
    console.log('dom1点击啦')
}

dom2Click = e => {
    console.log('dom2点击啦')
}

dom3Click = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    console.log('dom3点击啦')
}

// dom3点击啦
```
3. 阻止原生事件与合成事件之间的冒泡
这是最麻烦的地方，在冒泡的过程中，如果我们在某一环节（除顶层document外）使用原生监听，仅靠`e.stopPropagation`与`e.nativeEvent.stopImmediatePropagation`是无法成功阻止的，这个时候需要试用判断的方式进行处理
```js
componentDidMount() {
    document.addEventListener('click', function() {
        console.log('document点击啦')
    })
    document.body.addEventListener('click', function(e) {
        if (e.target === document.getElementById('target')) return
        console.log('body点击啦')
    })
}

dom1Click = e => {
    console.log('dom1点击啦')
}

dom2Click = e => {
    console.log('dom2点击啦')
}

dom3Click = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    console.log('dom3点击啦')
}

// dom3点击啦
```
