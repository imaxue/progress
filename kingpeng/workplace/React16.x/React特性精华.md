
## 1. 性能优化
  
  虽然 props 由React本身设置以及 state 用于存储状态，但如果需要存储不用于视觉输出的东西，则建议通过手动向类或实例中添加相应属性来存储，而不应用 state 和 props 来存储；
如果在组件的钩子方法shouldComponentUpdate中返回false，则React不会对该组件及其子组件进行变化检查和渲染，所以，应在组件不需要更新的情况下，让钩子方法shouldComponentUpdate内返回false；
因为 React.PureComponent 类型的组件在做变化检查时是用浅比较来判断是否有变化的，所以性能较快，所以：对于没有必须进行深比较的组件，优先使用 React.PureComponent 而不是 React.Componen；
合理的使用key；

## 2. JSX语法

  JSX 语法的解析规则是：遇到 XML 标签 <...>，以 XML 规则解析；遇到代码块 {...}，就用 JavaScript 规则解析；
在JSX中，XML可以理解为是创建虚拟DOM对象的字面量写法；在编译之后呢，XML标签 会被转化为 React.createElement() 函数的调用；
下面两种代码的作用是完全相同的：
```
const element = (
    <h1 className="greeting">
    Hello, world!
    </>
 );
等效于：
const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
 );
 
 ```
React.createElement() 这个方法首先会进行一些避免bug的检查，之后会返回一个类似下面例子的对象：
 // 注意: 以下示例是简化过的（不代表在 React 源码中是这样）
 
 ```
 const element = {
     type: 'h1',
     props: {
         className: 'greeting',
         children: 'Hello, world'
     }
 };
 
 ```
 
  这样的对象被称为 “React 元素”。它代表所有你在屏幕上看到的东西。React 通过读取这些对象来构建 DOM 并保持数据内容一致。
JSX 允许直接在模板插入 JavaScript 变量；如果这个变量是一个数组，则会展开这个数组的所有成员；
如果 JSX 中的XML带有换行，则推荐，有XML的外面加上一个小括号，这样可以防止 分号自动插入 的bug；
在JSX中的XML，通过引号定义以字符串为值的标签属性：const element = <div tabIndex="0"></div>;，通过大括号来定义以 JavaScript 表达式为值的标签属性：const element = <img src={user.avatarUrl}></img>;；切注意：如果使用了大括号包裹的 JavaScript 表达式时就不要再到外面套引号了。JSX 会将引号当中的内容识别为字符串而不是表达式；
JSX不允许没有闭合的标签；
  因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 XML 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称;例如：class 用 className 代替，而 tabindex 用 tabIndex 代替；
React DOM 在渲染之前默认会 过滤 所有传入的值。它可以确保应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击；

## 3. 注释

  由于JSX的本质是JavaScript，所以在JSX中的注释还是JavaScript的注释；为了JSX的XML中使用注释，所以需要用先用花括号{}产生JavaScript环境，然后在{}内使用JavaScript注释；
所以，关于的注释的规则总结如下：

在标签内部的注释需要花括号{}括住；
在标签外的注释不使用花括号{}；

## 4. React元素

  元素是构成 React 应用的最小单位；元素用来描述你在屏幕上看到的内容，如下：const element = <h1>Hello, world</h1>;；
React元素与浏览器的 DOM 元素不同，React 当中的元素事实上是普通的对象，React DOM 可以确保 浏览器 DOM 的数据内容与 React 元素保持一致；
React 元素都是不可变的。当元素被创建之后，是无法改变其内容或属性的。一个元素就好像是动画里的一帧，它代表应用界面在某一时间点的样子。更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法；在实际生产开发中, 大多数React应用只会调用一次 ReactDOM.render()；
在更新视图时，React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分；
JSX 的标签名决定了 React 元素的类型；小写开头的 JSX 标签名表示一个原生HTM元素，即内置的组件，如 <div> 或 <span>，在编译时，会将字符串 'div' 或 'span' 传 递给 React.createElement 方法；大写开头的 JSX 标签名表示一个 React 组件，如 <Foo />，在编译时，会被编译为同名变量并被引用，如 React.createElement(Foo)，所以如果使用了 大家开头的标签，如：<Foo />，则必须在作用域中先声明与该标签名同名的变量，如 Foo 变量；
由于 JSX 编译后会调用 React.createElement 方法，所以在 JSX 代码中必须首先声明或导入 React 变量；
JSX 的标签名可以是打点的属性调用；如： <MyComponents.DatePicker color="blue" />；但不能是表达式，如：<MyComponents["DatePicker"] color="blue" /> 是错误的；

## 5. 组件

  从概念上看组件就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素；
当React遇到的元素是用户自定义的组件时，它会将标签的所有标签属性作为单个对象传递给该组件构造函数,这个对象称之为“props”；
在组件内部，不允许修改props；
可以通过props.children获取组件元素的开关标签之间的内容；
组件可以嵌套；
唯一一种在 React 之外获取 React 组件实例句柄的方式就是保存 React.render 的返回值。在其它组件内，可以使用 refs 得到相同的结果；
定义组件的方式：
用函数定义组件：
定义一个组件最简单的方式是使用JavaScript函数：
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
 }
该函数是一个有效的React组件，它接收一个单一的“props”对象并返回了一个React元素。我们之所以称这种类型的组件为函数定义组件，是因为从字面上来看，它就是一个JavaScript函数。
通过 ES6 class 来定义组件：
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
     }
 }
组件的渲染
组件通过触发组件实例的render方法渲染自己；
每个组件在渲染时也会触发子组件的render方法渲染子组件；
根组件需要通过ReactDom.render方法把自身添加到指定的Dom元素上，并渲染自己；
组件类的顶层标签只能有一个；
如果 render 返回 null，则不会渲染该组件，但并不会影响该组件生命周期方法的回调；
在切换组件时，会先创建和挂载新组件，然后再卸载被替换掉的组件；

## 6. 标签属性

  在 JSX 中有如下几种不同的方式来指定标签属性：

使用 JavaScript 表达式
可以传递任何 {} 包裹的 JavaScript 表达式作为一个标签属性值，如： <MyComponent foo={1 + 2 + 3 + 4} />，表达式的值最终会被赋给相应的标签属性。if 语句和 for 循环在 JavaScript 中不是表达式，因此它们不能直接用在标签属性中；
字符串常量
可以将字符串常量作为标签属性值传递。当你传递一个字符串常量时，它不会对其进行 HTML 转义，所以下面几个 JSX 表达式是等价的：
<MyComponent message="<3" />
<MyComponent message="<3" />
<MyComponent message={'<3'} />
默认为 True
如果没有给标签属性传值，则它默认为 true。因此下面两个 JSX 是等价的：
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
扩展属性
在 JSX中，你可以使用 ... 作为扩展操作符来传递整个属性对象。
下面两个组件是等效的：
```
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

## 7. 元素的子代

  在 JSX 中，开始标签和结束标签之间的子代内容会作为props.children传递；开始标签和结束标签之间可以是任何类型的东西，只要该组件在 React 渲染前能将其转换成 React 能够理解的东西即可；

例如，可以传递如下类型的子代：

字符串常量：如果在开始和结束标签之间放入一个字符串，则 props.children 就是那个字符串；因为 HTML 未被转义，所以可以像写 HTML 一样写 JSX；JSX 会移除行空行和开始和结尾处的空格。标签邻近的新行也会被移除，字符串常量内部的换行会被压缩成一个空格；
JSX：可以开始和结束标签之间嵌入更多的 JSX 元素；
JavsScript 表达式：可以将任何 {} 包裹的 JavaScript 表达式作为子代传递；
函数：可以将用 {} 包裹的函数作为子代传递；
布尔值、Null 和 Undefined 被忽略：
false、null、undefined 和 true 都是有效的子代，但它们不会直接被渲染；而当子代是React 提供的一些 "falsy" 值 （即：除了false 外，0，“”，null，undefined 和 NaN）时，则会被渲染；
下面的表达式是等价的：
 ```
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

## 8. props的类型检查

  要给组件的props限制类型，则需要设置组件类的propTypes属性；
示例代码：

```
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string,
  children: PropTypes.element.isRequired
};
可以通过设置propTypes的children属性 propTypes.children 来限传入的子代内容；
```
## 9. props的默认值

要给组件的props设置默认值，则需要设置组件类的defaultProps属性；
defaultProps 用来确保 this.props.name 在父组件没有特别指定的情况下，有一个初始值。类型检查发生在 defaultProps 赋值之后，所以类型检查也会应用在 defaultProps 上面；
示例代码：
```
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 为属性指定默认值:
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染 "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```
## 10. 状态state

构造函数是唯一能够初始化 this.state 的地方；
直接更新状态不会重新渲染组件，如：this.state.comment = 'Hello';；应当使用 setState()设置状态，如：this.setState({comment: 'Hello'});；
状态更新可能是异步的；React 可以将多个setState() 调用合并成一个调用来提高性能。因为 this.props 和 this.state 可能是异步更新的，所以不应该依靠它们的值来计算下一个状态，如：
//错误的示范
this.setState({
    counter: this.state.counter + this.props.increment,
 });
应该给 setState() 传一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，如：
//正确的示范
this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
 }));
上方代码使用了箭头函数，但它也适用于常规函数；
当你调用 setState(参数对象) 时，参数对象中的属性会完全替换掉this.state中相应的属性；

## 11. Props和State

Props是组件实例的标签属性的集合；它可以接收组件外传进来的值，在组件内部是不可修改Props的属性的，在组件外部可以通过标签属性给它赋值，所以可以用来从组件外部给组件内部传值；
State是组件实例的内部数据的集合；在组件内部是可以更改State的属性的值，且每次更改后，都会触发render方法渲染组件；
组件的标签属性在使用前不用先定义；而组件的内部数据State的属性在使用前需要先通过getInitialState方法定义；

## 12. 事件处理

React事件绑定属性的命名采用驼峰式写法，而不是小写。
如果采用 JSX 的语法，则需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)；处理函数接收一个事件对象，这个事件对象是 React 根据 W3C spec 来合成的事件对象，所以不需要担心跨浏览器的兼容性问题；
不能使用返回 false 的方式阻止默认行为，必须明确的使用 preventDefault 来阻止默认行为；
示例：

```
function ActionLink() {

  function handleClick(e) {
    e.preventDefault();
    console.log('已被点击！');
  }

  return (
    <a href="#" onClick={handleClick}>
      点击我
    </a>
  );
}
```

## 13. key

key必须在其兄弟节点中是唯一的，而非全局唯一；
key会作为给React的提示，但不会传递给你的组件，即不会成为props中的属性；

## 14. 表单

对于 textarea 元素，在HTML当中，是通过子节点（开关标签之间的内容）来定义它的文本内容的，而在React中，是通过 标签属性value来设置它的文本内容的；
对于 select 标签，在HTML中，是通过在设置它的选项option元素的标签属性selected来设置被选中的选项的；而在React中，是通过设置 select 元素的标签属性 value 来设置被选中的值的；
通过给表单元素设置标签属性 defaultValue 可以为其指定初始值；

## 15. 元素的引用

元素的标签属性 ref 接受一个回调函数，它在元素被加载或卸载时执行；该回调函数接收一个参数，
在元素被加载时：
如果该元素是原生的HTML元素，则参数是该元素的DOM节点实例；
如果该元素是React组件，则参数是该元素的Reac实例；
在元素被卸载时：参数是null；

注意：

对函数式组件（用函数定义的组件）设置ref无效；
如果 ref 回调以内联函数的方式定义，在更新期间它会被调用两次，第一次参数是 null ，之后参数是元素的实例。这是因为在每次渲染中都会创建一个新的函数实例。因此，React 需要清理旧的 ref 并且设置新的；
旧版 React 的 ref 是 string 类型的，用于指定 引用名 ，通过 组件实例的 this.refs.textInput.引用名 来访问 被引用的DOM节点。因为 String 类型的 refs 存在问题。它已过时并可能会在未来的版本中被移除。建议使用回调函数的方式代替；

## 16. 上下文 Context

Context 是React提供的可用于在组件层级间（父子孙等组件）共享数据的一种机制，但Ract建议：能用 State 做的，尽量不要用 Context 去实现；

Context 的使用特点为：组件提供的 Context ，只有其子组件可以访问；

Context 的使用方式
定义 Context
在父组件中引入 PropTypes ，以便定义类型：

import PropTypes from 'prop-types';
在父组件的类上定义 childContextTypes ：

```
Parent.childContextTypes = {
  attributeFun: PropTypes.func,
  attributeStr: PropTypes.string,
  ...
};
在父组件的实例中实现 getChildContext 方法，并用其返回上下文对象供子组件使用：

class NavConfigProvider extends Component {

  getChildContext() {
     return {
         attributeFun: 函数值,
         attributeStr: 字符串值,
         ...
     };
  }

}
```
使用 Context
在需要使用 Context 的子组件中引入 PropTypes ，以便定义类型：

import PropTypes from 'prop-types';
在子组件的类上定义 childContextTypes ：

Children.contextTypes = {
  attributeFun: PropTypes.func,
  attributeStr: PropTypes.string,
  ...
 };
然后可以通过以下方式引用 Context 对象：

this.context
组件的以下生命周期方法中，都会接收一个额外的 context 参数：
constructor(props, context)
componentWillReceiveProps(nextProps, nextContext)
shouldComponentUpdate(nextProps, nextState, nextContext)
componentWillUpdate(nextProps, nextState, nextContext)
componentDidUpdate(prevProps, prevState, prevContext)
注意： 
从 React 16 开始， componentDidUpdate 不再接收 prevContext 。

Context 特性说明
React 是通过类的 childContextTypes 属性来判断：该类是否要提供 context ；如果类有 childContextTypes 属性的定义，则便会在每次组件的 state 或者 props 被改变时调用 getChildContext 方法获得组件提供的 context 对象；
React 是通过类的 contextTypes 属性来判断：是否要给该类传入 context ；
组件提供的 context 对象，只能被其子组件接收；
组件可以接收不同层级的父组件提供的 context，即，即使某组件提供了 context，则该组件的子组件也能接收到该组件的父组件提供的 context；
在层级组件间，如果子组件提供的 context 对象的属性 与 父组件提供的 context 对象的属性有重名，则子组件提供的 context 对象的属性 会覆盖父组件提供的 context 对象的同名属性；
如果组件的 shouldComponentUpdate 方法返回 false，则该组件的 context 将不会被更新；

## 17. 不使用ES6

以上是用ES6的语法创建的React组件的，当然也可以仅用ES5及以下的语法特性来创建，如下：

用 create-react-class 模块创建组件类，代替ES6的用class创建组件类：
```
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```
ES6 中 class 相关的接口与 createReactClass 方法十分相似，但有以下几个区别：

声明默认属性：
如果使用 class 关键字创建组件，可以直接把自定义属性对象写到类的 defaultProps 属性中；
如果使用 createReactClass 方法创建组件，那就需要在配置对象中定义 getDefaultProps 方法，并且在这个方法中返回包含自定义属性的对象；
设置初始状态：
如果使用 class 关键字创建组件，你可以通过在 constructor 中给 this.state 赋值的方式来定义组件的初始状态；
如果使用 createReactClass 方法创建组件，你就需要多写一个 getInitialState 方法，并让这个方法返回你要定义的初始属性；
自动绑定：
对于使用 class 关键字创建的 React 组件，组件中的方法是不会自动绑定 this 的。类似地，通过 ES6 class 生成的实例，实例上的方法也不会绑定 this。因此，你需要在 constructor 中为方法手动添加 .bind(this)；
如果使用 createReactClass 方法创建组件，组件中的方法会自动绑定至实例，不需要加 .bind(this)；

## 18. React的特性

JSX使用大、小写的约定来区分标签是定义的组件类还是原生的HTML标签；
由于JSX就是JavaScript，所以一些标识符（如：class和for）不能作为XML标签的属性名。在JSX中，使用className替代XML标签的class属性，htmlFor替代XML的for属性；
在JSX中的XML中的花括号{}表达式中不能使用if else语句，可以使用条件表达式(三元运算条件?值1: 值2)代替；
组件类的顶层标签只能有一个；
每次调用this.setState方法修改状态值，都会触发this.render方法渲染组件；

## 19. React的理解

一个React应用可以理解为是一个状态机，状态就是某一时刻（时间点）的所有相关数据的一个快照，当相关数据有变更时，就会生成一个新的状态，每当有新的状态时，React就会渲染一下界面生成新的一贞，以确定贞与状态同步，可以理解为：在React中，贞用来展示状态的，连续的多个贞就组成了React的应用界面；
React元素 是对 组件（包括：React的内置组件 和 自定义组件） 某一时刻的描述，即是组件的某一时刻的快照，所以 React元素 是组件的贞，是React应用界面的贞的一个组成部分；

## 20. React术语的概念

在 React 的术语中，有五个核心类型，区分它们是很重要的：

React元素：ReactElement
ReactElement 没有方法，且原型上什么都没有，只有四个属性：type、props、key 和 ref；ReactElement 实例 不是 DOM元素 实例。一个 ReactElement 实例是一个轻量的，无状态的，不可变的，虚拟的 DOM 元素 的表示，是一个虚拟 DOM；

ReactElement 实例可以通过 React.createElement 创建，如：

var reactElement = React.createElement('div');
也可以使用React的JSX语法来创建：

var reactElement = <div></div>
工厂
一个 ReactElement 工厂就是一个简单的函数，该函数生成一个带有特殊 type 属性的 ReactElement。React 有一个内置的辅助方法用于创建工厂函数。该方法的逻辑是这样的：

function createFactory(type){
  return React.createElement.bind(null, type);
}
该函数能创建一个方便的短函数用来创建特定类型的ReactElement实例，而不必总调用 React.createElement(type)去创建ReactElement实例。React 已经在 React.DOM 里内置了常用的原生HTML标签的 ReactElement实例的工厂函数 ，如：React.DOM.ul、React.DOM.li 等等；
```
React节点：ReactNode
ReactNode 可以是：

ReactElement
string （又名 ReactText）
number （又名 ReactText）
ReactNode 实例数组 （又名 ReactFragment）
React组件：ReactComponent
ReactComponent 类就是简单的 JavaScript 类（或者说是“构造函数”）。

var MyComponent = React.createClass({
  render: function() {
    ...
  }
});
```
当该构造函数被调用的时候，会返回ReactComponent实例，ReactComponent实例至少会有一个 render 方法：

var component = new MyComponent(props); 
除非为了测试，正常情况下不要自己调用该构造函数，React 会调用这个构造函数；

如果把 ReactComponent类 传给 createElement 方法，createElement 方法就会返回一个 ReactElement 实例；

var element = React.createElement(MyComponent);
或者通过JSX语法使用ReactComponent类 也会返回一个 ReactElement 实例：

var element = <MyComponent />;
React.render方法会根据 ReactElement实例调用相应的的构造函数（ReactComponent类），然后创建并返回一个 ReactComponent实例；

var component = React.render(element, document.body);
如果一直用相同的 ReactElement 类型或相同的 DOM 元素挂载容器调用 React.render方法，将会总是返回相同的ReactComponent实例，并且该实例是被状态化的：

var componentA = React.render(<MyComponent />, document.body);
var componentB = React.render(<MyComponent />, document.body);
componentA === componentB; // true
这就是为什么不应该直接调用ReactComponent类来创建ReactComponent实例。ReactElement 是 ReactComponent 实例的一个快照。React 可以对比新旧 ReactElement 实例之间的差异，从而决定是创建一个新的 ReactComponent 实例还是重用已有的实例；

ReactComponent实例的 render 方法应该返回另一个 ReactElement实例，表示允许ReactComponent实例被组装；

术语的定义
入口点
```
React.render = (ReactElement, HTMLElement | SVGElement) => ReactComponent;
节点和元素
type ReactNode = ReactElement | ReactFragment | ReactText;

type ReactElement = ReactComponentElement | ReactDOMElement;

type ReactDOMElement = {
  type : string,
  props : {
    children : ReactNodeList,
    className : string,
    etc.
  },
  key : string | boolean | number | null,
  ref : string | null
};

type ReactComponentElement<TProps> = {
  type : ReactClass<TProps>,
  props : TProps,
  key : string | boolean | number | null,
  ref : string | null
};

type ReactFragment = Array<ReactNode | ReactEmpty>;

type ReactNodeList = ReactNode | ReactEmpty;

type ReactText = string | number;

type ReactEmpty = null | undefined | boolean;
类和组件
type ReactClass<TProps> = (TProps) => ReactComponent<TProps>;

type ReactComponent<TProps> = {
  props : TProps,
  render : () => ReactElement
};
```

