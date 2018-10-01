# 前言
在router3.x中，提供了``getComponent``方法，可以在该方法内对组件进行异步加载处理，但是升级到4.x后移除了这个方法，我们就需要采用其他的方式进行处理了

# 异步组件
现在市面上常用的解决方案是采用``asyncComponent``（即异步组件）的方式进行处理，相关代码如下：
```js
import React 'react'

export default class asyncComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            mod: null
        }
    }

    componentWillMount() {
        // 调用自身的load方法，props里有异步加载方法
        this.load(this.props)
    }
    // 应对动态加载
    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        })
        // 在使用的时候采用import()方式加载组件，返回的是一个Promise对象
        props.load().then(mod => {
            this.setState({
                mod: mod.default ? mod.default : mod
            })
        })
    }

    render() {
        // 如果能正常加载到组件，则调用children方法（children是一个传入的函数），并把组件作为参数传入
        return this.state.mod ? this.props.children(this.state.mod) : null
    }
}
```
使用方式如下：
```js
import React from 'react'
import AsyncComponent from 'utils/AsyncComponent'

// 以加载Home组件为例
export const Home = props => (
    <AsyncComponent load={() => import('containers/Home/Home')}>
        {Component => <Component {...props} />}
    </AsyncComponent>
)
```