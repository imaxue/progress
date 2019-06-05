### 3、居中裁剪：等比例不失真 (transform)

**推荐这个**

```

a、横向拉伸，剪裁上下

.imgCss {
    height: 5rem;         // 固定高度裁剪，给父盒子高度
    overflow: hidden;

    > img {
    width: 100%;    // 宽度填充
    display: block; // 兼容底部的间隙
    position: relative; // 裁剪图片
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    transform: translateY(-50%);
    }
}

<div className={styles.imgCss}>
    <img src={item && item.smallUrl !== '' ? item.smallUrl.replace('.webp', '') : ''} alt="" />
</div>

b、纵向拉伸，裁掉左右
const fadeIn = keyframes`
    from {opacity: 0;}
    to {opacity: 1;}
`;

.groupImageBox{
    ${props => props.isRounded ? "border-radius:8px" : ""};
    position: relative;
    overflow: hidden;
    /* .groupImage {
        ${props => props.isRounded ? "border-radius:8px" : ""};
        display: block;
        width: 100%;
        animation: ${fadeIn} .6s;
        height: auto;
        position: relative;
        top: 50%;
        min-height: 100px;
        transform: translateY(-50%);
    } */
    .groupImage { 纵向拉伸，裁掉左右
        border-radius: 8px;
        display: block;
        width: auto;
        min-width: 100%;
        animation: ${fadeIn} .6s;
        margin-left: 50%;
        transform: translateX(-50%);
    }
}

<div className="groupImage" >
     <Img
         key={childImg.imgId}
         className="groupImage"
       />)}
</div>

class Img extends PureComponent<{ src?: string, className?: string }> {
    public state = {
        src: this.props.src,
    };
    public componentWillReceiveProps(nextProps) {
        if (nextProps.src && !this.state.src) {
            this.setState({ src: nextProps.src });
        }
    }

    public render() {
        return (
            <img className={this.props.className} src={this.state.src} />
        );
    }
}

```