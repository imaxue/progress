# 想到啥写啥，未整理
```javascript
//数据一般挂在到vm上
//初步了解Object.defineProperty get和set
//vue中实现双向绑定  1.模板编译 2.数据劫持 观察数据变化 3watcher
return arr.reduce((prev,next) => {
  return prev(next)

},vm.$data)函数

Object.keys()//把对象转成数组


Object.defineProperty(obj, prop, descriptor)//方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
obj//要在其上定义属性的对象。
prop//要定义或修改的属性的名称。
descriptor//将被定义或修改的属性描述符
```

> 突然想到了一个判断对象是否为空的好办法,先把对象转成数组，然后看看数组的长度是不是0
```javascript
if (Object.keys(obj).length > 0) {

}
```