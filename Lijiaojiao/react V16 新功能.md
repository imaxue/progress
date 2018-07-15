#react v16 新功能（不断添加）

#1.createPortal  

可以翻译为‘传送门’，类似于科幻电影中的传送门，一个人从这个门进入，从另外一个门走出
此次功能的增加主要是解决 类似Dialog 的弹出框一类的定位问题,由于弹框之类的浮层，需要加定位，
希望从Dialog往上一直到body没有其他postion是relative的元素干扰，但是多层嵌套不能保证其父组件，爷组件没有定位等，
所以加入传送门之后，在React组件树的最顶层留一个元素专属于Dialog，
然后通过Redux或者其他什么通讯方式给这个Dialog发送信号，让Dialog显示或者不显示。

在V16之前是通过两个秘而不宣的React API
.unstable_renderSubtreeIntoContainer
.unmountComponentAtNode
前缀可以看出不推荐使用
这个API的作用就是建立“传送门”，可以把JSX代表的组件结构塞到传送门里面去，让他们在传送门的另一端渲染出来。
第二个unmountComponentAtNode用来清理第一个API的副作用，通常在unmount的时候调用，不调用的话会造成资源泄露的。


使用代码如下：
import React from 'react';
import {createPortal} from 'react-dom';

class Dialog extends React.Component {
  constructor() {
    super(...arguments);

    const doc = window.document;
    this.node = doc.createElement('div');
    doc.body.appendChild(this.node);
  }

  render() {
    return createPortal(
      <div class="dialog">
        {this.props.children}
      </div>, //塞进传送门的JSX
      this.node //传送门的另一端DOM node
    );
  }

  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }
}
