#### 函数柯里化(currying)

> currying 又称部分求值。一个 currying 的函数首先会接受一些参数，接受了这些参数之后， 该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。 

```javascript
 var cost = (function() {
  var args = [];

  return function() {
    if (arguments.length === 0) {
      var money = 0;
      for (var i = 0, l = args.length; i < l; i++) {
        money += args[i];
      }
      return money;
    } else {
      [].push.apply(args, arguments);
    }
  }
})();

cost(100); 
cost(200); 
cost(300); 
console.log(cost()) // 600
```

#### uncurrying

> 在 JavaScript 中，当我们调用对象的某个方法时，其实不用去关心该对象原本是否被设计为 拥有这个方法，这是动态类型语言的特点，也是常说的鸭子类型思想。 

```javascript
 var obj1 = {
    name: 'abc'
  };
  var obj2 = {
    getName: function () {
      return this.name;
    }
  };
  console.log(obj2.getName.call(obj1)) // abc  
 // obj1 借用了 obj2的方法

```

在JS的语言环境中，我们可以通过call和apply完成this的转化，用uncurrying可以解决this的转化问题。

```javascript
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
      var obj = Array.prototype.shift.call(arguments)
      return self.apply(obj, arguments)
    }
  };
  var push = Array.prototype.push.uncurrying();

  (function () {
    push(arguments, 4)
    console.log(arguments) // [1, 2, 3, 4]
  })(1, 2, 3);

var obj = {
    "length": 3,
    "0": 1, "1": 2, "2": 3
  };
  push( obj, 4 )
  console.log(obj) // {0: 1, 1: 2, 2: 3, 3: 4, length: 4}
	
	// 解释
	Function.prototype.uncurrying = function () {
    var self = this; // self 保存的是 Array.prototype.push
    return function () {
      var obj = Array.prototype.shift.call(arguments)
      // obj 此时是 {0: 1, 1: 2, 2: 3, length: 3}
      // arguments 此时是 [4]
      
      return self.apply(obj, arguments)
      // 相当于 Array.prototype.push.apply({0: 1, 1: 2, 2: 3, length: 3},[4])
      // 
    }
  };

```

下面这种也是实现uncurrying 的一种方式，大家可以理解一下

```js

  Function.prototype.uncurrying = function () {
    var self = this; 
     return function () {
      return Function.prototype.call.apply(self, arguments);
    }
  };
```

