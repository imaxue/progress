> # 核心概念 

# 1.虚拟DOM（Virtual DOM）

React将DOM抽象为虚拟DOM，虚拟DOM其实就是用一个对象来描述DOM，
通过对比前后两个对象的差异，最终只把变化的部分重新渲染，提高渲染的效率

 DOM 树的信息都可以用 JavaScript 对象来表示，然后用 JavaScript 对象表示的树结构来构建一棵真正的DOM树。
 
# 2.diff算法

> 算法说明
 1.如果两棵树的根元素类型不同，React会销毁旧树，创建新树
 2.对于类型相同的React DOM 元素，React会对比两者的属性是否相同，只更新不同的属性
 3.引入key 参数，否则新插入元素的时候会所有删除并重新建立

* 注意：key只需要保持与他的兄弟节点唯一即可，不需要全局唯一
* 注意：尽可能的减少数组index作为key，数组中插入元素的等操作时，会使得效率底下


# 3.生命周期

组件的生命周期包含三个阶段：
      创建阶段（Mounting）、运行和交互阶段（Updating）、卸载阶段（Unmounting）

> Mounting

constructor() 
componentWillMount() 
render() 
componentDidMount()

> Updating

componentWillReceiveProps() 
shouldComponentUpdate() 
componentWillUpdate() 
render() 
componentDidUpdate()

> Unmounting

componentWillUnmount()

> 参考地址：https://segmentfault.com/a/1190000012921279


