# StatelessWidget 和 StatefulWidget

Flutter 框架给我们提供了 StatelessWidget 和 StatefulWidget 两个抽象类，用于自定义控件。

1. StatelessWidget - 无状态控件
   仅仅用于展示给定的信息，无交互
2. StatefulWidget - 有状态控件
   与用户进行交互，比如通过键盘输入内容、通过滑动屏幕移动滑块、点击时改变状态，数据更新状态等一些列用户的交互。
   定义一个状态类继承自State类，需要注意，State类是个泛型类，需要将继承自``StatefulWidget``的有状态组件类传入State；在状态类中实现build方法并返回你所需要的Widget；状态类中通过setState方法来改变组件的状态。

```dart
import 'package:flutter/material.dart';

void main() => runApp(new MyStatefulWidget());

// 定义一个有状态的组件
class MyStatefulWidget extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new MyStatefulWidgetState();
  }
}

// 定义一个有状态的组件时，必须为该组件创建一个状态类，这个类继承自State类
class MyStatefulWidgetState extends State<MyStatefulWidget> {

  String text = "Click Me!";

  changeText() {
    if (text == "Click Me!") {
      setState(() {
        text = "Hello World!";
      });
    } else {
      setState(() {
        text = "Click Me!";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: "Test",
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text("Test"),
        ),
        body: new Center(
          // InkWell是Flutter内置的一个Widget，用于给其他Widget添加点击事件，并且在点击时会有水波纹扩散效果
          child: new InkWell(
            child: new Text(text),
            onTap: () {
              this.changeText();
            },
          ),
        ),
      ),
    );
  }
}
```
