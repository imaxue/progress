## 最近在使用Next.js,一个react的服务器端渲染的框架开发H5项目，其中遇到了一些复杂组件的编写，找了几个很有用的优秀组件

## 一、compnents

### 1、上拉加载下拉刷新组件：react-infinite-scroll-component

[react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component)

DEMO: 具体用法参考官网
```
<InfiniteScroll
     dataLength={list.length}
     next={this.fetchMoreData}
     hasMore={currentIndex === 0 ? hasMore1 : hasMore2}
     loader={<h4 style={{ textAlign: 'center' }}></h4>}
     endMessage={
      <p style={{ textAlign: 'center', fontSize: '.24rem' }}>
      </p>
     } >
     <div className={styles.listCss} style={{}}>
        {this.listMapHtml()}
     </div>
</InfiniteScroll>
```

### 2、teatarea的高度自适应：react-textarea-autosize

[react-textarea-autosize](https://github.com/andreypopp/react-textarea-autosize)
</br>

**这个组件非常友好react16以上的版本，相信你一定会涉及到类似于微信评论的组件开发** 

DEMO:
```
  textarea = React.createRef() as any
  /**
   * refs具有自动聚焦事件
   */
  setFocus() {
    if (this.textarea) {
      this.textarea.focus();
    }
  }
  
  /**
   * 清空输入框
   */
  __Clear() {
    if (!this.textarea) {
      this.updateRender();
      return;
    }
    this.textarea.value = '';
    this.updateRender();
  }
  
  /**
   * 点击发送事件
   * @private
   */
  handlerSubmit() {
    // console.log(this.textarea.value)
    const value = this.textarea.value || ''
    // if (!value || value === '') {
    //   alert('发表内容不能为空！')
    //   return
    // }
    const { onSubmit } = this.props as any
    if (!Utility.$isFunction(onSubmit)) {
      return;
    }
    onSubmit(value)
  }
  
  // 冒泡和捕获
  preventFn(e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  handlerBlur(ee) {
    const value = ee.target.value || ''
    // console.log(value)
    // 存储一下当前评论，如果有需要可以在聚焦的时候重新赋值
    localStorage.setItem('comment', value)
  }

  <Textarea 
     onBlur={(e) => this.handlerBlur(e)} 
     maxRows={3} maxLength={200} 
     inputRef={tag => (this.textarea = tag)} 
     style={{ width: '100%', height: '100%', minHeight: '.46rem', display: 'flex', padding: '3px', outlineStyle: 'none', outline: 'none',         color: '#333', fontSize: '.28rem', fontFamily: 'PingFangSC-Regular', border: '1px solid #999', borderRadius: '4px', lineHeight:           1.5 }} 
     placeholder=""
   />
```

### 3、实现点击自动复制的功能：react-copy-to-clipboard

[react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard)
</br>

**浏览器对这个的支持很友好，但是手机厂商可不那么友好，这个组件方案不错，你要实现复制的div是这个组件的children**

DEMO:
```
<CopyToClipboard text={this.state.value || 'copy'}
    onCopy={() => this.setState({copied: true})}>
    <span>Copy to clipboard with span</span>
</CopyToClipboard>
```

### 4、走马灯1（轮播图）：react-slick

[react-slick](https://github.com/akiran/react-slick)

DEMO
```
var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
      </Slider>
    );

```

### 5、走马灯2（轮播图）：nuka-carousel

[nuka-carousel](https://github.com/FormidableLabs/nuka-carousel)

**推荐指数：四颗星，antd-mobile的Carousel组件封装了这个** </br>

**dots: 你想要的提示或者图片进度条可以自己根据图片的长度自己模拟成想要的样式** </br>


DEMO
```
    <Carousel
            slideIndex={this.state.slideIndex}
            autoplay={false}
            swiping
            infinite
            afterSlide={slideIndex => this.setState({ slideIndex })}
            renderCenterLeftControls={({ previousSlide }) => (
              <button style={{ display: 'none' }} onClick={previousSlide}></button>
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <button style={{ display: 'none' }} onClick={nextSlide}></button>
            )}
          >
            {resImg && !!isArray(resImg.childs) && resImg.childs.map((item, index) => {
              { /* 下边的样式来调整轮播图片的缩放 */ }
              return (
                <div key={'childs_' + index} style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                  <img style={{ maxHeight: '100%', maxWidth: '100%', margin: 'auto' }} src={item && item.url !== '' ? item.url.replace('.webp', '') : ''} alt="" />
                </div>
              );
            })}
      </Carousel>
      
  // 模拟轮播进度条
  slidSlotHtml() {
    const { resImg } = this.props as any
    const { slideIndex } = this.state
    const childsLength = resImg && !!isArray(resImg.childs) && resImg.childs ? resImg.childs.length : 0;
    if (childsLength === 0) {
      return null
    }
    const list = new Array(childsLength).fill(1)
    if (!Utility.isArray(list)) {
      return null
    }
    return list.map((item, index) => {
      return (
        <div key={'dot_' + index} className={index === slideIndex ? styles.selectDot : styles.dotCss} ></div>
      )
    })
  }
  
```


### 6、走马灯3（轮播图）：react-swipe

[react-swipe](https://github.com/voronianski/react-swipe)

DEMO：
```
<ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
        <div>PANE 1</div>
        <div>PANE 2</div>
        <div>PANE 3</div>
</ReactSwipe>
```

### 7、alert弹窗组件

```
import { Component } from 'react'
import { render } from 'react-dom'

function alert(msg: string) {
    const box = document.createElement('div')
    document.body.appendChild(box)
    render(<Alert box={box} msg={msg} />, box)
}

function prompt(msg: string, inputVal: string, callback: (val: string) => void) {
    const box = document.createElement('div')
    document.body.appendChild(box)
    render(<Alert box={box} msg={msg} cancelButton="取消" okButton="确认" onOk={() => callback(inputVal)}>
        <div style={{ textAlign: 'left', lineHeight: 1.5 }}>
            <div>{msg}</div>
            <div style={{ marginTop: 15 }}>
                <input ref={e => e && e.focus()} defaultValue={inputVal} onChange={e => inputVal = e.target.value} style={{ border: 'none', fontSize: 14, display: 'block', borderBottom: '2px solid #aaa', outline: 'none', width: '100%' }} type="text" />
            </div>
        </div>
    </Alert>, box)
}

class Alert extends Component<{ msg?: string, onOk?: () => void, box?: HTMLDivElement, okButton?: string, cancelButton?: string, display?: boolean }> {
    alertContent?: HTMLDivElement
    bg?: HTMLDivElement
    state = {
        display: this.props.display,
    }
    static defaultProps = {
        display: true,
        msg: '',
    }
    componentDidMount() {
        if (this.state.display) this.show()
    }
    show = () => {
        setTimeout(() => {
            this.alertContent!.style.transform = 'translateY(0px)'
            this.alertContent!.style.opacity = '1'
            this.bg!.style.opacity = '1'
        })
    }
    close = (clear = true) => {
        this.alertContent!.style.transform = 'translateY(30vh)'
        this.alertContent!.style.opacity = '0'
        this.bg!.style.opacity = '0'
        if (clear) {
            setTimeout(() => {
                this.setState({ display: false })
                if (this.props.box) document.body.removeChild(this.props.box)
            }, 200)
        }
    }
    handleOk = () => {
        this.close()
        if (this.props.onOk) this.props.onOk()
    }
    componentWillReceiveProps(nextProps: any) {
        if (nextProps.display !== this.state.display) {
            if (nextProps.display) this.setState({ display: nextProps.display }, this.show)
            else {
                this.close(false)
                setTimeout(() => {
                    this.setState({ display: nextProps.display })
                }, 200)
            }
        }
    }

    render() {
        if (!this.state.display) return null
        let button
        if (this.props.okButton || this.props.cancelButton) {
            button = <div style={{ display: 'inline-flex', float: 'right' }}>
                <div onClick={() => this.close()} style={{ fontFamily: 'Helvetica, Arial', fontSize: 15, fontWeight: 200, color: 'rgb(0, 136, 255)', padding: '10px 10px 0px', cursor: 'pointer' }}>{this.props.cancelButton}</div>
                <div onClick={() => this.handleOk()} style={{ fontFamily: 'Helvetica, Arial', fontSize: 15, fontWeight: 200, color: 'rgb(0, 136, 255)', padding: '10px 10px 0px', cursor: 'pointer' }}>{this.props.okButton}</div>
            </div>
        } else {
            button = <div onClick={() => this.close()} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', textAlign: 'right', borderTop: '1px solid rgb(238, 238, 238)', marginTop: 10 }}>
                <div style={{ fontFamily: 'Helvetica, Arial', fontSize: 15, fontWeight: 200, color: 'rgb(0, 136, 255)', padding: '10px 20px 0px', cursor: 'pointer' }}>关闭</div>
            </div>
        }
        return (
            <div ref={e => this.bg = e!} onClick={e => e.nativeEvent.stopImmediatePropagation()} onScroll={e => e.nativeEvent.stopImmediatePropagation()} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10001,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(0,0,0,.1)',
                transition: 'opacity 0.2s',
                opacity: 0,
            }}>
                <div ref={e => this.alertContent = e!} style={{ position: 'relative', opacity: 0, transform: 'translateY(-20px)', transition: 'opacity 0.2s, transform 0.2s', backgroundColor: 'rgba(255, 255, 255, 0.95)', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 20px', borderRadius: 5, padding: 10, minWidth: 50, minHeight: 10, maxWidth: '60%', maxHeight: '90%' }}>
                    <div style={{ display: 'block', textAlign: 'center', fontFamily: 'Helvetica, Arial', fontSize: 15, fontWeight: 'normal', color: 'rgb(0, 0, 0)', cursor: 'default', padding: '2px 20px' }}>{this.props.children || this.props.msg}</div>
                    {button}
                </div>
            </div>
        )
    }
}

export {
    alert,
    Alert,
    alert as default,
    prompt,
}

```

DEMO:

```
import { alert } from './components/Alert'
alert('正在处理中,请稍后...')
```

### 8、多选框 单选样式

```
// 多选框 单选样式

import React, { Component } from 'react'

interface CheckBoxItem {
    label: string
    value: string | number

}
interface Props {
    options: CheckBoxItem[], value?: (string | number)[]
    onChange?: (value: (string | number)[]) => any
}
export default class CheckBox extends Component<Props, any> {
    handleClick = (value: string | number) => {
        let { value: values = [], options = [], onChange = new Function() } = this.props
        values = values.filter(val => options.some(option => option.value === val))
        if (values.includes(value)) {
            onChange(values.filter(item => item !== value))
        } else {
            onChange([...values, value])
        }
    }
    render() {
        return (
            <ul>
                {this.props.options.map(item => <li key={item.value} onClick={e => this.handleClick(item.value)} className={'ant-radio-button-wrapper' + (this.props.value && this.props.value.includes(item.value) ? ' ant-radio-button-wrapper-checked' : '')}>{item.label}</li>)}
            </ul>
        )
    }
}

```

DEMO:
```
import React, { Component } from 'react'
import { Radio } from 'antd'
import CheckBox from './components/checkBox'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default class Position extends Component<{ page: string, onChange?: (val: string | (string | number)[]) => any, value?: (string | number)[] }> {
    state = {
        listPageOptions: new Array(10).fill(0).map((item, index) => ({ label: index + '', value: index + '' }))
    }
    
    pageShowHandleChange = (val: string | (string | number)[]) => { // 详情页点击事件
        if (!Array.isArray(val)) val = [val]
        this.props.onChange && this.props.onChange(val)
    }

    listPageHandleChange = (values: (string | number)[]) => { // 列表页点击事件
        const lastVal = values.map((item: string) => parseInt(item, 10)).sort((x, y) => x - y)[values.length - 1]
        const options = new Array(10 + lastVal).fill(0).map((item, index) => ({ label: index + '', value: index + '' }))
        this.setState({listPageOptions: options})
        this.props.onChange && this.props.onChange(values)
    }

    render() {
        const { listPageOptions: options } = this.state
        const { page, value } = this.props
        if (!page) return null
        if (page === 'show') {
            const val = value && value[0]
            return (
                <RadioGroup value={val} onChange={(e: any) => this.pageShowHandleChange(e.target.value)}>
                    <RadioButton value="顶部">顶部</RadioButton>
                    <RadioButton value="内容中第一张图下面">内容中第一张图下面</RadioButton>
                    <RadioButton value="翻页上面">翻页上面</RadioButton>
                    <RadioButton value="翻页下面">翻页下面</RadioButton>
                    <RadioButton value="图+">图+</RadioButton>
                    <RadioButton value="推荐1">推荐1</RadioButton>
                    <RadioButton value="推荐2">推荐2</RadioButton>
                    <RadioButton value="推荐3">推荐3</RadioButton>
                    <RadioButton value="推荐4">推荐4</RadioButton>
                    <RadioButton value="推荐5">推荐5</RadioButton>
                    <RadioButton value="推荐6">推荐6</RadioButton>
                    <RadioButton value="推荐7">推荐7</RadioButton>
                    <RadioButton value="推荐8">推荐8</RadioButton>
                    <RadioButton value="推荐9">推荐9</RadioButton>
                    <RadioButton value="推荐10">推荐10</RadioButton>
                </RadioGroup>
            )
        } else {
            return <CheckBox value={value} onChange={this.listPageHandleChange} options={options as any} />
        }
    }
}

```


## 二、JS：

### 1、是否是数组

```
/**
  * 是否是数组
  * @param obj
  * @returns {boolean}
  */
function isArray(obj) {
  if (!obj || !obj.length || obj.length === 0) {
    return false;
  }
  return Array.isArray(obj);
}
```

。。。。



