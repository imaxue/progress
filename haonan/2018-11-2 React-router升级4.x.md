# 前言
最近把手里的项目做了升级，路由自然也是跑不了，记录下3-4的升级过程

---
# 3 Vs 4
3与4之间最大的差别，便是去掉了钩子函数,当匹配到路由规则后,直接渲染对应的组件：
+ 在3里面，当路径匹配之后, Route会首先触发其**onEnter**钩子，
+ 在这个钩子里面，我们可以做一些自己的业务逻辑，比如获取用户数据、鉴权等操作
+ **我们可以等这些异步操作完成之后调用回调函数，等回调函数触发后才会渲染目标组件**
+ 换句话说如果没有触发**next()**,所有对应的路由组件都不会渲染

而在4中：
+ 这些on钩子都被去掉了
+ 当路径被匹配到之后，关联的路由组件直接渲染
+ 这时候需要转变思路了，我们要把之前的钩子逻辑放到这个组件的 **componentWillMount**或者**componentDidMount**里面

# OuterComponent
当用户在浏览器中输入`/home/a`时，对于3来说，我们设置了**onEnter**钩子，在钩子中判断是否应该进入该页面，如果进入的错误我们可以进行其他操作。对于4来说，当我们没有钩子的时候就需要使用`OuterComponent`来处理逻辑问题了
```js
import React from 'react';
import { Route } from 'react-router-dom';
import ApplyInit from 'containers/Apply/ApplyInit/ApplyInit';

export default class OuterComponent extends React.Component {
    // 其实OuterComponent就相当于一个大容器，用来处理该路由大类下的业务逻辑
    componentDidMount() {
        this.init()
    }

    init = () => {
        const { history } = this.props;
        const replace = history.replace;

        if (xxx) {
            replace('xxx')
        }
    }

    render() {
        return (
            <React.Fragment>
                <Route path='/index' component={ApplyInit} />
            </React.Fragment>
        )
    }
};
```
