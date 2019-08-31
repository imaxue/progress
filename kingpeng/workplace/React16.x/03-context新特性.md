>使用前提：React16以上版本，这种方式更好

>参考：[context-新特性](https://react.docschina.org/docs/context.html#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8-context)

## context新特性

### 1、父（爷）页面：ParentPage.tsx

```
import axios from 'axios'
import debounce from 'lodash.debounce'
import { Component } from 'react'
import { Provider } from './ArticleContext'
import Son from './Son'

export default class ParentPage extends Component<any, any> {
    public static async getInitialProps({ res, query }) {
        return { query, ...res.locals }
    }
    public state = {
    }

    public scroll = debounce(() => {
       
    }, 50)

    public componentDidMount() {
        const { query, city } = this.props
        // 监听页面滚动
        document.addEventListener('scroll', this.scroll)
    }

    public componentWillUnmount() {
        document.removeEventListener('scroll', this.scroll)
    }


    // 展开回调
    public handerExpand(type) {
        if (type && type === '1') {
            this.setState({ isShowShare: true })
        }
    }

    public render() {
        const { article, list, ads, query: { eid } } = this.props as any
        const {  } = this.state
        return (
            <Provider value={{
                article: this.props.article,
                sendTrack: () => {
                    sendTrackPageShow(this.typeName, this.props.article.cp, this.props.article.title)
                },
                shareFn: (e) => {
                    this.handlerToShare(e)
                },
                eid: this.props.query.eid,
                isRefresh: false,
            }}>
                <div ref={e => this.bottomRed = e} className='bottomRed'>
                    <Son onExpand={this.handerExpand.bind(this)} eid={eid} collapse ads={this.props.ads} images={article.cmsImages} title={article.title || ''} style={{ margin: 0 }} />
                </div>
            </Provider>
        )
    }

    private goPage = (pageNumber) => {
        sendTrackPageShow(this.typeName, this.props.article.cp, this.props.article.title)
    }
}

```

### 2、React.createContext： ArticleContext

```
import { createContext } from 'react'

const { Provider, Consumer } = createContext<{
    article?: any,
    sendTrack?: any,
    shareFn?: any,
    eid: string,
    isRefresh?: boolean,
}>({ eid: '0' })

export {
    Provider, Consumer,
}


```

### 3、父（孙子）组件：Son.tsx

```
import { Component } from 'react'
import React from 'react'
import { Consumer } from './ArticleContext'

class Son extends Component<{ onExpand: (a: any) => any, collapse: boolean, ads: any[], images: any[], style: any, eid: string, title?: string }, {}> {
    public contentEle // 内容区域
    public state = {
        height: this.props.collapse ? '120vh' : 'auto',
        addown: false,
    }

    public expand = () => {
        this.setState({ height: 'auto' })
        this.props.onExpand('1')
    }

    public expen() {
        this.setState({
            addown: true,
        })
    }

    public render() {
        const images = this.props.images
        const { ads, eid, title } = this.props
        return (
            <div className='article-content' style={{ height: this.state.height, overflow: 'hidden', position: 'relative', ...this.props.style }}>
                <div>content</div>
                </section>)}
                {this.state.height !== 'auto' && <Chilren expand={this.expand} expen={this.expen.bind(this)} eid={eid} />}
            </div>
        )
    }
}

// 展开折叠组件
class Chilren extends Component<{ expand: () => any, expen: () => any, eid?: any }> {
    public static defaultProps = {
        expand: new Function(),
        expen: new Function(),
    }
    public expand = () => {
        this.props.expand()
        this.props.expen()
    }
    public render() {
        return (
            <Consumer>
                {context => (
                    <div style={{ position: 'absolute', bottom: 0, background: '#ffffff', width: '100%' }}>
                        <div className='unfold-field'>
                            <div className='unflod-field__mask'></div>
                            <div className='expand_box' style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='expand' onClick={() => { this.expand(); context.sendTrack() }} >
                                    展开剩余
                            </div>
                                <div onClick={context.shareFn} className='expand' style={{ marginLeft: 10 }} >
                                    分享领红包
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Consumer>
        )
    }
}

export default Son

```

>Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。

>在一个典型的 React 应用中，数据是通过 props 属性由上向下（由父及子）的进行传递的，但这对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI主题），这是应用程序中许多组件都所需要的。 Context 提供了一种在组件之间共享此类值的方式，而不必通过组件树的每个层级显式地传递 props 。
