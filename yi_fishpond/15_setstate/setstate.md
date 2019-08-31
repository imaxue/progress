# setState的关键点
1. setState不会立刻改变React组件中state的值
2. setState通过引发一次组件的更新过程来引发重新绘制
3. 重绘指的就是引起React的更新生命周期函数4个函数：
+ shouldComponentUpdate（被调用时this.state没有更新；如果返回了false，生命周期被中断，虽然不调用之后的函数了，但是state仍然会被更新）
+ componentWillUpdate（被调用时this.state没有更新）
+ render（被调用时this.state得到更新）
+ componentDidUpdate

多次setState函数调用产生的效果会合并。
```js
 this.setState({name: 'Pororo'})
 this.setState({age: 20})
 this.setState({name: 'Pororo'，age: 20})
 ```
上面两块代码的效果是一样的。如果每次调用都引发一次生命周期更新，那性能就会消耗很大了。所以，React会将多个this.setState产生的修改放进一个队列里，等差不多的时候就会引发一次生命周期更新。

0,0,2,3 面试题引发的思考
```js
class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    componentDidMount () {
        this.setState({count: this.state.count + 1})
        console.log(this.state.count) // 第一次输出
        this.setState({count: this.state.count + 1})
        console.log(this.state.count) // 第二次输出
        setTimeout(() => {
            this.setState({count: this.state.count + 1})
            console.log(this.state.count) // 第三次输出
            this.setState({count: this.state.count + 1})
            console.log(this.state.count) // 第四次输出
        }, 0)
    }

    render () {
        return null
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```
结果：控制台打印输出为: 0, 0, 2, 3。why？
先来分析前两次setState：
        this.setState({count: this.state.count + 1})
        console.log(this.state.count) // 第一次输出
        this.setState({count: this.state.count + 1})
        console.log(this.state.count) // 第二次输出
由于setState不会立即改变React组件中state的值，所以两次setState中this.state.value都是同一个值0，故而，这两次输出都是0。因而count只被加1。【合并更新】
既然这样，那么是不是可以直接操作this.state呢？
比如：this.state.count=this.state.count+1;这样的确可以修改this.state.count的状态但是却不可以引发重复渲染。所以，就必须通过React设定的setState函数去改变this.state，从而引发重新渲染。
接下来分析setTimeout里面的两次setState：
        setTimeout(() => {
            this.setState({count: this.state.count + 1})
            console.log(this.state.count) // 第三次输出
            this.setState({count: this.state.count + 1})
            console.log(this.state.count) // 第四次输出
        }, 0)
这两次this.stat的值同步更新了，这是为什么的呢？
在React中，如果是由React引发的事件处理（比如：onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.setState。 “除此之外”指的是：绕过React通过addEventListener直接添加的事件处理函数和setTimeout/setInterval产生的异步调用。
那为什么会这样呢？

每次setState产生新的state会依次被存入一个队列，然后会根据isBathingUpdates变量判断是直接更新this.state还是放进dirtyComponent里回头再说。isBatchingUpdates默认是false，也就表示setState会同步更新this.state。但是，当React在调用事件处理函数之前就会调用batchedUpdates，这个函数会把isBatchingUpdates修改为true，造成的后果就是由React控制的事件处理过程setState不会同步更新this.state。
同步更新state的办法
setState(nextState, callback)  
这是UI更新最常用的方法，合并新的state到现有的state。
1、常规方式
nextState可以为一个对象，包含0个或多个要更新的key。最简单的用法为：
this.setState({  
  key1: value1, 
  key2: value2
});
这种方式能应付大部分的应用场景，但是看看下面这种情况：
this.setState({  
  count: this.state.count + 1
});
this.setState({  
  count: this.state.count + 1
});
最后得到的count却是不可控的。因为setState不会立即改变this.state，而是挂起状态转换，调用setState方法后立即访问this.state可能得到的是旧的值。
setState方法不会阻塞state更新完毕
第二个setState可能还没等待第一次的state更新完毕就开始执行了，所以最后count可能只加了1。
这时setState的第二个参数就派上用场了，第二个参数是state更新完毕的回调函数
this.setState({  
  count: this.state.count + 1
}, () => {
  this.setState({
    count: this.state.count + 1
  });
});
不过看起来很怪，es6中可以使用Promise更优雅的使用这个函数，封装一下setState
function setStateAsync(nextState){  
  return new Promise(resolve => {
    this.setState(nextState, resolve);
  });
}
上面的例子就可以这样写
async func() {  
  ...
  await this.setStateAsync({count: this.state.count + 1});
  await this.setStateAsync({count: this.state.count + 1});
}
顺眼多了。
2、函数方式
nextState也可以是一个function，称为状态计算函数，结构为function(state, props) => newState。这个函数会将每次更新加入队列中，执行时通过当前的state和props来获取新的state。那么上面的例子就可以这样写
this.setState((state, props) => {
    return {count: state.count + 1};
})
console.log(this.state.count) // 第一次输出
this.setState((state, props) => {
    return {count: state.count + 1};
})
每次更新时都会提取出当前的state，进行运算得到新的state，就保证了数据的同步更新。
为什么传统式setState与函数式setState一定不要混用？
this.setState((state, props) => {
    return {count: state.count + 1};
})
console.log(this.state.count) // 第一次输出
this.setState((state, props) => {
    return {count: state.count + 1};
})
this.setState({count: this.state.count + 1})
混合式写法带来的问题。在几个函数式setState调用中插入一个传统式setState调用，结果出乎意料，这是因为React会依次合并所有setState产生的效果，虽然前两个函数式setState调用产生的效果是count加2，但是中间出现一个传统式setState调用，一下子强行把积攒的效果清空，用count加1取代。所以，传统式setState与函数式setState一定不要混用。
3、控制渲染
默认调用setState都会重新渲染视图，但是通过shouldComponentUpdate()函数返回false来避免重新渲染。
如果可变对象无法在shouldComponentUpdate()函数中实现条件渲染，则需要控制newState与prevState不同时才调用setState来避免不必要的重新渲染。

1.setState()函数在任何情况下都会导致组件重渲染吗？如果setState()中参数还是原来没有发生任何变化的state呢？
2.如果组件的state没有变化，并且从父组件接受的props也没有变化，那它就一定不会重渲染吗？
3.如果1，2两种情况下都会导致重渲染，我们该如何避免这种冗余的操作，从而优化性能？
下面我就用实例一一探讨这些问题：
没有导致state的值发生变化的setState是否会导致重渲染 ——【会！】
```js
class Test extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      Number:1//设state中Number值为1
    }
  }
  //这里调用了setState但是并没有改变setState中的值
  handleClick = () => {
     const preNumber = this.state.Number
     this.setState({
        Number:this.state.Number
     })
  }
  render(){
    //当render函数被调用时，打印当前的Number
    console.log(this.state.Number)
    return(<h1 onClick = {this.handleClick} style ={{margin:30}}>
             {this.state.Number}
           </h1>)
  }
}
```
点击1一共15次，其间demo没有发生任何变化

 
控制台输出：（我点击了1一共15次）

 
那么问题就来了，我的UI明明就没有任何变化啊，为什么要做着中多余的重渲染的工作呢？把这工作给去掉吧！
 

于是这里react生命周期中的shouldComponentUpdate函数就派上用场了！shouldComponentUpdate函数是重渲染时render()函数调用前被调用的函数，它接受两个参数：nextProps和nextState，分别表示下一个props和下一个state的值。并且，当函数返回false时候，阻止接下来的render()函数的调用，阻止组件重渲染，而返回true时，组件照常重渲染。
我们对上面的情况做一个小小的改动：
```js
class Test extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      Number:1
    }
  }
  //这里调用了setState但是并没有改变setState中的值
  handleClick = () => {
     const preNumber = this.state.Number
     this.setState({
        Number:this.state.Number
     })
  }
  //在render函数调用前判断：如果前后state中Number不变，通过return false阻止render调用
  shouldComponentUpdate(nextProps,nextState){
      if(nextState.Number == this.state.Number){
        return false
      }
  }
  render(){
    //当render函数被调用时，打印当前的Number
    console.log(this.state.Number)
    return(<h1 onClick = {this.handleClick} style ={{margin:30}}>
             {this.state.Number}
           </h1>)
  }
}
```
点击标题1，UI仍然没有任何变化，但此时控制台已经没有任何输出了，没有意义的重渲染被我们阻止了！

 
组件的state没有变化，并且从父组件接受的props也没有变化，那它就还可能重渲染吗？——【可能！】
```js
class Son extends React.Component{
  render(){
    const {index,number,handleClick} = this.props
    //在每次渲染子组件时，打印该子组件的数字内容
    console.log(number);
    return <h1 onClick ={() => handleClick(index)}>{number}</h1>
  }
}
class Father extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      numberArray:[0,1,2]
    }
  }
  //点击后使numberArray中数组下标为index的数字值加一，重渲染对应的Son组件
  handleClick = (index) => {
     let preNumberArray = this.state.numberArray
     preNumberArray[index] += 1;
     this.setState({
        numberArray:preNumberArray
     })
  }
  render(){
    return(<div style ={{margin:30}}>{
              this.state.numberArray.map(
                (number,key) => {
                 return <Son
                           key = {key}
                           index = {key}
                           number ={number}
                           handleClick ={this.handleClick}/>
                }
                )
              }
           </div>)
  }
}
```
在这个例子中，我们在父组件Father的state对象中设置了一个numberArray的数组，并且将数组元素通过map函数传递至三个子组件Son中，作为其显示的内容（标题1，2，3），点击每个Son组件会更改对应的state中numberArray的数组元素，从而使父组件重渲染，继而导致子组件重渲染
demo:(点击前)

点击1后：

控制台输出：

demo如我们设想，但这里有一个我们无法满意的问题：输出的（1，1，2），有我们从0变到1的数据，也有未发生变化的1和2。这说明Son又做了两次多余的重渲染，但是对于1和2来说，它们本身state没有变化（也没有设state）,同时父组件传达的props也没有变化，所以我们又做了无用功。

那怎么避免这个问题呢？没错，关键还是在shouldComponentUpdate这个钩子函数上
```js
class Son extends React.Component{
  shouldComponentUpdate(nextProps,nextState){
      if(nextProps.number == this.props.number){
        return false
      }
      return true
  }
  render(){
    const {index,number,handleClick} = this.props
    //在每次渲染子组件时，打印该子组件的数字内容
    console.log(number);
    return <h1 onClick ={() => handleClick(index)}>{number}</h1>
  }
}
class Father extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      numberArray:[0,1,2]
    }
  }
  //点击后使numberArray中数组下标为index的数字值加一，重渲染对应的Son组件
  handleClick = (index) => {
     let preNumberArray = this.state.numberArray
     preNumberArray[index] += 1;
     this.setState({
        numberArray:preNumberArray
     })
  }
  render(){
    return(<div style ={{margin:30}}>{
              this.state.numberArray.map(
                (number,key) => {
                 return <Son
                           key = {key}
                           index = {key}
                           number ={number}
                           handleClick ={this.handleClick}/>
                }
                )
              }
           </div>)
  }
}
```
这次只打印了数字发生改变的numberArray[0]对应的Son组件，说明numberArray[1]，numberArray[2]的重渲染被“过滤”了！