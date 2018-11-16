### reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其简化为单个值
方法的语法是： arr.reduce(callback[, initialValue])。callback 接受四个参数，分别是：accumulator，累加器累加回调的返回值； currentValue,数组中正在处理的元素；currentIndex（可选）,数组中正在处理的当前元素的索引；array（可选），调用 reduce() 的数组。initialValue 为可选参数，作为第一次调用 callback 函数时的第一个参数的值。方法的返回值是函数累计处理的结果。  
### 例子
```js
[{
  id: 1,
  type: 'A',
  total: 3
}, {
  id: 2,
  type: 'B',
  total: 5
}, {
  id: 3,
  type: 'E',
  total: 7
},...]

```

### 第一个小需求，统计 total 的总和
```js
arr.reduce((sum, { total }) => {
  return sum + total;
}, 0)
```
### 将数组的每项转换为固定格式的字符串（如第一项转换为 id:1,type:A;），每项直接以分号作为分隔。
```js

arr.reduce((str, { id, type }) => {
  return str + `id:${id},type:${type};`;
}, '')
```
### 转换为 key 是 id，value 是其他属性的对象
```js
arr.reduce((res, { id, type, total }) => {
  res[id] = {
    type,
    total
  };
  return res;
}, {})

```
