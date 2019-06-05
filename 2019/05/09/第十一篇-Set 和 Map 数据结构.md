#### Set

它类似于数组，但是成员的值都是唯一的，没有重复的值,
add()方法向 Set 结构加入成员

```
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);
}
```

去除数组重复成员的方法
// 去除数组的重复成员
[...new Set(array)]
去除字符串里面的重复字符
[...new Set('ababbc')].join('')

向 Set 加入值的时候，不会发生类型转换，所以 5 和"5"是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是 NaN 等于自身，而精确相等运算符认为 NaN 不等于自身。

```
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
```

#### Set 实例的属性和方法

Set 结构的实例有以下属性。

Set.prototype.constructor：构造函数，默认就是 Set 函数。
Set.prototype.size：返回 Set 实例的成员总数。
Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

add(value)：添加某个值，返回 Set 结构本身。
delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
clear()：清除所有成员，没有返回值。

#### 遍历操作

Set 结构的实例有四个遍历方法，可以用于遍历成员。

keys()：返回键名的遍历器
values()：返回键值的遍历器
entries()：返回键值对的遍历器
forEach()：使用回调函数遍历每个成员
keys 方法、values 方法、entries 方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以 keys 方法和 values 方法的行为完全一致。entries 方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等

```
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

forEach()

```
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

遍历的应用
扩展运算符（...）内部使用 for...of 循环，所以也可以用于 Set 结构。

```
let set = new Set(['red', 'green', 'blue']);
let arr = [...set];
// ['red', 'green', 'blue']
```

数组的 map 和 filter 方法也可以间接用于 Set 了。

```
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}
```

使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）

```
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

#### WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}

WeakSet 结构有以下三个方法。
WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

#### Map

##### （1）size 属性

size 属性返回 Map 结构的成员总数。

##### （2）set(key, value)

set 方法设置键名 key 对应的键值为 value，然后返回整个 Map 结构。如果 key 已经有值，则键值会被更新，否则就新生成该键。

##### （3）get(key)

get 方法读取 key 对应的键值，如果找不到 key，返回 undefined。

##### (4）has(key)

has 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

##### （5）delete(key)

delete 方法删除某个键，返回 true。如果删除失败，返回 false。

##### （6）clear()

clear 方法清除所有成员，没有返回值。

##### 遍历方法

Map 结构原生提供三个遍历器生成函数和一个遍历方法。

keys()：返回键名的遍历器。
values()：返回键值的遍历器。
entries()：返回所有成员的遍历器。
forEach()：遍历 Map 的所有成员。

##### 与其他数据结构的互相转换

1)Map 转为数组
[...myMap]
2）数组 转为 Map
将数组传入 Map 构造函数，就可以转为 Map。
new Map([
[true, 7],
[{foo: 3}, ['abc']]
])
（3）Map 转为对象
如果所有 Map 的键都是字符串，它可以无损地转为对象。

```
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

（4）对象转为 Map
function objToStrMap(obj) {
let strMap = new Map();
for (let k of Object.keys(obj)) {
strMap.set(k, obj[k]);
}
return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}

（5）Map 转为 JSON
Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。
function strMapToJson(strMap) {
return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
6）JSON 转为 Map
function jsonToStrMap(jsonStr) {
return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')

#### WeakMap 只有四个方法可用：get()、set()、has()、delete()。
