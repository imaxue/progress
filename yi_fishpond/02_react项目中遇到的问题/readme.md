
## 总结react项目中遇到的问题

1.render执行前后组件之间的传递
- **父组件向子组件传值** 

```javascript
//子组件
class ChildrenComponent extends React.Compent {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div>{this.props.fishname}</div>
            </div>
        )
    }
}

//父组件
class ParentComponent extends React.Compent {
     render(){
        return(
            <div>
                <ChildrenComponent fishname='zy'>
            </div>
        )
    }
}
```

- **子组件给父组件传值(回调函数)**

```javascript
//子组件
class ChildrenComponent extends React.Compent {
    constructor(props){
        super(props);
    }
    handerClick(){
        this.props.bgChange('red');
        //此函数由父元素传入改变颜色值
    }
    render(){
        return(
            <div>
                <div>父元素的背景颜色{this.props.bgColor}</div>
                //子元素接收父元素的背景颜色
                <div><button onClick={(e)=>{this.handerClick(e)}}>改变背景颜色</button></div>
                //执行改变颜色函数
            </div>
        )
    }
}

//父组件
class ParentComponent extends React.Compent {
    constructor(props){
        super(props);
        this.state = {
            bgColor:"#fff"  //父组件默认颜色
        }
    }
    bgChange(color){
        this.setState({
            bgColor : color
        });
    }
    render(props){
        return(
            <div style={{ background: this.state.bgColor}}>
                <ChildrenComponent bgColor={this.state.bgColor} bgChange={(color)=>{this.bgChange(color)}}>
                //父组件传入子组件属性和方法
            </div>
        )
    }
}
```

- **兄弟组件传值**   


2.setState更新以后会重新加载组件，设置子组件重新渲染

```javascript
    shouldComponentUpdate: function(nextProps, nextState){
        return true;
    }
```

react提供了组件生命周期函数，**shouldComponentUpdate**，组件在决定重新渲染`（`虚拟dom比对完毕生成最终的dom后`）`之前会调用该函数，该函数将是否重新渲染的权限交给了开发者，该函数默认直接返回`true`，表示默认直接出发dom更新。

3.setState属性更新数据时事更新
>在设置页面state的时候，需要先设置好state,然后再对页面一些参数进行修改可以使用setState的回调函数


- **不使用回调函数**

```javascript
this.state = { foo : 1 };
this.setState({
    foo : 123
});
console.log(this.state.foo);
//1
```

- **使用回调函数**

```javascript
this.state = { foo : 2 };
this.setState({foo : 123},()=>{
    console.log(this.state.foo);
    //123
});
```

4.子组件一个点击事件,属性传到父组件的方式
 
- **props(对象)**
只读的，不可改变的
- **state(对象)**
`state`是可以被改变的， `this.state={}`来初始化`state`，需要通过`this.setState()`方法来修改`state`。

	1.state是组件自己管理数据，控制自己的状态，可变；
	2.props是外部传入的数据参数，不可变；
	3.没有state的叫做无状态组件，有state的叫做有状态组件；
	4.多用props，少用state。也就是多写无状态组件。

