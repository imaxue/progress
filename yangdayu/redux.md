### redux

* action

		const addAction = {
		    type: 'ADD_TODO',
		    id: 0,
		    text: 'Learn Redux'
		}
		const toggleAction = {
		    type: 'TOGGLE_TODO',
		    id: 1
		}
		
* reducer

		const todosReducer = (state=[], action) => {
			switch(action.type){
				case 'ADD_TODO':
					return [
						...state,
						{id: action.id, text: action.text, completed: false}
					];
					break;
				case 'TOGGLE_TODO':
					return state.map(todo => {
						if (todo.id !== action.id){
							return todo;
						}
						return {
							...todo,
							completed: !todo.completed;
						}
					});
					break;
				default:
					return state;
			}
		}
		
		const visibilityFilterReducer = (state = 'SHOW_ALL', action) => {
			switch(action.type){
				case 'SET_VISIBLE_FILTER':
					return action.filter;
				default:
					return state;
			}
		}
		
		const todoAppReducers = combineReducers({
			todos: todosReducer,
			visibilityFilter: visibilityFilterReducer
		})
		
** combineReducers **
> 源码简易实现
	
		
		const combineReducers = (reducers) => {
			return (state = {}, action) => {
				return Object.keys(reducers).reduce(
					(newObj,currentkey) => {
						newObj[currentKey] = reducers[currentKey](state[key], action);
						return newObj;
					},{}
				)
			}
		}
		
	
* store及使用

		const store = createStore(todoAppReducers);
		store.getState();
		store.dispatch(toggleAction);
		store.subscribe(() => {
			document.body.innerText = store.getState()
		})
		
** createStore **
> 源码简易抽取

		const createStore = (reducer) => {
			let state;
			let listeners = [];
			
			const getState = () => state;
			
			const subscribe = (listener) => {
				listeners.push(listener);
				return () => {  // 返回一个取消监听的函数
					listeners = listeners.filter(l => l !== listener);
				}				
			}
			
			const dispatch = (action) => {
				state = reducer(state, action)
				listeners.forEach((listener) => listener())
				return action; // 这个返回值是为了引入中间件机制
			}
		}
		

#### react-redux

		ReactDOM.render(
			<Provider store={store)}>
				<TodoApp/>
			</Provider>
		)
		
* Provider的工作原理
> 就是一个包装容器，为子组件提供this.context.store, 本质是用了react的context。

		class Provider extends Component {
			getChildContext() {
				return { store: this.props.store }
			}
			render() {
				this.props.children;
			}
		}
		Provider.childContextTypes = {
			store: React.PropTypes.object
		}
		
> 子组件使用方法1：

		const TodoApp = (props, {store} = context) => {}
		TodoApp.contextTypes = {
			store: React.PropTypes.object
		}
	
> 子组件常用方法2：

		const TodoCom = connect(mapStateToProps, mapDispatchToProps)(TodoApp)
		
** connect **
> connect高阶组件实现原理：取context的store的state和dispatch处理结果赋给被包裹组件

		const connect = (mapStateToProps, mapDispatchToProps) => (People) => {
			 return class extends Component {
			 	static contextTypes = {
			 		store: PropTypes.object
			 	}
			 	
			 	constructor(){
			 		super();
			 		this.state = {allProps: {}}
			 	}
			 	
			 	componentWillMount(){
			 		this.setProps()
			 	}
			 	setProps(){
			 		const {store} = this.context;
			 		let stateProps = mapStateToProps(store.state, this.props);
			 		let dispatchProps = mapDispatchToProps(store.dispatch, this.props)
			 		this.setState({
			 			allProps: {
			 				...stateProps,
			 				...dispatchProps,
			 				...this.props
			 			}
			 		})
			 	}
			 	
			 	render(){
			 		return <Peopel {...this.state.allProps} />
			 	}
			 }
		}



#### redux 的 中间件

		const enhancer = compose(
    		// 应用中间件到store中
    		applyMiddleware(reduxPromiseMiddleware(), funActionThunk, thunk)
		)
		const store = createStore(reducer, initialState, enhancer)
		
* redux-thunk: 处理异步action。
> 在dispatch一个action之前，去判断action是否是一个函数，如果是函数，那么就执行这个函数
		
		function createThunkMiddleware(extraArg){
		    return ({dispatch, getState}) => next => action => {
		        if (typeof action === 'function') {
		            return action(dispatch, getState, extraArg)
		        }
		        return next(action);
		    }
		}
		
* redux-actions: 简化redux的使用
> 如handleActions

		import {handleActions} from 'redux-actions';
		import * as T from './actionTypes';
		
		const initialState = {
		    btnText: '按钮'
		}
		const pageMainReducer = handleActions({
		    [T.CHANGE_BTN_TEXT]: {
		        next(state, action){return {...state, btnText: action.payload}},
		        throw(state){return state}
		    }
		},initialState);
		


		