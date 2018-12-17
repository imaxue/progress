#react v16 新功能（不断添加）

# 2.Fragment

React 中常见模式是为一个组件返回多个元素。为了包裹多个元素你肯定写过很多的 div 和 span，
进行不必要的嵌套，无形中增加了浏览器的渲染压力
render 函数的返回必须有一个根节点，否则报错
react 16开始， render支持返回数组

```
import React from 'react';

export default function () {
    return [
        <div>一步 01</div>,
        <div>一步 02</div>,
        <div>一步 03</div>,
        <div>一步 04</div>
    ];
}
```
不想写数据，可以使用Fragments 
类似VUE的template 

```
import React from 'react';

export default function () {
    return (
        <React.Fragment>
            <div>一步 01</div>
            <div>一步 02</div>
            <div>一步 03</div>
            <div>一步 04</div>
        </React.Fragment>
    );
}
```

> Fragments简写形式<></> ,用空tag的写法不允许有key和属性，而且还有很多工具不支持

```
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```



# 1.createPortal  

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
