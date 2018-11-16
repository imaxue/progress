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

生命周期
装载 mount ：第一次DOM渲染
* constructor ：构造函数，不是每个组件都需要定义，武装天的组件不需要；
                                需要构函数，为了：1.初始化state，因为组件生命周期中任何函数都可能要访问state，所以生命周期中第一个被调用的构造函数，自然是初始化state的最理想的地方            
                                                                2.绑定成员函数的this环境，如使用bind
* getInitiaState ：在从reactClass 方法定义的组件才会用到，在ES6的方法定义的react 组件中不会用到
* getDefaultProps ：函数很少用
* componentWillMount ： 用处不大，没有渲染的结构，此处一般会放在constructor中实现
* Render ： 渲染函数
* componentDidMount：与WILL兄弟函数 区别：will 可以再服务器和连蓝旗端调用，Did 只能在浏览器被调用，服务器端使用react 不会被调动

更新过程 update ：props 或者 state 被修改的时候，组件重新被渲染
*   componentWillReceiveProps
* shouldComponentUpdate
* componentWillUpdate
* Render
* componentDidUpdate      

卸载过程 Unmount :组件从DOM删除
* componentWillUnmount 

# 4.ref
在react典型的数据流中，props传递是父子组件交互的唯一方式；通过传递一个新的props值来使子组件重新re-render,从而达到父子组件通信。
在react典型的数据量之外，某些情况下（例如和第三方的dom库整合，或者某个dom元素focus等）为了修改子组件我们可能需要另一种方式，这就是ref方式

 ### ref一共有两种使用方式
回调函数形式（官方推荐）:string形式
第一种 回调函数形式 
> 回调函数形式一共有三种触发方式
组件渲染后
组件卸载后
ref改变后

```
import React,{Component} from 'react'
export default class UserAdd extends Component{
    constructor(){
        super();
    }
    handleSubmit=()=>{
        let name=this.name.value;
        console.log(name);
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="from-group">
                    <label htmlFor="name">姓名</label>
                    <input type="text" className="form-control" ref={ref=>this.name=ref}/>
                </div>
                <div className="from-group">
                    <input type="submit" className="btn btn-primary"/>
                </div>
            </form>
        )
    }

}

```
第二种 字符串的形式 使用时用this.refs.string
```
import React,{Component} from 'react'
export default class UserAdd extends Component{
    constructor(){
        super();
    }
    handleSubmit=()=>{
        let name=this.refs.name.value;
        console.log(name);
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="from-group">
                    <label htmlFor="name">姓名</label>
                    <input type="text" className="form-control" ref="name"/>
                </div>
                <div className="from-group">
                    <input type="submit" className="btn btn-primary"/>
                </div>
            </form>
        )
    }

}

```

# 5.用 PropTypes 确认prop的类型
import PropTypes from 'prop-types’;
class MyComponent extends React.Component {
    render() {
        // 只能包含一个子元素，否则会给出警告
        const children = this.props.children;
        return (
            <div>{children}</div>
        );
    }
}

MyComponent.propTypes = {
    children: React.PropTypes.element.isRequired
}
> 参考地址：https://segmentfault.com/a/1190000012921279


