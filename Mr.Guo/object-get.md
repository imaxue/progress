## Object-get

****

有时候，我们会接收一个层级很深的json数据，我们在取数据里面的某个字段时就会出现一个问题，如果父级为undefined的时候，就会出现报错，我们就要写很多的判断去验证每一层是不是为undefined。如下：

```js

  const obj = {
    a: {
      b: {
        c: 1,
      },
    }
  }
  const c = obj.a.b.c; // 1
  const f = obj.a.e.f // Uncaught TypeError: Cannot read property 'f' of undefined
```
我们只能给f的上级去加判断

```js
  const f = obj && obj.a && obj.a.e && obj.a.e.f;
```

或者

```

   let f;
   try {
    f = obj.a.e.f
   } catch () {
    
   }
  
```

我们可以用一个函数去处理一下，帮助我们用更简单的表达式去获取我们想要的字段，代码如下

```js

  function objectGet (object, expression) {
    if (!(object && expression)) throw new Error('object和expression参数都是必传的');
      return expression.trim().split('.').reduce(function (prev, curr) {
        var arr = curr.match(/(.*?)\[(.*?)\]/)
        if (arr) {
          return prev && prev[arr[1]][arr[2]]
        } else {
          return prev && prev[curr]
        }
      }, object)
   }  

```

来个测试,还是上面的obj：

```js

  const c = objectGet(obj, 'a.b.c') // 1
  const f = objectGet(obj, 'a.e.f') // undefined

```
这个时候就不会出现程序报错的问题。

