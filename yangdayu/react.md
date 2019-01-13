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
