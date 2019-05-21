### React上拉加载LoadUp组件

思路：其实很简单，监听scroll事件，上拉元素在视图中，当偏移量在屏幕占比的百分之多少的时候，做到数据的提前加载！

```

import debounce from "lodash.debounce";
import { PureComponent } from "react";
import styled from "styled-components";
import isExposure from "../../lib/isExposure";

const LoadUpBox = styled.div`
    height: 35px;
    text-align: center;
    img{
        height: 100%;
    }
`;

const NoMore = styled.div`
    text-align: center;
    font-size: 20px;
    color: #888888;
    margin: 15px 3vw;
    .img{
        height: .9rem;
        align-items: center;
        display: flex;
        margin-bottom: 10px;
        img{
            height: .9rem;
            flex: none;
            margin: .2rem
        }
        div{
            border-top: 1px solid #D8D8D8;
            flex: auto;
        }
    }
`;

export default class LoadUp extends PureComponent<{ hasMore: boolean, loadMore: () => void }> {
    private loadImg: HTMLImageElement | null = null;
    public static defaultProps = {
        hasMore: true,
        loadMore: new Function(),
    };
    public loadMore = debounce(() => {
        if (isExposure(this.loadImg!, 80)) { this.props.loadMore(); }
    }, 100);
    public componentDidMount() {
        this.loadMore()
        document.addEventListener("scroll", this.loadMore);
    }
    public componentWillUnmount() {
        document.removeEventListener("scroll", this.loadMore);
    }
    public render() {
        if (!this.props.hasMore) { return <NoMoreBox />; }
        return (
            <LoadUpBox>
                <img ref={loadImg => this.loadImg = loadImg} src="/img/loading.gif" alt="" />
            </LoadUpBox>
        );
    }
}

const NoMoreBox = () => (
    <NoMore>
        <div className="img">
            <div></div>
            <img src="/img/no_more.png" />
            <div></div>
        </div>
        <div>没有更多了</div>
    </NoMore>
);


```


#### isExposure用来判断当前元素是否在视图中


````
// https://github.com/Aimeejs/isExposure/blob/master/isExposure.js

/**
 * @param {Element} el html element
 * @param {number} offset 偏移量
 */
export default function isExposure(el: HTMLElement, offset = 0) {
    if (typeof window === "undefined" || !el) { return false; }
    const rect = el.getBoundingClientRect()
    const htmlClientHeight = document.documentElement!.clientHeight
    const htmlClientWidth = document.documentElement!.clientWidth
    return rect.bottom > -offset && rect.top < htmlClientHeight + offset && rect.right > -offset && rect.left < htmlClientWidth + offset
}

```




