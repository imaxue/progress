# 前言
对于react来说，将UI与业务分离的方法一直在演进，从早期的``mixins``到``HOC``再到今天说的**render prop**

# 什么是render prop?
这是一个组件间共享代码逻辑的技巧，通过将props传递给函数来实现，我们熟悉的``react-router``就采用了这样的方式

>Next time you think you need a HOC (higher-order component) in @Reactjs, you probably don't.

这是react-router的作者``Michael Jackson``在其twitter上说过的一句话，翻译过来的意思是：

>下次你想使用HOC解决问题时，其实大半不需要

也从侧面体现了其对``render prop``的拥护

# 使用场景
一个日常的使用场景是弹窗。App的弹窗UI可能千奇百怪，但它们的功能却是类似的：无非有个显示隐藏的状态，和一个控制显隐的方法
```js
class Pop extends React.Component {
    state = {
        visibile: false
    }

    toogle = () => {
        const { visibile } = this.state
        this.setState({
            visibile: !visibile
        })
    }

    Modal = ({title, children}) => (
        <div className="container" onHide={this.toogle}>
            <h1 className="title">{title}</h1>
            <div className="content">{children}</div>
        </div>
    )

    Button = ({children}) => (
        <button onClick={this.toogle}>{children}</button>
    )

    render() {
        return this.props.render({
            Modal,
            toogle
        })
    }
}

ReactDOM.render(
    <React.Fragment>
        <Pop render={
            ({toogle, Modal}) => {
                <button onClick={toogle}>Click Me!</button>
                <Modal title="123">
                    <p>巴拉巴拉...</p>
                    <p>巴拉巴拉...</p>
                    <p>巴拉巴拉...</p>
                </Modal>
            }
        } />
    </React.Fragment>,
    document.getElementById('root')
)
```
上面这段代码就封装了一个常见的Modal与弹窗逻辑，这就是一个典型的使用场景

# 总结
如果在项目中常用到对于逻辑的封装，那么Render Props是一个非常好用的解决思路，对于逻辑的处理，还有新出``react hooks``，这个下次再讲
