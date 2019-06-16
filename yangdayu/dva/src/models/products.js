//处理数据和逻辑  dva里利用 model 管理一个个领域的模型
//包含：1 同步更新state 的 reducers
//     2 处理异步逻辑的 effects 
//     3 订阅数据源的 subscriptions


export default {
	namespace: 'products',

	state: [],   // 这里的state，干嘛的，赋值不起作用,可能这里只是个衔接 改model当前的状态

	reducers: {
		// type Reducer<S, A> = (state: S, action: A) => S
		delete(state, { payload: id }) {
			return state.filter(item => item.id !== id);
		},
		add(state) {
			return [...state, {name: 'add', id: 5}]
		}

	},
	
	// 另外的
	effects: {
		*addAffter1Second(action, {call, put, select}){
			yield call('delayfn', 1000); // 一个异步的请求之类的
			yield put({type: 'add'}) // 类似dispatch

			const { a, b } = yield select(state => ({buy: state.buy, context: state.context})); // 如果当前应用中加载了不止一个model，在其中一个的effect里面做select操作，是可以获取另外一个中的state的.
			
			yield all([aP, bP]) // aP bP是异步，同时发，类似于Promise.all
			
			const {data, timeout} = yield race({data: call(service, 'somedate'), timeout: call(delay, 3000)}) //Promise.race() 巧妙地用一个延时一秒的空操作来跟一个网络请求竞争，如果到了一秒，请求还没结束，就让它超时。
			
			// 使用take操作来监听action
			// someSource.on('click', event => doSomething(event))
			while(true) {
				const event = yield take('click');
				doSomething(event);
			 }
		}
	},
	subscriptions: {	// 用于收集其他来源的action，如键盘操作
		keyboardWatcher({ dispatch }) {
			// key('⌘+up, ctrl+up', () => { dispatch({ type: 'add' }) })
		}
	}
}

// namespace: 表示在全局state上的key
// state 是初始值，为空数组，？？？为啥[{title:'model/name',id:'jj'}]不起作用
// reducers 等同于redux的reducer，接受action，同步更新state，处理同步动作，算出最新的state
// effects Action处理器，处理异步动作：
// effect提供的多个内部处理函数：call、put。call：执行异步操作；put发出一个action，类似dispatch。

