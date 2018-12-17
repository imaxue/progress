>特此总结一下父子(孙)组件互相传值的问题，以react16作为节点，context特性的使用和升级迁移

## 老context特性

### 作为最初(React16之前)解决父子(孙)组件传值的特性，以下是使用实例：

#### 1、爷爷组件：ParentPage.tsx

```
import { Component } from 'react'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import Son from './Son'

export default class ParentPage extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            Onload: true,
            NextT: true,
            isMount: false,
        }
    }
    typeName = ''
    cp = ''
    firstImageId = ''
    // 通过这个方法给孙子组件传值
    getChildContext() {
        return {
            article: this.props.article,
            sendTrack: () => {
                this.setState({})
                sendTrack(this.typeName, this.cp, this.firstImageId)
            },
            shareFn: (e) => {
                this.handlerToShare(e)
            },
            eid: this.props.query.eid,
            isRefresh: false
        }
    }
    >// 传递给孙子组件的属性校验,必须要在父组件中做属性校验
    static childContextTypes = {
        article: PropTypes.any,
        sendTrack: PropTypes.func,
        shareFn: PropTypes.func,
        eid: PropTypes.any,
        isRefresh: PropTypes.any,
    }
    
    componentWillMount() {
    }

    componentDidMount() {
        this.state.isMount = true;
    }

    componentWillUnmount() {
        delete this.state.isMount
        document.removeEventListener('scroll', this.scroll)
    }

    // 更新渲染
    updateRender() {
        if (this.state.isMount) {
            this.setState({ CURRENT_DATE: new Date().getTime() });
        }
    }

    private goPage = (pageNumber) => {
        sendTrack(this.typeName, this.cp, this.firstImageId)
    }

    // 展开回调
    handerExpand(type) {
        if (type && type === '1') {
            this.setState({ isShowShare: true})
        }
    }

    render() {
        const { } = this.props as any
        const { } = this.state as any
        return (
            <div ref={e => this.bottomRed = e} className='bottomRed'>
                 <Son onExpand={this.handerExpand.bind(this)} eid={eid} collapse={true}  ads={[]} images={[]} title={title || ''} style={{ margin: 0 }} />
            </div>
        )
    }
}

```

#### 2、父（子）组件：Son.tsx

```
import { Component } from 'react'
import * as React from 'react'
import * as PropTypes from 'prop-types'

class Son extends Component<{ onExpand: (any) => any, collapse: boolean, ads: any[], images: any[], style: any, eid?: any, title?: string }, {}> {
    state = {
        height: this.props.collapse ? '120vh' : 'auto',
    }

    expand = () => {
        this.setState({ height: 'auto' })
        this.props.onExpand('1')
    }

    expen() {
        this.setState({
            addown: true,
        })
    }

    render() {
        const images = this.props.images
        const { ads, eid, title } = this.props
        return (
            <div style={{ height: this.state.height, overflow: 'hidden', position: 'relative', ...this.props.style }}>
                <div>content</div>
                {this.state.height !== 'auto' && <Children expand={this.expand} expen={this.expen.bind(this)} eid={eid}/>}

            </div>
        )
    }
}

// 孙子组件
class Children extends Component<{ expand: () => any, expen: () => any, eid?: any }> {
    // 在孙子组件中同样也要做属性的检验
    static contextTypes = {
        article: PropTypes.any,
        sendTrack: PropTypes.func,
        shareFn: PropTypes.func,
    }
    static defaultProps = {
        expand: new Function(),
        expen: new Function(),
    }
    expand = () => {
        this.context.sendTrack()
        this.props.expand()
        this.props.expen()
    }
    shareFn = (e) => {
        this.context.shareFn(e)
    }
    render() {
        return (
            <div style={{ position: 'absolute', bottom: 0, background: '#ffffff', width: '100%' }}>
                <div className="unfold-field">
                    <div className="unflod-field__mask"></div>
                    <div className="expand_box" style={{ display: 'flex', justifyContent: 'center'}}>
                        <div className="expand" onClick={this.expand} >
                            展开剩余
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Son

```

>以上流程就是爷孙组件之间的互相传值

#### 总结：

##### 父子之间通讯

>父子之间通讯又分为父->子，子->父。

>因为react单向数据流向的缘故，父->子通信的话直接通过props。父组件数据变动，直接传递给子组件。

>子->父组件之间就要通过回调函数来通信了，父组件传递一个回调函数给子组件，子组件通过调用此函数的方式通知父组件通信。

* 1、父子组件之间通信：通过pros和回调函数的方式

* 2、爷孙组件之间通信：通过使用context特性的方式，主要是属性的校验和api的使用

#### 跨级组件通信

>react为了实现祖先组件和后辈组件之间的通信问题，引入了contextApi。

#### 没有嵌套关系组件之间通信

>组件之间通信最主流的两种方式脱胎于观察这模式和中介者模式这两种。

>跨级之间通信现在最主流的方式就是观察这模式的实现Pub/Sub，react社区中的redux也是使用这种方式实现的。

--- 如果你的项目还没有做react升级，可以试试这种方法，当然你可以用状态管理来实现（Redux ／ mobx）---





