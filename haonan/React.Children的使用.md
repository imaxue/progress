# 前言
React.Children 是顶层API之一，为处理 this.props.children 这个封闭的数据结构提供了有用的工具。this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点

# React.Children.map
```js
object React.Children.map(object children, function fn [, object context])

使用方法
React.Children.map(this.props.children, function (child) {
    return <li>{child}</li>;
})

其他方法
this.props.children.forEach(function (child) {
    return <li>{child}</li>
})
```
在每一个直接子级（包含在 children 参数中的）上调用 fn 函数，此函数中的 this 指向 上下文。如果 children 是一个内嵌的对象或者数组，它将被遍历：不会传入容器对象到 fn 中。如果 children 参数是 null 或者 undefined，那么返回 null 或者 undefined 而不是一个空对象。

```js
var NotesList = React.createClass({
render: function() {
    return (
    <ol>
        {
        React.Children.map(this.props.children, function (child) {
                return <li>{child}</li>;
            })
        }
    </ol>
    );
}
});

React.render(
<NotesList>
    <span>hello</span>
    <span>hello</span>
</NotesList>,
document.body
);
```
这里需要注意， this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children 的时候要小心。

React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。

传入如下ReactElement：
```js
<NotesList>
   <span>hello</span>
   <span>hello</span>
</NotesList>
//返回两个子节点


<NotesList></NotesList>
//返回undefined


<NotesList>null</NotesList>
//返回null
```

# React.Children.forEach
``React.Children.forEach(object children, function fn [, object context])``
类似于 React.Children.map()，但是不返回对象。

# React.Children.count
``number React.Children.count(object children)``
返回 children 当中的组件总数，和传递给 map 或者 forEach 的回调函数的调用次数一致。
```js
render: function() {
    console.log(React.Children.count(this.props.children)); //2

    return (
      <ol>
        {
          this.props.children.forEach(function (child) {
              return <li>{child}</li>
          })
        }
      </ol>
    );
  }
```
不同的ReactElement，输出count值:
```js
<NotesList>
    <span>hello</span>
    <span>hello</span>
</NotesList>
console.log(React.Children.count(this.props.children)); //2

<NotesList></NotesList>
console.log(React.Children.count(this.props.children)); //0

<NotesList>null</NotesList>
console.log(React.Children.count(this.props.children)); //1
```

# React.Children.only
``object React.Children.only(object children)``
返回 children 中 仅有的子级。否则抛出异常。
这里仅有的**子级**，only方法接受的参数只能是一个对象，不能是多个对象（数组）。
```js
console.log(React.Children.only(this.props.children[0]));
//输出对象this.props.children[0]
```