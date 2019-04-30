#### 概述

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
var proxy = new Proxy(target, handler);
target 参数表示所要拦截的目标对象，handler 参数也是一个对象，用来定制拦截行为。
var proxy = new Proxy({}, {
get: function(target, property) {
return 35;
}
});

proxy.time // 35
proxy.name // 35
proxy.title // 35

#### Proxy 实例的方法

get()
get 方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选

apply()
apply 方法拦截函数的调用、call 和 apply 操作。
apply 方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

has()
has 方法用来拦截 HasProperty 操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是 in 运算符。
has 方法可以接受两个参数，分别是目标对象、需查询的属性名。

construct()
construct 方法用于拦截 new 命令，下面是拦截对象的写法。

```
var handler = {
  construct (target, args, newTarget) {
    return new target(...args);
  }
};
construct方法可以接受两个参数。
target：目标对象
args：构造函数的参数对象
newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）
```

deleteProperty()
deleteProperty 方法用于拦截 delete 操作，如果这个方法抛出错误或者返回 false，当前属性就无法被 delete 命令删除。

defineProperty()
defineProperty 方法拦截 Object.defineProperty 操作。

getOwnPropertyDescriptor()
getOwnPropertyDescriptor 方法拦截 Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者 undefined。

getPrototypeOf()

getPrototypeOf 方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。
Object.prototype.**proto**
Object.prototype.isPrototypeOf()
Object.getPrototypeOf()
Reflect.getPrototypeOf()
instanceof

isExtensible()
isExtensible 方法拦截 Object.isExtensible 操作

ownKeys()
ownKeys 方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。

Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Object.keys()
for...in 循环

```
let target = {
  a: 1,
  b: 2,
  c: 3
};

let handler = {
  ownKeys(target) {
    return ['a'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// [ 'a' ]
```

preventExtensions()
preventExtensions 方法拦截 Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
Object.preventExtensions()方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。

```
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    return true;
  }
});

Object.preventExtensions(proxy)
```

setPrototypeOf()
setPrototypeOf 方法主要用来拦截 Object.setPrototypeOf 方法。
Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或 null。

#### Proxy.revocable()

Proxy.revocable 方法返回一个可取消的 Proxy 实例。
Proxy.revocable 方法返回一个对象，该对象的 proxy 属性是 Proxy 实例，revoke 属性是一个函数，可以取消 Proxy 实例。上面代码中，当执行 revoke 函数之后，再访问 Proxy 实例，就会抛出一个错误。

```
et target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```
