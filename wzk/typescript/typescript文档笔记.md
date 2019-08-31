### 快速入门
#### 1、安装TypeScript
- 有两种主要的方式来获取TypeScript工具：
  - 通过npm（Node.js包管理器）
    ```
     npm install -g typescript
    ```
  - 安装Visual Studio的TypeScript插件
    - Visual Studio 2017和Visual Studio 2015 Update 3默认包含了TypeScript。
    - 如果你的Visual Studio还没有安装TypeScript，你可以下载它。

#### 2、编写TypeScript文件
```
    //greeter.ts文件
    //类
    class Student {
        fullName: string;   //类型注解
        constructor(public firstName, public middleInitial, public lastName) {
            this.fullName = firstName + " " + middleInitial + " " + lastName;
        }
    }
    //接口
    interface Person {
        firstName: string;
        lastName: string;
    }
    
    function greeter(person : Person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }
    
    let user = new Student("Jane", "M.", "User");
    
    document.body.innerHTML = greeter(user);
```
#### 3、编译代码
- 在命令行上，运行TypeScript编译器：
    ```
    tsc greeter.ts
    ```
- 执行命令后会在当前目录下生成一个greeter.js文件；

#### 4、新建greeter.html文件并引入编译后的js文件
```
    <!DOCTYPE html>
    <html>
        <head><title>TypeScript Greeter</title></head>
        <body>
            <script src="greeter.js"></script>
        </body>
    </html>
```
- 在浏览器里打开greeter.html运行这个应用

### 基础类型
- TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。 
- 元组 Tuple
  - 元组类型表示一个已知元素数量和类型的数组，各元素的类型不必相同；
    ```
    // Declare a tuple type
    let x: [string, number];
    // Initialize it
    x = ['hello', 10]; // OK
    //当访问一个越界的元素，会使用联合类型替代：
    x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
    ```

- 枚举
  - 使用枚举类型可以为一组数值赋予友好的名字;
    ```
    enum Color {Red, Green, Blue}
    let c: Color = Color.Green;
    ```
  - 枚举类型提供的一个便利是你可以由枚举的值得到它的名字:
    ```
    enum Color {Red = 1, Green, Blue}
    let colorName: string = Color[2];
    
    alert(colorName);  // 显示'Green'因为上面代码里它的值是2
    ```
- Any
  - 有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。
  - 那么我们可以使用 any类型来标记这些变量

- Void
  - 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。
  - 当一个函数没有返回值时，你通常会见到其返回值类型是 void：
    ```
    function warnUser(): void {
        alert("This is my warning message");
    }
    ```
- Null 和 Undefined
  - 默认情况下null和undefined是所有类型的子类型;
  - 就是说你可以把 null和undefined赋值给number类型的变量。

- Never类型
  - never类型表示的是那些永不存在的值的类型。
  - 下面是一些返回never类型的函数：
    ```
    // 返回never的函数必须存在无法达到的终点
    function infiniteLoop(): never {
        while (true) {
        }
    }
    ```
- 类型断言
  - 貌似是把一个any类型的数据断言成具体某种类型；
  - 类型断言有两种形式。 其一是“尖括号”语法：
    ```
    let someValue: any = "this is a string";
    
    let strLength: number = (<string>someValue).length;
    ```
  - 另一个为as语法：
    ```
    let someValue: any = "this is a string";
    
    let strLength: number = (someValue as string).length;
    ```
