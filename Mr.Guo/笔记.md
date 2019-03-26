## 简化嵌套
先来看下面这个例子：
```js
  var hi = function(name) {
    return "Hi " + name;  
  };
  var greeting = function(name) {
    return hi(name);
  };

```
这里greeting指向的那个把hi包了一层的包裹函数完全是多余的。因为javascript的函数是可调用的，当hi后面紧跟()的时候就会运行应返回一个值；
如果没有(),hi就会简单得返回这个变量里的函数。我们来确认下：
```js
  hi;
  //  function(name) {
  //    return "Hi" + name
  //  }
  
  hi("Tony");
  // "Hi Tony"
```
greeting只不过是转了个身然后以相同的参数调用了hi函数而已，因此我们可以这么写：
```js
  var greeting = hi;
  greeting("Monkey");
  // "Hi Monkey"

```
换句话说，hi已经是个接受一个参数的函数了，为何要再定义一个额外的包裹函数，用一个函数把另一个函数包起来，目的仅仅是延迟执行。我们再来看个例子：
```js
  // 太傻了
  var getServerStuff = function(callback){
    return ajaxCall(function(json){
      return callback(json);
    });
  };
  
  简化出来其实就是：var getServerStuff = ajaxCall;

```
下面是等价的原因：
```js
  // 这行
  return ajaxCall(function(json){
    return callback(json);
  })
  
  // 等价于这行
  return ajaxCall(callback)
  
  // 那么重构下 getServerStuff
  var getServerStuff = function(callback) {
    return ajaxCall(callback)
  }
  
  // 就等于
  var getServerStyff = ajaxCall; <-- 看，没有括号哦
  这才是正确的打开方式。
```

```js
  var BlogController = (function(){
    var index = function(posts){
      return Views.index(posts);
    };
    
    var show = function(post){
      return Views.show(post);
    };
    
    var create = function(attrs){
      return Db.create(attrs);
    };
    
    var update = function(post, attrs){
      return Db.update(post, attrs);
    };
    
    var destroy = function(post) {
      return Db.destroy(post);
    };
    
    return {index: index, show: show, create: create, update: update, destroy: destroy};
  })()

```
如果你遇到这样的代码，你应该会想：这写的什么垃圾代码。我们可以给他重新写成这样：
```js
  var BlogController = {
    index: Views.index,
    show: Views.show,
    create: Db.create,
    update: Db.update,
    destory: Db.destory
  }

```

上面getServerStuff和BlogController两个例子我们可以看到，虽说添加一些没有实际用处的间接层实现起来很容易，但是这样除了徒增代码量，
提高维护和检索代码的成本外，没有任何用处。
另外，如果一个函数被不必要的包裹起来了，而且发生了改动，那么包裹它的那个函数也要相应的变更。
```js
  httpGet('/post/2', function(json){
    return renderPost(json);
  })

```
如果httpGet要改成可以抛出一个可能出现的err异常，那我们还要回过头去把包裹函数也改了。
```js
  // 把整个应用里的所有httpGet调用都改成这样，可以传递err参数。
  httpGet('/post/2', function(json, err){
    return renderPost(json, err)
  })

```
如果我们简化了，那么我们就会减轻负担：
```js
  httpGet('/post/2', renderPost)
  
```

## 纯函数好处
首先，我们要理清纯函数概念
> 纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。
比如```slice```和```splice```，这两个函数的作用并无二致，但是注意，他们各自的方式却大不同，但不管怎么说作用还是一样的。我们说```slice```符合
纯函数的定义是因为对相同的输入他保证能返回相同的输出。而splice却会嚼烂调用它的那个数组，然后再吐出来；这就会产生观察到的副作用，即这个数组永久的改变了。

```js
  var xs = [1, 2, 3, 4, 5];
  // 纯的
  xs.slice(0, 3);
  // => [1, 2, 3]
  
  xs.slice(0, 3);
  // => [1, 2, 3]
  
  
  // 不纯的
  xs.splice(0, 3);
  // => [1, 2, 3]
  
  xs.splice(0, 3);
  // => [4, 5]
  
  xs.splice(0, 3);
  // => []
  
```
在函数编程中，我们追求的是那种可靠的每次都能返回同样结果的函数，而不像splice这样每次调用后都把数据弄得一团糟的函数。我们来看另一个例子：
```
  // 不纯的
  var minimum = 21;
  var checkAge = function(age) {
    return age >= minimum;
  }
  
  // 纯的
  var checkAge = function(age) {
    var minimum = 21;
    return age >= minimum;
  }

```

在不纯的版本中，checkAge的结果将取决于minimum这个可变变量的值。换句话说，它取决于系统状态；这一点令人不满意，因为他引入了外部的环境，从而增加了
认知负荷。
另一方面，使用纯函数的形式，函数就能做到自给自足。我们也可以让minimum成为一个不可变(immutable)对象，这样就能保留纯粹性，因为状态不会有变化。
要实现这个效果，必须得创建一个对象，然后调用object.freeze方法：
```js
  var immutableState = Object.freeze({
    minimum: 21
  });

```

### 追求“纯”的理由
首先，纯函数总能够根据输入来做缓存。实现缓存的一种典型方式是memoize技术：
```js
  var squareNumber = memorize(function(x){return x * x});
  
  squareNumber(4);
  // => 16
  
  squareNumber(4); // 从缓存中读取输入值为4的结果
  // => 16
  
  
  squareNumber(5);
  // => 25
  
  squareNumber(5); // 从缓存中读取输入值为5的结果
  // => 25
  

```
下面的代码是一个简单的实现，不太健壮。
```js
  var memoize = function(f){
    var cache = {};
    
    return function() {
      var arg_str = JSON.stringify(arguments);
      cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
      return cache[arg_str]
    };
  };

```
值得注意的一点是，可以通过延迟执行的方式把不纯的函数转为纯函数；

```js
  var pureHttpCall = memoize(function(url, params){
    return function() {return $.getJson(url, params)}
  })

```
这里我们并没有真正发送http请求，只返回了一个函数，当调用它的术后才会发送请求。这个函数之所以成为纯函数，是因为他总是会根据相同的输入返回相同的输出：
给定了url和params之后，他就只会返回同一个发送http请求的函数。

纯函数是完全自给自足的。首先，纯函数的依赖很明确，便于观察和理解，没有偷偷摸摸的小动作。
```js
  // 不纯的
  var signUp = function(attrs) {
    var user = saveUser(attrs);
    welcomeUser(user);
  }
  
  var saveUser = function(attrs) {
    var user = Db.save(attrs);
  }
  
  var welcomeUser = function(user) {
    Email(user, ...);
  }
  
  //纯的
  var signUp = function(Db, Email, attrs) {
    return function() {
      var user = saveUser(Db, attrs);
      welcomeUser(Email, user);
    }
  }
  
  var saveUser = function(Db, attrs) {
    ...
  };
  
  var welcomeUser = function(Email, user) {
    ...
  };

```
这个例子表明，纯函数对于其依赖必须要诚实，这样我们就知道他的目的。从纯函数版本的signUp我们就可以看出，他将要用到Db、Email和attrs，这在最小
成都上给我们足够的信息。

```js
  var Immutable = require('immutable')；
  var decrementHP = function(player) {
    return player.set("hp", player.hp - 1);
  }
  var isSameTeam = function(player1, player2) {
    return player1.team === player2.team
  }
  var punch = function(player, target) {
    if (isSameTeam(player, target)) {
      return target;
    } else {
      return decreamentHP(target);
    }
  };
  
  var jobe = Immutable.Map({name: "Jobe", hp: 20, team: "red"});
  var michael = Immutable.Map({name: "Michael", hp: 20, team: "green"});
  
  punch(jobe, michael);
  // => Immutable.Map({name: "Michael", hp: 19, team: "green"})
```
decrementHP、isSameTeam和punch都是纯函数，所以引用是透明的。我们可以使用一种叫做“等式推倒”的过程来分析代码。
首先内联isSameTeam函数：
```js
  var punch = function(player, target) {
    if(player.team === target.team) {
      return target;
    } else {
      return decreamentHP(target)
    }
  };

```
因为是不可变数据，我们可以直接把team替换为实际值：

```js
  var punch = function(player, target) {
    if ("red" == "green") {
      return target
    } else {
      return decreamentHP(target)
    }
  };

```

```if```语句执行结果为false，所以可以把整个```if```语句都删掉：
```js
  var punch = function(player, target) {
    return decreamentHP(target);
  };

```
如果在内联decreamentHP，我们会发现这种情况下，punch变成了一个让hp减1的调用：
```js
  var punch = function(player, target) {
    return target.set("hp", target.hp - 1);
  };

```
