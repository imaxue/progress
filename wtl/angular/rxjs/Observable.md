###  Iterator Pattern 迭代器模式

```js
var arr = [1, 2, 3];

var iterator = arr[Symbol.iterator]();

iterator.next();
// { value: 1, done: false }
iterator.next();
// { value: 2, done: false }
iterator.next();
// { value: 3, done: false }
iterator.next();
// { value: undefined, done: true }
```



### Observer Pattern 观察者模式

> 在此种模式中，一个目标对象管理所有相依于它的观察者对象，并且在它本身的状态改变时主动发出通知。这通常透过呼叫各观察者所提供的方法来实现。此种模式通常被用来实时事件处理系统。

例如：DOM元素的事件监听就是观察者模式

```js
function clickHandler(event) {
	console.log('1111');
}

document.body.addEventListener('click', clickHandler)
```



Observer 生产者 ，用来推送数据

Iterator 是消费者，用来处理数据

Observable 则是这两者的结合，有其各自的特点



##### 冷 observable

> 两个订阅者得到两份完全相同的副本

```
let stream = Rx.Observable.of(1,2,3)
sream.subscribe() // 1,2,3
sream.subscribe() // 1,2,3
```

##### 热订阅者只能收到它开始订阅的值

