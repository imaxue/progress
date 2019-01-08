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