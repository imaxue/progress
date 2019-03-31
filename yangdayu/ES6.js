
/**
 * 一、Decorator 修饰器
 *  */ 
// 用来修改类的行为
// mixins.js
export function mixins(...list) {
	return function (target) {
		Object.assign(target.prototype, ...list)
	}
}
// main.js
import { mixins } from './mixins'

const Foo = {
foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // 'foo'

// 用Object.assign 模拟
const Foo = {
foo() { console.log('foo') }
};

class MyClass {}

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'



/**
 * 最新提案
 */
// 1. do表达式： 返回内部最后执行的表达式的值
let x = do {
	let t = f();
	t * t + 1;
  };

return (
<nav>
	<Home />
	{
	do {
		if (loggedIn) {
		<LogoutButton />
		} else {
		<LoginButton />
		}
	}
	}
</nav>
)

// 2. throw 可用于表达式了,之前只能用于命令
console.log(throw new Error());
this._id = value || throw new Error("Invalid value");

// 3. 链判断运算符
const firstName = message?.body?.user?.firstName || 'default';
a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()

// 4. 函数的部分执行：?是单个参数的占位符，...是多个参数的占位符
let obj = {
f(x, y) { return x + y; },
};

const g = obj.f(?, 3);
g(1) // 4

// 5. 管道运算符
// 传统的写法
exclaim(capitalize(doubleSay('hello')))
// "Hello, hello!"

// 管道的写法
'hello'
  |> doubleSay
  |> capitalize
  |> exclaim
// "Hello, hello!"

// 6.BigInt数据类型：大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity；BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。
const a = 2172141653n;
const b = 15346349309n;

// BigInt 可以保持精度
a * b // 33334444555566667777n

// 普通整数无法保持精度
Number(a) * Number(b) // 33334444555566670000

// 6. BigInt对象
BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n
// BigInt()构造函数必须有参数，而且参数必须可以正常转为数值，下面的用法都会报错。
BigInt('123n') // SyntaxError
BigInt('abc') // SyntaxError

/**
 * module加载规则
 */
// 默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到<script>标签就会停下来，等到执行完脚本，再继续向下渲染。
// 异步加载：给script加defer和async属性；渲染引擎遇到这步就会开始下载，同时页面继续渲染；defer是等到页面正常渲染完后执行。async一旦下载完脚本，浏览器就会中断渲染，立即执行此脚本
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
// ES6 将script的type属性设置为module，所以浏览器知道了这是es6模块；便执行异步加载，页面渲染完在执行，不会造成浏览器拥堵。
<script type="module" src="./foo.js" async></script>
// 对于ES6模块，有几点默认：
// 1. 代码在模块作用域之中运行，而不是在全局作用域运行，模块内的变量，外部不可见。
// 2. 脚本自动采用严格模式， 不管有没有声明use strict。
// 3. 模块中顶层的this返回undefined，而不是指向window
// ES6模块与commonJS模块的差异
// 1. commonJS模块输出的是一个值得拷贝，不会被后面修改，ES6模块输出的是值得引用，可被重新赋值。
// 2. commonJS模块是运行时加载，ES6模块是编译时输出接口。因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。


/**
 * class 类
 */

function Point(x,y){
	this.x = x;
	this.y = y;
}

Point.prototype.toString = function(){
	return '(' + this.x + ',' + this.y + ')';
}

var p = new Point(2,4);

//类似  class类相当于构建了一个构造函数
class Bar {
	doStuff(){
		console.log('stuff');
	}

	constructor(props) {
		super(props);     //super作为一个关键字，指向原型对象时  可直接调用 super.XXX  
		//....
	}
}

var b = new Bar();
b.doStuff()  //stuff    
b.constructor === Bar.prototype.constructor(直接指向类的本身Bar)  //这些类的方法都定义在prototype上面

//由于类的方法都定义在prototype上，可以通过Object.assign()向原型链上添加方法
Object.assign(Point.prototype,{
	toString(){},
	toLower(){}
})

// 类的内部所有定义的方法都是不可枚举的
Object.keys(Point.prototype) // []
Object.getOwnPropertyNames(Point.prototype) // ['constructor','toString']

//constructor(){}
constructor()方法是类的默认方法，1.new生成的实力对象的同时就自动调用constructor方法
							2.其默认返回的是实力对象本身（this），而不是原型对象的属性

class Self {

	constructor(x,y){
		this.x = x;    //this默认指向 类的实例，若单独提出来则指向当前运行环境，采取绑定或尖头函数
		this.y = y;
	}

	toString(){
		return '('+this.x + ',' + this.y + ')';
	}
}

var self1 = new Self(2,3);
self1.toString();  //(2,3)
self1.hasOwnProperty('x') //true  判断x是否为self1实力对象的自身属性
self1.hasOwnProperty('y')  //true
self1.hasOwnProperty('toString')  //false
self1.__proto__.hasOwnProperty('toString')  //true  toString方法属于其原型链上的方法
obj instanceof Self   //判断obj是否为self对象的实例

// 静态方法
// 父类的静态方法可以被子类继承，但不会被实例继承
class Foo{
	static classMethod(){
		return 'hello';
		this.propMethod();  //this指向的是类Foo，而不是实例
	}
	propMethod(){
		console.log('hello')
	}
}

Foo.classMethod() //'hello' ,静态方法可以直接在Foo类上调用；其他的方法是定义在原型上不能直接调用
Foo.propMethod() //typeError
//实例函数  不能继承静态方法
var foo = new Foo();
foo.classMethod()  //typeError 静态方法不能被实例继承
foo.propMethod();  //hello
//子类  可以调用父类的静态方法
class Bar extends Foo{
	static classMethod(){
		return super.classMethod() + ',too'
	}
}
Ber.classMethod() //hello,too


// 私有属性和私有方法新提案
class Foo {
    #a;
    #b;
    constructor(a, b) {
      this.#a = a;
      this.#b = b;
    }
    #sum() {
      return #a + #b;
    }
    printSum() {
      console.log(this.#sum());
    }
  }


/**
 * async
 */
// async的实现原理：就是将 Generator函数和自动执行器，包装在一个函数里
async function myFunction() {
	try {
	  await somethingThatReturnsAPromise();
	} catch (err) {
	  console.log(err);
	}
  }
// 优点：1 内置执行器。2 更好的语义。3.返回Promise。
// 注意点：1. await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
// 2.多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
let foo = await getFoo();
let bar = await getBar();
// 改写成
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;