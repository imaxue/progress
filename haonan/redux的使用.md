# 前言
最近一直在学习react及其全家桶，为要到来的项目做准备。发现这react的学习曲线确实比较的陡峭，在学习的过程中需要更多的体会react的设计思想才能更好的对其进行运用，服务于项目中。

# 何为react-redux?
这里可以看下[知乎上对于rendux的回答](https://www.zhihu.com/question/41312576?sort=created)。由于react中每一个组件都有一个独立的作用域，当两个兄弟组件之间或者非父子关系的组件之间想要获取到对方组件内的数据的时候，这是一个很麻烦的事情。那么redux就提供了一个制高点，从顶层向下分发数据，大家把要共享的数据都放在这个制高点上，这样不论是提交还是获取都可以按照其提供的方法直接到制高点上操作，就实现了数据共享的目的，而react-redux则是redux的作者专门为react而重新封装的一个库，能够更好的适应react的特性

# 简单概念
在redux中有四个概念，分别是store,state,action,reducer
+ store：这个东西就是那个所谓的制高点，它将我们存入的状态与改变这些状态的方法进行统一的管理与调配
+ state：在制高点中存着的数据就是state，通过它的改变来达到更改组件视图的效果
+ action：每个组件如果要想改变state就需要通过触发action来实现
+ reducer：想要state如何改变呢？就要通过reducer的调用来实现了，这里面定义了改变state的逻辑

# 上代码
```js
import React, { Component } from 'react'
import { connect } from 'react-redux'

class exampleComponent extends Component {
  render() {
    // 一个组件需要通过props获取到store中的值
    const { value, onIncreaseClick } = this.props
    return (
      add
      {value}
    )
  }
}

// 在mapStateToProps函数中我们需要给想要获取的值与state之间做一个映射，告诉人家"只传给我这些值就好了！"
const mapStateToProps = state => {
  return {
    value: state
  }
}

// 在mapDispatchToProps函数中我们需要定义action，告诉reducer函数，这个组件中我需要触发其内部"ADD"情况下要执行的事情
const mapDispatchToProps = dispatch => {
  return {
    onIncreaseClick: () => dispatch({ type: 'ADD' })
  }
}

// 而connect函数则是将该组件与store之间连接起来，这样才能使之前的设置生效
const reduxExampleComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(exampleComponent)

export default reduxExampleComponent
```
上面的代码是一个普通的组件，它通过props获取到state中的num值并绑定到了其自身的p标签上，而当点击了另一个内容为add的p标签后，触发了reducer中的ADD类型，而具体这个所谓的TEST类型干了些什么事情呢？继续往下看
```js
const reducer = (state = { num: 0 }, action = {}) => {
  switch (action.type) {
    case 'ADD':
      return Object.assign({}, state, { num: state.num + 2 })
    default:
      return state
  }
}

export default reducer
```
在上面的代码中，我定义了reducer，在内部判断了当actions的type值为TEST的时候，对state中的num值进行加法操作，而由于组件exampleComponent绑定了这个num，所以每当点击add的时候，数值就会不断地加2
```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from 'reducers'
import App from './App'

// 将我们刚才定义好的reducers方法传入createStore方法中去生成"制高点"，并通过react-redux提供的Provider组件把它传给我们的根组件"App"当中，这样，就能让每一个子组件都能获取到共享数据了
const store = createStore(reducers)
ReactDOM.render((
), targetDom)
```
效果：
![效果1](http://upload-images.jianshu.io/upload_images/10506000-cf6a8ddce3b35c9d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![效果2](http://upload-images.jianshu.io/upload_images/10506000-565a4627a9231a5e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 加餐
上面只是一个小demo而已，但是在真正的工作中，我们的项目往往是非常庞大的，肯定不单单只有一个num这么简单，那么复杂的情况下要如何组织好我们的state呢？
其实redux为我们提供了一个名叫combineReducers的方法，它可以将多个小reducer组合起来成为一个大的reducer，方便拆分，易于管理
```js
// 而这里的参数state指的是它要处理的属性的值，而不是整个state！这里一定要注意！
const num = (state = 0, action = {}) => {
  switch (action.type) {
    case 'ADD':
      // 最后返回处理的结果
      return state + 2
    default:
      return state
  }
}

const reducers = combineReducers({
  // 这里传入的就是state中要修改的属性及其修改的方法，这样才能形成映射关系，让大的reducer知道它是用来处理哪个属性的
  // 处理函数的名称最好和它要处理的属性名称一样，如果属性名称与方法名称不一致，则要写成传统ES5的键值对形式，但是key必须与state中的属性相同！
  num
})

export default reducers
```

想要了解更多关于redux与react-redux的，可以去看：
+ [阮一峰老师的入门教程](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
+ [官方文档（中文）](http://www.redux.org.cn/)
+ [官方文档（原版）](http://www.redux.org/)