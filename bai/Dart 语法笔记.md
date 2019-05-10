目录
==
- [变量](#变量)
- [内建类型](#内建类型)
- [可选参数](#可选参数)
  - [命名](#命名)
  - [位置](#位置)
- [运算符](#运算符)
  - [相对JS没有的运算符](#相对JS没有的运算符)
  - [级联运算符](#级联运算符)
- [流程控制语句](#流程控制语句)
- [类](#类)
  - [使用构造函数](#使用构造函数)
  - [实例变量](#实例变量)
  - [构造函数](#构造函数)
    - [默认构造函数](#默认构造函数)
    - [构造函数不被继承](#构造函数不被继承)
    - [命名构造函数](#命名构造函数)
    - [调用父类非默认构造函数](#调用父类非默认构造函数)
    - [初始化列表](#初始化列表)
    - [重定向构造函数](#重定向构造函数)
    - [常量构造函数](#常量构造函数)
    - [工厂构造函数](#工厂构造函数)
  - [Getter和Setter](#Getter和Setter)
  - [抽象类](#抽象类)
  - [隐式接口...](#隐式接口...)
  - [扩展类(继承)](#扩展类(继承))
  - [重写类成员](#重写类成员)
  - [noSuchMethod()](#noSuchMethod())
  - [枚举类型](#枚举类型)
    - [使用枚举](#使用枚举)
    - [为类添加功能&nbsp;Mixin](#为类添加功能&nbsp;Mixin)
    - [静态变量](#静态变量)
    - [静态方法](#静态方法)
- [泛型](#泛型)
  - [使用集合字面量](#使用集合字面量)
  - [使用泛型类型的构造函数](#使用泛型类型的构造函数)
  - [运行时的泛型集合](#运行时的泛型集合)
  - [限制泛型类型](#限制泛型类型)
  - [使用泛型函数](#使用泛型函数)
- [库](#库)
  - [在import语句后面输入库文件的URI](#在import语句后面输入库文件的URI)
  - [设置库前缀](#设置库前缀)
- [只导入库的一部分](#只导入库的一部分)
- [懒加载库](#懒加载库)
  - [实现一个库](#实现一个库)
  - [part&part&nbsp;of](#part&part&nbsp;of)
  - [export](#export)
  - [Typedefs](#Typedefs)

## Dart 概念

- **任何** 保存在变量中的都是一个 **对象**, 并且所有对象都是 **对应类** 的实例.
- 尽管 `Dart` 是强类型的, 但是 Dart 可以 **推断类型**(就是可以根据 value 推断类型), 所以类型注释可可选的.
- 如果明确说明 **不需要任何类型**, 需要使用特殊类型声明 `dynamic`.
- 支持泛型. `如: List <dynamic>`.
- 支持顶级函数. `如: main()`
  - 同样函数绑定在类或对象上(静态/实例)函数.
  - 支持(嵌套/局部)函数.
  - 顶级函数就是在最外层定义的函数.
- 支持顶级变量
  - 同样变量绑定在类或对象上(静态/实例)变量.
  - 实例变量有时成为字段或属性.
- 如果标识符以下划线(_)开头, 则是私有库/变量/方法等, 外部不可访问.
-  风格指南中 var 变量仅存储对象引用.
-  实例变量可以是 `final` 类型但不能是 `const` 类型.
-  `==` 运算符用来测试两个对象是否相等.
-  `..` 语法为 级联调用 （cascade）。 使用级联调用， 可以简化在一个对象上执行的多个操作。

## 变量

- var: 变量
- dynamic: 动态类型
- final: 常量
- const: 编译时常量
- null: 未初始化的变量默认值

## 内建类型

- Number(int/double)
  - int: 整数值不大于 64 位
  - double: 64(双精度)浮点数
- String(string)
  -  'hello \$\{表达式\} world \$标识符'
  -  连续三个单引号可实现多行字符串的创建, 需 `toString()` 转换
  -  使用 `r` 前缀, 可以创建 **原始 raw** 字符串
- Boolean(bool)
- List(List)
- Map
  -  Map 是用来关联 keys 和 values 的对象
- Set
  - 是一个元素唯一且无需的集合
  - `var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};`
- Rune(用于在字符串中标识 Unicode 字符)
- Symbol
  - 表示 Dart 程序中声明的运算符或者标识符

## 可选参数

- {}内的参数为 **命名可选参数**
- []内的参数为 **位置可选参数**
- 参数的用 `=` 来赋值默认值
- 一个参数只能选择其中一种方式修饰

```dart
void doStuff(
    {List<int> list = const [1, 2, 3],
    Map<String, String> gifts = const {
      'first': 'paper',
      'second': 'cotton',
      'third': 'leather'
    }}) {
  print('list:  $list');
  print('gifts: $gifts');
}

doStuff(list: [123, 344], gifts: {
'first': 'zhangsan'
})
```

### 命名


```dart
printPerson(String name,{int age = 14,String gender}){
  print("name=$name,age=$age,gender=$gender");
}

printPerson("李四");
printPerson("李四",age: 20);
printPerson("李四",age: 20,gender: "Male");
printPerson("李四",gender: "Male");
```

### 位置

```dart
printPerson2(String name,[int age = 15,String gender]){
  print("name=$name,age=$age,gender=$gender");
}

printPerson2("张三");
printPerson2("张三",18);
printPerson2("张三",18,"Female");
```

## 运算符

### 相对JS没有的运算符

```dart
// 除后向下取整
10 ~/ 2.1 = 2; 

if (emp is Person) {
  // Type check
  emp.firstName = 'Bob';
}

// 使用 as 运算符进行缩写：
(emp as Person).firstName = 'Bob';

// 当 value 为 null 时, 才会赋值给 b
b ??= value;

// 如果实例类 p 成员变量 y 为非 null，则设置它变量 y 的值为 4
p?.y = 4;
```

### 级联运算符

示例: 

```dart
querySelector('#confirm') // 获取对象
  ..text = 'Confirm' // 调用成员变量
  ..classes.add('important') // 添加类名
  ..onClick.listen((e) => window.alert('Confirmed!')); // 注册事件
```

嵌套:

```dart
final addressBook = (AddressBookBuilder()
      ..name = 'jenny'
      ..email = 'jenny@example.com'
      ..phone = (PhoneNumberBuilder()
            ..number = '415-555-0100'
            ..label = 'home')
          .build())
    .build();
```

## 流程控制语句

- `if-else` 判断条件必须是 **布尔值**
- `assert` 语句中的布尔条件为 `false`, 会中断程序(只在开发环境有效).

## 类

- 在 Dart 2 中 new 关键字为可选.

### 使用构造函数
```dart
var a = const ImmutablePoint(1, 1); // 创建一个常量对象
var b = ImmutablePoint(1, 1); // 创建一个非常量对象

assert(!identical(a, b)); // 两者不是同一个实例!
```

### 实例变量

```dart
class Point {
  num x; // 声明示例变量 x，初始值为 null 。
  num y; // 声明示例变量 y，初始值为 null 。
  num z = 0; // 声明示例变量 z，初始值为 0 。
}
```

### 构造函数

通过创建一个与其类同名的函数来声明构造函数.

最常见的构造函数形式， 即生成构造函数， 创建一个类的实例：

```dart
// 传统方式
class Point {
  num x, y;

  Point(num x, num y) {
    // 还有更好的方式来实现下面代码，敬请关注。
    this.x = x;
    this.y = y;
  }
}

// Dart 自身的语法糖精简了这些代码
class Point {
  num x, y;

  // 在构造函数体执行前，
  // 语法糖已经设置了变量 x 和 y。
  Point(this.x, this.y);
}
```


#### 默认构造函数

> 在没有生命构造函数的情况下, Dart 会提供一个默认的构造函数.

#### 构造函数不被继承

> 子类不会继承父类的构造函数.

#### 命名构造函数

> 使用命名构造函数可为一个类实现多个构造函数, 也可以使用早含函数来更清晰的表明函数意图.

```dart
class Point {
  num x, y;

  Point(this.x, this.y);

  // 命名构造函数
  Point.origin() {
    x = 0;
    y = 0;
  }
}
```

切记, 构造函数不能够被继承, 这意味着 **子类不能继承**.

#### 调用父类非默认构造函数

```dart
class Person {
  String firstName;
  // 命名构造函数
  Person.fromJson(Map data) {
    print('in Person');
  }
}
// Employee 类的构造函数调用了父类 Person 的命名构造函数
class Employee extends Person {
  // Person 没有默认的构造函数, 所以必须要用 super.fromJson(data)手动继承一下
  Employee.fromJson(Map data) : super.fromJson(data) {
    print('in Employee');
  }
}

main() {
  var emp = new Employee.fromJson({});

  // Prints:
  // in Person
  // in Employee
  if (emp is Person) {
    // Type check
    emp.firstName = 'Bob';
  }
  (emp as Person).firstName = 'Bob';
}
```

#### 初始化列表

```dart
import 'dart:math';

class Point {
  // 定义构造函数参数
  final num x;
  final num y;
  final num distanceFromOrigin;
  // 初始化参数
  Point(x, y)
      : x = x,
        y = y,
        distanceFromOrigin = sqrt(x * x + y * y);
}

main() {
  var p = new Point(2, 3);
  print(p.distanceFromOrigin);
}
```

#### 重定向构造函数

> 有时构造函数的唯一目的是重定向到 **同一个类** 中的另一个构造函数.

```dart
class Point {
  num x, y;

  // 类的主构造函数。
  Point(this.x, this.y);

  // 指向主构造函数
  Point.alongXAxis(num x) : this(x, 0);
}
```

#### 常量构造函数

> 如果该类生成的对象是固定不变的， 那么就可以把这些对象定义为编译时常量。

#### 工厂构造函数

> 当执行构造函数 **并不总是创建** 这个类的一个 **新实例时**，则使用 factory 关键字。

### Getter和Setter

> Getter和Setter 是用于对象属性读和写的特殊方法。

```dart
class Rectangle {
  num left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // 定义两个计算属性： right 和 bottom。
  num get right => left + width;
  set right(num value) => left = value - width;
  num get bottom => top + height;
  set bottom(num value) => top = value - height;
}

void main() {
  var rect = Rectangle(3, 4, 20, 15);
  assert(rect.left == 3);
  rect.right = 12;
  assert(rect.left == -8);
}
```

### 抽象类

> 使用 abstract 修饰符来定义, 抽象类通常用来定义接口，以及部分实现。

### 隐式接口...

> 每个类都 **隐式的定义** 了一个接口, 接口包含了该类所有的实例成员及其实现的接口.

一个类可以通过 `implements` 关键字来实现一个或者多个接口, 并实现每个接口要求的API.

```dart
// person 类。 隐式接口里面包含了 greet() 方法声明。
class Person {
  // 包含在接口里，但只在当前库中可见。
  final _name;

  // 不包含在接口里，因为这是一个构造函数。
  Person(this._name);

  // 包含在接口里。
  String greet(String who) => 'Hello, $who. I am $_name.';
}

// person 接口的实现。
class Impostor implements Person {
  get _name => '';

  String greet(String who) => 'Hi $who. Do you know who I am?';
}

String greetBob(Person person) => person.greet('Bob');

void main() {
  print(greetBob(Person('Kathy')));
  print(greetBob(Impostor()));
}
```

### 扩展类(继承)

> 使用 `extends` 关键字来创建子类, 使用 `super` 关键字来引用父类.

### 重写类成员

> 子类可以重写实例方法, getter和setter.  可以使用 `@override` 注解指出想要重写的成员:

### noSuchMethod()

> 当代码尝试使用不存在的方法或实例变量时, 通过重写 `noSuchMethod()` 方法, 来实现检测和应对处理:

### 枚举类型

> 枚举类型也成为 `enumerations` 或 `enums`, 是一种特殊的类, 用于表示 **数量固定的常量值**.

#### 使用枚举

枚举中的每个值都有一个 `index getter` 方法, 该方法的返回值是 **所在枚举类型定义中的位置** (从0开始).

枚举类型具有以下限制:

- 不能被子类化, 混合或实现.
- 枚举不能被显示实例化.


```dart

void main() {
  var currentSeason  = Season.spring;

  print(currentSeason.index);
  print(Season.values);
  // 如果不处理所有枚举值, 会受到警告:
  switch(currentSeason){
    case Season.spring:
      print("1-3月");
      break;
    case Season.summer:
      print("4-6月");
      break;
    case Season.autumn:
      print("7-9月");
      break;
    case Season.winter:
      print("10-12月");
      break;
  }
}

enum Season{
  spring,
  summer,
  autumn,
  winter
}
```

#### 为类添加功能&nbsp;Mixin

> `Mixin` 是 **复用类代码** 的一种途径, 复用的类可以在不同层级可以不存在 **继承关系**.

#### 静态变量

> 静态变量(类变量)对于类级别的状态是非常有用的

```dart
class Queue {
  static const initialCapacity = 16;
  // ···
}

void main() {
// 静态变量直到它们被使用的时候才会初始化.
  assert(Queue.initialCapacity == 16);
}
```

#### 静态方法

> 静态方法(类方法) **不能再实例上使用**, 因此不能访问 `this`.

- 对于常见或广泛使用的工具和函数, 应该考虑使用顶级函数而不是静态方法.
- 静态函数可以当做编译时常用使用. 
  - 例如, 可以将 **静态方法作为参数传递给常量构造函数**.

## 泛型

在类型安全上通常需要泛型支持, 它的好处不仅仅是保证代码的正常运行:
- 正确指定泛型类型可以 **提高代码质量**.
- 使用泛型可以 **减少重复的代码**.

```dart
// T 是一个备用类型, 属于类型占位符, 在开发者调用该接口的时候会指定具体类型.
abstract class Cache<T> {
  T getByKey(String key);
  void setByKey(String key, T value);
}
```

### 使用集合字面量

```dart
var names = <String>['Seth', 'Kathy', 'Lars'];
var ages = <num>[1,21,2,3];
var aaa = <dynamic>[1,21,2,3, 'sad', {'name': 'zhang'}, [12,21,3]];
var uniqueNames = <String>{'Seth', 'Kathy', 'Lars'};
var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
};
```

### 使用泛型类型的构造函数

```dart
// 定义 Set 数据接口中类型为 string
var nameSet = Set<String>.from(names);
// 创建了一个 key 为 integer, value 为 View 的 map 对象：
var views = Map<int, View>();
```

### 运行时的泛型集合

> Dart 中泛型类型是 **固化的**, 也就是说在 **运行时是携带者类型信息的**.

### 限制泛型类型

> 使用泛型类型的时候, 可以使用 `extends` 实现参数类型的限制.

### 使用泛型函数

```dart
T first<T>(List<T> ts) {
  // 做一些初始化工作, 然后...
  T tmp = ts[0];
  // 做一些额外的处理和检查, 然后...
  return tmp;
}
```

- 函数的返回值类型(`T`)
- 参数的类型(`List<T>`)
- 局部变量的类型(T tep)

## 库

### 在import语句后面输入库文件的URI

```dart
// 引入第三方库文件
import 'package:flutter/material.dart';
// 引入项目中的文件
import './animated_cross_fade_demo.dart';
// 引入 dart 提供的库文件
import 'dart:html
```

### 设置库前缀

```dart
// 当不同库出现同样标识符, 可以用库前缀解决解决命名冲突
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;
```

## 只导入库的一部分

```dart
import 'package:lib1/lib1.dart' show foo; // 仅导入 foo
import 'package:lib2/lib2.dart' hide foo; // 除了 foo 外都导出
```

## 懒加载库

```dart
// 当使用的时候在加载
import 'package:deferred/hello.dart' deferred as hello;

// 使用的时候
hello.loadLibrary();
```
### 实现一个库

```dart
使用 `library` 加上一个标识符 `point` 定义当前库的名字
library point;
```

### part&part&nbsp;of

如果一个库的所有代码都卸载一个文件中, 会导致文件太大不好维护, 可以用 `part` & `part of` 关键字拆分文件.

`library` 语句所在的主文件中可以使用 `import` 和 `part` 语句, 但是 `part of` 所在的实现文件中不能使用任何 import/library/part语句. 库使用的所有 import 和 part 语句都必须放在主文件中声明.

```dart
// 主文件 定义一个 math 库。它由 base，random 两部分组成
library math;
part 'base.dart';
part 'random.dart';
```

```dart
// 在 base.dart 文件的开头
part of math
```

```dart
// 在 random.dart 文件的开头
part of math;
```

### export

可以使用 export 语句重新导出库.
比如:
把多个较小的库组合为一个较大的库或者重新导出库的一部分作为一个新的库.
既可以导出库的全部, 也可以导出库的一部分(使用 show 和 hide).

## Typedefs

```dart
// 定义函数参数类型与返回值
typedef int CalFunc(int num1, int num2);
main() {
    int num1 = 1;
    int num2 = 2;
    // 参数调用与传递
    int calculate(CalFunc func) {
        return func(num1, num2);
    };
    int result = calculate((int num1, int num2) {
        return num1 - num2;
    });
    print(result);
}
```
