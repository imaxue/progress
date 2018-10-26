# 前言
最近做的项目增加了一个需求，具体表现为当点击其他空白区域的时候，隐藏某些已显示的组件。这是个常见的交互形式，使用react实现起来也非常的简单

# 具体操作
```js
// 组件加载完毕，绑定全局点击事件
componentDidMount() {
    document.addEventListener('click', this.hideList)
}
// 该函数用来控制组件的隐藏
hideList = () => {
    this.setState({
        isShowList: false
    })
}
// 需要注意，组件卸载前，要解绑全局点击事件
// 不然当点击其他组件的时候，会触发全局点击事件，但是该组件被注销后点击事件找不到相应的运行函数，导致报错
componentDidMount() {
    document.addEventListener('click', this.hideList)
}
```
上面是对这个功能的简单实现，有个小注意点，当需要隐藏的组件有点击事件时，要阻止冒泡

# 问题就在这里
说到阻止冒泡，很简单，``stopPropagation``或``cancelBubble``，但是放在react上就不行了，为什么呢？**react为了提高效率，把事件都委托给了document，所以 e.stopPropagation() 并非是不能阻止冒泡，而是等他阻止冒泡的时侯，事件已经传递给document了，没东西可阻止了**

# 如何解决
stopPropagation不行，浏览器支持一个好东西，stopImmediatePropagation 他不光阻止冒泡，还能阻止在当前事件触发元素上，触发其它事件。所以我们使用stopImmediatePropagation来完成阻止冒泡

# 最后一点
react对原生事件封装，提供了很多好东西，但也省略了某些特性。stopImmediatePropagatio就是被省略的部分，还好开了react后门``e.nativeEvent``，可以从原生的事件对象里找到stopImmediatePropagation