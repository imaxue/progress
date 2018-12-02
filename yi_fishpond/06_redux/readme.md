# Redux

## Redux 概述

`Redux` 是什么？
`Redux is a predictable state container for JavaScript apps`
定义有些抽象，简单来讲 redux 可以理解为基于 flux 和其他一些思想（Elm，函数式编程）发展出来的前端应用架构库，作为一个前端数据状态容器体现，并可以在 React 和其他任何前端框架中使用。
1. Redux概念
store: 同 flux，应用数据的存储中心
action: 同 flux ，应用数据的改变的描述
reducer: 决定应用数据新状态的函数，接收应用之前的状态和一个 action 返回数据的新状态。
middleware: redux 提供中间件的方式，完成一些 flux 流程的自定义控制，同时形成其插件体系。
2. Redux 三原则
Redux 相对于Flux架构的众多实现而言最典型的特点有如下三条：
1.	单一的Store
区别于 flux 模式中可以有多个 state，整个应用的数据以树状结构存放在一个 state 对象中。
2.	State只读
state 包含的应用数据不能随意修改，修改数据的唯一方式是 dispatch action，action 描述要修改的信息(这和 flux 架构上是一致的，不过在设计上更加严格，见后面的 reducer 设计)。
3.	数据的改变由纯函数生成
在 redux 中，应用数据的改变路径为:

1. store.dispatch(action)
2. newState = reducer(previousState, action)
3. reducer 为纯函数

纯函数是函数是编程的思想，只要参数相同，函数返回的结果永远是一致的，并且不会对外部有任何影响（不会改变参数对象的数据）。也就是说 reducer 每次必须返回一个新状态，新状态由旧状态和 action 数据决定。

3.	Redux Store
在 redux 中 store 作为一个单例，存放了应用的所有数据，对外提供了如下的 API：

1. 获取数据 store.getState()
2. 通过触发 action 来更新数据 store.dispatch(action)
3. pubsub 模式提供消息订阅和取消 store.subscribe(listener)
1.	创建并初始化Store
redux 提供 “createStore”方法来创建一个 store
	创建一个Store：
2.	触发 Action
redux 修改应用数据的唯一方式为 “store.dispatch(action)”
3.	消息订阅和取消
为了让用户监听应用数据改变，redux 在 store 集成了 pubsub 模式。
订阅：
取消：
4.	设计应用数据结构
下面是两个 redux 在设计 state 上的 tip:
1、业务数据和 UI 状态数据分离，尽量避免 UI 状态数据放在 store 中，即便放在 store 中也好和业务数据分离。
2、避免嵌套，在一个复杂的场景，数据对象可能很深，出现多层，那在设计的时候可以通过 id 的方式来引用，可以参考 normalizr 的简化方式
normalizr ：https://yq.aliyun.com/articles/3168 ( 一般场景不复杂可以不用使用 )
4.	Redux Action
我们已经知道 action 就是数据修改的描述信息，不过在实际使用过程中需要理解下面的这些规范：
1、action 描述数据结构
2、action 类型常量
3、action creator
1.	Action 描述数据结构
redux 对 action 对象的数据结构做了简单规范，每个对象必须包含一个字段 type，应用通过 type 来识别 action 类型，其他字段不做任何限制。
2.	Action类型常量
为了项目的规范，通常把 action type 定义为名称常量，放在一个单独的文件中管理，这在大型项目中是一个很好的习惯。
3.	Action creator
为了规范化 action 通过 action creator 来创建：
5.	Redux Reducer
reducer 应该是最为陌生的概念，理解 reducer 是理解 redux 的关键，牢记 reducer 决定应用数据的改变

首先 reducer 是一个纯函数，接收到之前的应用状态和 action 并返回一个新状态，为了每次返回一个新状态，可以通过 Object.assign() 方法返回一个新的对象，也可以使用 Immutable.js（我承诺一定会跟大家来讲一下）。
总结需要注意的点：
1、纯函数特性，不能修改 previewsState，不能调用异步 API，无论什么时候，传入相同的参数都能立即返回相同的结果（不能调用 Math.random, Data.now 这些函数，因为会导致不同的结果）
2、默认返回 previewsState (在 action 不会得到处理的情况)
3、处理 state 为 undefined 的情况

