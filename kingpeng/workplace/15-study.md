## 信息流页面的图片懒加载，除首屏

### 目的：解决首屏加载，节省带宽请求，海外还可节省cdn

### demo：

```

import React, { PureComponent } from "react";
import ReactDOM from 'react-dom'
import debounce from 'lodash.debounce'

/**
 * @param {el}  HTMLElement
 * @param {offset} number 偏移量
 */
function isExposure(el: HTMLElement, offset = 0) {
    if (typeof window === "undefined" || !el) { return false; }
    const rect = el.getBoundingClientRect();
    const htmlClientHeight = document.documentElement!.clientHeight;
    const htmlClientWidth = document.documentElement!.clientWidth;
    return rect.bottom > -offset && rect.top < htmlClientHeight + offset && rect.right > -offset && rect.left < htmlClientWidth + offset;
}

interface IProps {
    height: number
    src: string
}

const state = {
    shouldShow: false,
}

export default class extends PureComponent<IProps, typeof state> {
    state = state
    ele: HTMLElement
    private docScroll = debounce(() => {
        if (!this.ele) return; 
        if (isExposure(this.ele, 500) && !this.state.shouldShow) {
            const img = new Image();
            img.src = this.props.src;
            img.onload = () => {
                this.setState({ shouldShow: true });
            };
            document.removeEventListener("scroll", this.docScroll);
        }
    }, 100);
    componentDidMount() {
        this.ele = ReactDOM.findDOMNode(this) as any
        this.docScroll()
        document.addEventListener('scroll', this.docScroll)
    }

    render() {
        return (
            <div className="root">
                {this.state.shouldShow && this.props.children}
                <style jsx>{`
                    .root{
                        min-height: ${this.props.height}px;
                    }
                    @keyframes fadeIn{
                        from {opacity: 0;}
                        to {opacity: 1;}
                    }
    
                    .root :global(img) {
                        animation: fadeIn .6s;
                    }
                `}</style>
            </div>
        )
    }
}

```

### example:

```
{index === 0 ? <img src={imgUrl} /> :
   <LazyLoad src={imgUrl} height={250}>
      <img src={imgUrl} >
   </LazyLoad>}

```
