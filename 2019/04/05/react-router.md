##### <Prompt>

> 当离开一个页面的时候，进行的提醒

        <Prompt
        when={true}
        message={'are you sure to leave'}
        message={(location) => location.pathname.startWidth('app') ? true : 'are you sure you want to go to ${lacation.pathname}'}>


#### <Route>

* <Route path='/path' component={React.Element}> 
> 每次render的时候都会创建一个新的component

* <Route path='/path' render={({match, location, history}) => {}}>
> inline rendering,可通过function。。。

* <Route children={({match, location, history}) => (<animate>{match && <something>}</animate>)}>
> 无论路径皮比匹配，总是会渲染，适用于切换页面时的animation

* <Route path='/path' children={({match}) => <li className={match ? 'active' : ''}/> }>
> 路径匹配失败，则match为null, 适用于动态标注连接



##### withRouter

> 为什么withRouter要包在connect外面： 
    
* 避免更新受阻: 因为react-router的connect高阶组件会为传入的参数组件进行shouldComponentUpdate()钩子函数比较。未防止location被浅比较拦截出去(即使url变化，也无法重新渲染)

> 组件如何拿到location对象

* 直接通过<Route>渲染的组件

        // 当 url 变化时，<Blocker> 的 location 属性一定会变化，通过this.props.location获得
        <Route path='/:place' component={Blocker}/>

        // 不传path属性的<Route>组件，总是会渲染
        <Route component={Blocker}/>

* 使用withRouter高阶组件包裹，会给组件传入location、history、match属性

        const BlockerCom = withRouter(Blocker)

> withRouter()高阶组件的实现源码(抽离简易版)

        const withRouter = (Component) => {
            return <Route
                    children={routeProps => (
                        <Component {...routeProps}/>
                    )}>
        }

