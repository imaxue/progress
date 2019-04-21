### React V16.70

##### React.PureComponent

	
> 不同于React.Component, React.PureComponent已进行了针对state和prop的浅比较。但对于objects也只是浅比较，如果数据的结构复杂，只能用forceUpdate()，或使用immutable objects。
> 另外，React.PureComponent's shouldComponentUpdate() 会跳过子树的更新，需保证其子组件是‘pure’。

	
	//避免重复渲染  用属性和值做浅比较
	shouldComponentUpdate(){
    	return true/false
	}

	// 只做浅比较，但浅比较会忽略属性或状态突变的情况，此时就不能使用
	class extends React.PureComponent{
    	//数组不用push，而用concat   扩展运算  assign 返回新的对象
    	// words.push('marklar');
    	handleClick(){
       		// 1
       		prevState.words.concat(['marklar'])
			// 2
        	[...prevState.words, 'marklar']
			// 3
        	Object.assign({}, colormap, {right: 'blue'});
    	}
	}


	// 使用不可突变的数据结构   immutable.js  通过结构共享提供不可突变的持久的集合；
	immutable.js
	import {is} from 'immutable';
	class extends React.Component{
    	shouldComponentUpdate(nextProps,nextState){
        	for(const key in nextState){
            	if(thisState[key] !== nextState[key] || !is(thisState[key],nextState[key])){
                	return true;
            	}
        	}
    	}
	}


##### Composition组合组件
###### props.children

	function FancyBorder(props) {
		return (
    	<div className={'FancyBorder FancyBorder-' + props.color}>
      		{props.children}
      	</div>
      	);
      }
	render(){	
		return <FancyBorder color="blue">
      		<h1 className="Dialog-title">
        		Welcome
      		</h1>
	</FancyBorder>
	}

> props.left 也可是dom

	function SplitPane(props) {
		return (
    		<div className="SplitPane">
      		<div className="SplitPane-left">
        		{props.left}
      		</div>
      		<div className="SplitPane-right">
        	{props.right}
      		</div>
    	</div>
    	);
    }

	function App() {
		return (
    		<SplitPane
      	left={
        	<Contacts />
      	}
      	right={
        	<Chat />
      	} />
      );
    }


> return  an Array of elements

	render(){
		return [
    		<li key="a">first</li>,
    		<li key="b">second</li>,
    		<li key="c">third</li>,
    		<li key="d">four</li>        
    	]
    }


> callback回调函数 作为 props.children,可传参！！！ props.children也可以是函数
			
	function Repeat(props) {
		let items = [];	
		for (let i = 0; i < props.numTimes; i++) {
    		items.push(props.children(i));	
    	}
    	return <div>{items}</div>;
    }


	function ListOfTenThings() {
		return (
    		<Repeat numTimes={10}>
      		{(index) => <div key={index}>This is item {index} in the list</div>}
    		</Repeat>
    	);
    }
    
    
#### HOC

##### 方法1 属性代理  props proxy 原始组件作为参数被高级组件调用，使得通过高级组件来传递props，达到原始组件具备高级组件对他的修饰

	import React,{Component} from 'React';
	const MyContainer = (WrappedComponent) => {
    	class extends Component{
        	constructor(props){
            	super(props);
            	this.state = {
                	name:''
            	}
            	this.onNameChange = this.onNameChange.bind(this);
        	}

        onNameChange(event){
            this.setState({
                name:event.target.value
            })
        }

        render(){
            const newProps = {
                name:{
                    value:this.state.name,
                    onChange:this.onNameChange,
                }
            }
            return <WrappedComponent {...this.props} {...newProps}
            />
        	}
    	}
	}
	把input组件中对name prop的onChange方法提取到高级组件，有效的抽象了同样的state操作。

> 使用
> 得到一个被控制的input组件

	@MyContainer
	class MyComponent extends Component {
    	render(){
        	return <input name="name" {...this.props.name}/>
    	}
	}

> 例二
> 函数接受一个组件参数……
	
	function withSubscription(WrappedComponent, selectData) {
    	// ……返回另一个新组件……
    	return class extends React.Component {
      	constructor(props) {
        	super(props);
        	this.handleChange = this.handleChange.bind(this);
        	this.state = {
          	data: selectData(DataSource, props)
        	};
      	}
  
      	componentDidMount() {
        	// ……注意订阅数据……
        	DataSource.addChangeListener(this.handleChange);
      	}
  
      	componentWillUnmount() {
        	DataSource.removeChangeListener(this.handleChange);
      	}
  
      	handleChange() {
        	this.setState({
          	data: selectData(DataSource, this.props)
        	});
      	}
  
      	render() {
        	// ……使用最新的数据渲染组件
        	// 注意此处将已有的props属性传递给原组件
        	return <WrappedComponent data={this.state.data} {...this.props} />;
      		}
    	};
    }

##### 2 反向继承 

> 高阶组件可以使用WrapedComponent引用，可以使用wrappedComponent的state、props、生命周期render方法。

>应用1 渲染劫持
		
	const MyContainer = (WrappedComponent) =>{
    	class extends WrappedComponent{
        	render(){
            	if(this.props.loggedIn){
                	return super.render();
            	}else{
                	return null;
            	}
        	}
    	}
    	return WrappedComponent;
	}

> 注意事项
> 不要在高级组件内部修改 元组件的原型属性

	function logProps(InputComponent){
    	InputComponent.prototype.componentWillReceiveProps(nextProps){
        	console.log('Current props:',this.props);
        	console.log('Next props:',nextProps);
    	}
    	return InputComponent;
	}
	const EnhancedComponent = logProps(InputComponent);  //EnhancedComponent会纪律所有的props属性；

> 不应该修改原组件，高阶组件应该使用组合技术，将input组件包含到容器组件中

	function logProps(WrappedComponent){
    	return class extends React.Component{
        	componentWillReceiveProps(nextProps){
            	console.log('Current props:',this.props);
            	console.log('next props',nextProps);
        	}
        	render(){
            	//用容器组件组合包裹组件且不修改包裹组件，才是正确的打开方式
            	return <WrappedComponent {...this.props}/>;
        	}
    	}
	}

> 约定 ： 能够确保高阶组件最大程度的灵活性和可重用性

	function logProps(WrappedComponent){
    	return class extends React.Component{
        	render() {
            	// 过滤掉与高阶函数功能相关的props属性，
            	// 不再传递
            	const { extraProp, ...passThroughProps } = this.props;
          
            	// 向包裹组件注入props属性，一般都是高阶组件的state状态
            	// 或实例方法
            	const injectedProp = someStateOrInstanceMethod;
          
            	// 向包裹组件传递props属性
            	return (
              	<WrappedComponent
                	injectedProp={injectedProp}
                	{...passThroughProps}
              	/>
            	);
          	}
    	}
	}


##### react.lazy()

> 如果在APP组件渲染完，Home模块还没有被加载完成，可以使用加载指示器为此组件做优雅降级，react提供<Suspense fallback={}>, fallback属性接受任何在组件加载过程中想展示的React元素

			import { BrowserRoute as Router, Route, Switch } from 'react-router-dom';
			import React, { Suspense, lazy } from 'react';

			const Home = lazy(() => import('./routes/Home')); // 引入的内容只支持默认导出export default
			const About = lazy(() => import('./routes/About'));

			const App = () => (
			<Router>
				<Suspense fallback={<div>loading</div>}>
				<Switch>
					<Route component={Home} path='/' exact/>
					<Route component={About} path='/about'/>
				</Switch>
				</Suspense>
			</Router>
			)


##### 错误边界：可以捕获子组件树任何位置的JavaScript错误

 > 使用static getDerivedStateFromError(error)渲染备用UI，使用componentDidCatch(error,info)打印错误信息

			class extends React.Component{
			static getDerivedStateFormError(err){
				return {hasErr: true}
			}
			componentDidCatch(err, info){
				logErrInfo(err, info)
			}
			render(){
				if(this.state.hasErr){
				return <h1>something went wrong</h1>
				}
				return this.props.children;
			}
			}


##### State Hook: 提供了可以在函数式组件中使用state等其他react特性，在class组件中无效

			import { useState } from 'react';
			const Example = () => {
			const [count, setCount] = useState(0)

			return(
				<div>
				<p>you clicked {count} times</p>
				<button onClick={
					() => setCount(count +1)
				}></button>
				</div>
			)
			}


##### Effect Hook

> 可以在函数组件中执行副操作(在组件每次渲染后执行某些造作)，是componentDidMount,componentDidUpdate,componentWillUnmount的组合


			import React, { useState, useEffect } from 'react';

			function Example() {
			const [count, setCount] = useState(0);

			useEffect(() => {
				document.title = `you clicked ${count} times`;
			})

			return (
				<div>
				<p>You clicked {count} times</p>
				<button onClick={() => setCount(count + 1)}>
					Click me
				</button>
				</div>
			);
			}

> 如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它。相当于componentWillUnmount

			import React, { useState, useEffect } from 'react';
			function FriendStatus(props) {
			const [isOnline, setIsOnline] = useState(null);

			useEffect(() => {
				function handleStatusChange(status) {
				setIsOnline(status.isOnline);
				}

				ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
				// Specify how to clean up after this effect:
				return function cleanup() {
				ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
				};
			});

			if (isOnline === null) {
				return 'Loading...';
			}
			return isOnline ? 'Online' : 'Offline';
			}

> effect每次渲染后都执行 的性能优化，
> 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。
> 这就告诉 React, effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。

			useEffect(() => {
			document.title = `You clicked ${count} times`;
			}, [count]); // 仅在 count 更改时更新
