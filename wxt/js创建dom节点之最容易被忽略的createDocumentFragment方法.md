# js创建dom节点之最容易被忽略的createDocumentFragment()方法
## js常见的创建dom节点的方法有

1. createElement() 创建一个元素节点 => 接收参数为string类型的nodename  
2. createTextNode() 创建一个文本节点 => 接收参数为string类型的text内容
3. createAttribute() 创建一个属性节点 => 接收参数为string类型的属性名称
4. createComment() 创建一个注释节点 => 接收参数为string类型的注释文本
> createDocumentFragment()是用来创建文档碎片的节点，即把目标节点内的Dom放到内存中，然后在内存中操作里面的元素，这样可以提高性能，vue里面也是用这个属性，注意该方法创建的是虚拟的节点对象


> DocumentFragment节点不属于文档树，继承的parentNode属性总是null。它有一个很实用的特点，当请求把一个DocumentFragment节点插入文档树时，插入的不是DocumentFragment自身，而是它的所有子孙节点。这个特性使得DocumentFragment成了占位符，暂时存放那些一次插入文档的节点。它还有利于实现文档的剪切、复制和粘贴操作。 
另外，当需要添加多个dom元素时，如果先将这些元素添加到DocumentFragment中，再统一将DocumentFragment添加到页面，会减少页面渲染dom的次数，效率会明显提升。

#### 例子

```html
<body>
    <ul>
        <li>Alice</li>
        <li>Bob</li>
    </ul>
    <button onclick="test()">测试</button>
</body>
```

```javascript
function test(){
    var li = document.getElementByTaName('li')[0];  //ul中的第一个li节点
    console.log(document.getElementByTaName('li')[0].innerText) // 显示Alice
    var newFrag = document.createDocumentFragment();
    newFrag.appendChild(li);
    console.log(document.getElementByTaName('li')[0].innerText) // 显示Bod
    console.log(document.getElementByTaName('ul')[0].innerHTML)} //显示<li>Bob</li>,由此可见，第一个节点确实被删了
    //现在fragment中的修改节点
    newFrag.childNode[0].childNodes[0].nodeValue='Candy';
    //更改一个孩子节点的文本内容
    // .childNodes[0].nodeValue等同于：.innerText  或.textContent
     document.getElementByTaName('ul')[0].appendChild(newFrag);
     console.log(document.getElementByTaName('ul')[0].innerHTML)
} //显示<li>Bob</li><li>Candy</li>  ,由此可见仅仅是添加了newFrag的子孙节点。

```                                                                         