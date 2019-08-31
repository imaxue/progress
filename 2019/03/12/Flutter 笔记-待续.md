## 概念

- StatelessWidget 只负责显示的
- StatefulWidget 组件是可以拥有状态的
- 在Dart中 甚至连 数字、方法和null都是对象
- 所有的对象都继承于Object类
- Dart动态类型语言, 尽量给变量定义一个类型，会更安全，没有显示定义类型的变量在 debug 模式下会类型会是dynamic(动态的)
- Dart会在运行之前解析你的所有代码，指定数据类型和编译时的常量，可以提高运行速度
- Dart中的类和接口是统一的，类即接口，你可以继承一个类，也可以实现一个类（接口），自然也包含了良好的面向对象和并发编程的支持
  Dart函数

- 支持顶级函数 (例如main())
- 支持在类中定义函数, 如静态函数和实例函数
- 还可以在方法中定义方法（嵌套方法或者局部方法）
- 类似的，Dart支持顶级变量，以及依赖于类或对象（静态变量和实例变量）变量。实例变量有时被称为域或属性
  Dart不具备关键字public，protected和private。如果一个标识符以下划线（_）开始，那么它和它的库都是私有的
  标识符可以字母或（_）开始，或者是字符加数字的组合开头

## 变量

声明变量

```dart
var name = 'name';
dynamic name1 = 'name1';
String name2 = 'name2';

// 变量的赋值
name = 'a';
name1 = 'a1';
name2 = 'a2';
```


```js
var name;
dynamic name1;
String name2;
```

在声明变量的时候，你可以选择加上具体的类型：

```
String name2 = 'name2';
```

## 常量

- 常量使用final或者const
- 一个final变量只能赋值一次
- 一个const变量是编译时常量
- 实例变量可以为final但是不能是const