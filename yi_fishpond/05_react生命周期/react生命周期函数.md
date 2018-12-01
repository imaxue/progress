# React生命周期函数

![Image text](https://raw.githubusercontent.com/imaxue/progress/master/yi_fishpond/fifth%20project/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)


1. 装配

> 这些方法会在组件实例被创建和插入DOM中调用：

- 1.**constructor(Props)**

条件：React组件的构造函数将会在装配之前被调用。

作用：当为一个React.Component子类定义构造函数时，你应该在任何其他的表达式之前调用super(props)。否则，this.props在构造函数中将是未定义，并可能引发异常。

构造函数是初始化状态的合适位置。若你不初始化状态且不绑定方法，那你也不需要为你的React组件定义一个构造函数。


- 2.**componentWillMount()**

条件：componentWillMount()在装配发生前被立刻调用，其在render()之前被调用。该方法在整个组件生命周期只会被调用一次。

作用：在这方法里同步地设置状态将不会触发重新渲染。避免在该方法中引入任何的副作用或订阅。

这是唯一的会在服务端渲染调起的生命周期钩子函数。通常地，我们推荐使用constructor()来替代。


- 3.**render()**

条件：渲染元素时调用。可以被调用多次

作用：渲染方法是必须的，当被调用时，其应该检查this.props 和 this.state并返回以下类型中的一个：

1.	React元素。 通常是由 JSX 创建。该元素可能是一个原生DOM组件的表示，如<div />，或者是一个你定义的合成组件。
2.	字符串和数字。 这些将被渲染为 DOM 中的 text node。
3.	Portals。 由 ReactDOM.createPortal 创建。--[具体含义请参照官网](https://doc.react-china.org/docs/portals.html)
4.	null。 什么都不渲染。
5.	布尔值。 什么都不渲染。（通常存在于 return test && <Child />写法，其中 test 是布尔值。）

当返回null 或 false时，ReactDOM.findDOMNode(this) 将返回 null。

注意：除开首次渲染，若 shouldComponentUpdate()返回false，render()函数将不会被调用。



- 4.**componentDidMount()**

条件：第一次渲染成功过后，组件对应的 DOM 已经添加到页面后调用。

作用：初始化使得DOM节点进行到这里。我们可以在这个时候做一些依赖 DOM 的操作或者其他的一些如请求数据，和第三方库整合的操作。如果嵌套了子组件，子组件会比父组件优先渲染，所以这个时候可以获取子组件对应的 DOM。在该方法里设置状态将会触发重新渲染。

------------------------------------

2. 更新

> 属性或状态的改变会出发一次更新，当组件在被重新渲染时，这些方法会被调用：

- 5.**componentWillReceiveProps(newProps)**

条件：当组件获取新属性的时候，第一次渲染不会调用。
作用：这个时候可以根据新的属性来修改组件状态。


- 6.**shouldComponentUpdate(nextProps, nextState)**

条件：接收到新属性或者新状态的时候在 render 前会被调用（除了调用 forceUpdate 和初始化渲染以外）。
作用：该方法让我们有机会决定是否重渲染组件，如果返回 false，那么不会重渲染组件，借此可以优化应用性能（在组件很多的情况）。


- 7.**componentWillUpdate(nextProps, nextState)**

条件：当组件确定要更新，在 render 之前调用。初次渲染时不会调用。
作用：这个时候可以确定一定会更新组件，可以执行更新前的操作。

1.	不能在这调用this.setState()，若你需要更新状态响应属性的调整，使用componentWillReceiveProps()代替。
2.  若shouldComponentUpdate()返回false，componentWillUpdate()将不会被调用。


- **render()**


- 8.**componentDidUpdate(prevProps, prevState)**

条件：更新被应用到 DOM 之后，该方法并不会在初始化渲染时调用。

作用：当组件被更新时，使用该方法是操作DOM的一次机会。这也是一个适合发送请求的地方，要是你对比了当前属性和之前属性（例如，如果属性没有改变那么请求也就没必要了）。
注意：若 shouldComponentUpdate()返回false，8.	componentDidUpdate ()函数将不会被调用。

-------------------------------


3. 销毁

> 当组件被从DOM中移除时，该方法被调用

- 9. **componentWillUnmout**

条件：在组件被卸载和销毁之前立刻调用。

作用：可以在该方法里处理任何必要的清理工作，例如解绑定时器，取消网络请求，清理任何在componentDidMount环节创建的DOM元素。

1.	默认属性（defaultProps）是在类级别创建的，只会调用一次。所有实例都会共用。建议所有的属性值的类型都为基础类型（string,number,boolean等）。
2.	装配阶段在componentDidMount中操作DOM元素的时候建议只操作最外层的DOM元素，避免操作子节点（子节点可能会随着业务需求有所变化，而最外层不会。）
