## typescript 简洁使用


*做最简洁核心的记录，可以节约时间、再是提炼概括，理解归纳、便于日后查阅联想*


> typescript原则之一： 对值所具有的结构进行类型检查

#### 基础类型

* boolean

	`let isDone: boolean = false;`
	
* number

	`let hexLiteral: umber = 7`
	
* string
	
	`let name: string = 'bob'`
	
* anrray

	`let list: number[] = [1,2,3,4]`
	`let list: Array<number> = [1,2,3,4]`
	
* Tuple 元组

	> 允许定义一个已知元素数量和类型的数组，各元素类型不必相同
	
		let x: [string, number];
		x = ['hello', 10];  ok
		x = [10, 'hello']; error
		x[0].substr(1); ok
		x[0].substr(1); error 'number' does not have 'substr'
	
* enum 枚举

	> 可以为一组数值富裕有好的名字，还可以由枚举的值查找相应的值
	
		enum Color {
			Red = 1,
			Green = 'green',
			Blue = 'blue'
		}
		let c: Color = Color.Green;
		let colorName: string = Color[2];

	

* Any 
	
	> 对于不清楚的类型，不希望类型检查器对这些值进行检查而是直接编译
	
		let notSure: any = 4;
		notSure = 'maybe a string instead'
		notSure = false;  ok
		
		let list = any[] = [1, true, 'free']
		list[1] = 100
		
* Void

	> 表示没有任何返回值
	
		function warnUser(): void {
			alert('...')
		}
		
###### 类型断言

> 可以通过类型断言的方式，告诉编译器，我确定这是什么，不需要进行检查了。

	1.尖括号<>
		let someValue: any = 'this is a string';
		let stringLen: number = (<string>someValue).length;
	
	2. as
		let stringLen: number = (someValue as string).length;

	
#### 接口 interface

> 为类型命名和代码定义契约

	interface LabelValue {
		label: string;
		color? string;
		[propName: string]: any;
	}
	
	function printLabel(labelObj: LabelValue) {
		console.log(labelObj.label);
	}
	
	let myObj = {size: 10, label: 'size 10 object'};
	printLabel(myObj);
	
> 要求printLabel传入的参数对象，必须有一个类型为string的label属性，color可传可不传，和另外不确定的属性，也可以定义函数类型
	
	interface SearchFun {
		someFun(source: string, subString: string): boolean;
		reset(): void;
	}
	
> 可索引的类型

	interface ReadonlyStringArray {
		readonly [index: number]: string;
	}
	let myArray: readonlyStringArray = ['Allice', 'bob'];
	myArray[2] = 'Mallory';  error
		

#### 类

	class Greeter {
		static standardGreeting = 'Hello, there';
		greeting: string;
		greet() {
			if (this.greeting) {
				return 'hello, ' + this.greeting;
			} else {
				return Greeter,standardGreeting;
			}
		}
	}
	
	let greeter1: Greeter;
	greeter1 = new Greeter();
	
	let freeterMarker: typeof Greeter = Greeter; 
	 //typeof Greeter: 表示取Greeter的类型，而不是实力的类型（包含了类的所有静态成员和构造函数）
	greeterMarker.standardGreeting = 'hey there!';
	let greeter2: Greeter = new greeterMaker();
	
#### 函数

> 为函数定义类型

	let myAdd = function(x: number, y:number): number {return x + y};
	
> 可选参数、默认参数、剩余参数

	function(firstName: string, lastName = "smith", age?: number, ...restOfName: string[]){}
	
#### 泛型

> 使用泛型来创建可重用组件，一个组件可以支持多种类型的数据
> 需要一种方法使返回值的类型与传入参数的类型是相同的，这里使用*类型变量*，表示的是类型而不是值。

	function identity<T>(arg: T): T {
		console.log(arg.length)  // error:T dont have .length (泛型约束)
		return arg;
	}
	// 给函数添加了类型变量T，（帮助捕获用户传入的类型，如string），再次使用T当做返回值类型，那可以知道参数类型和返回值类型是相同的了
	// 使用1:明确制定了T是string类型
	let output = identity<string>('myString');
	// 使用2：类型推论（编译器会根据参数自动确定T的类型）
	let output = identity('myString')
	
> 使用泛型变量

	function loggingIdentity<T>(arg: T[]): T[] {
		console.log(arg.length);
		return arg;
	}

#### 枚举 enum

> 用于定义一些带名字的常量，可以清晰的表达意图或创建一组有区别的用例

* 数字枚举

		enum Direction {
			Up = 1,
			Down,
			Left,
			Right
		}
		// 初始化Up为1，其余开始自增长；也可以不指定值，则从0开始记值
		function respond(recipient: string, message: Direction): void {}
		respond('princess Caroline', Direction.left)
		
* 字符串枚举

		enum Direction {
    		Up = "UP",
    		Down = "DOWN",
    		Left = "LEFT",
    		Right = "RIGHT",
		}
		
* 常量枚举

> 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 const枚举。 常量枚举通过在枚举上使用 const修饰符来定义。

		const enum Directions {
    		Up,
    		Down,
    		Left,
    		Right
		}

		let directions = [Directions.Up, Directions.Down, Directions.Left, 		Directions.Right]

		var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
