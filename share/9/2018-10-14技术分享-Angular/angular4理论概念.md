### 一、历史背景
- 12年6月，AngularJS1.0.0正式版推出；
- AngularJS1.3.x放弃支持IE8；
- Angular1.x的痛点：
  - 性能差
  - 落后的web发展理念（如不支持组件式开发）
  - 对手机端支持不够友好
- 16年9月，Angular2 正式版发布，AngularJS更名为Angular；
- Angular2的特性：
  - Angular2向下不兼容Angular1.x，但是提供了一个非常友好的迁移方案；
  - 组件开发的理念；
  - 性能更好；
  - 优先为移动应用设计；
  - 更加贴合未来的标准（ES6/7）

### 二、核心概念
- angular2有八大核心概念：
  - 组件：核心中的核心，其他概念都是为组件服务的；
  - 元数据；
  - 模板；
  - 数据绑定；
  - 服务；
  - 指令；
  - 依赖注入；
  - 模块；

#### 1、组件及组件树
##### 1.1 组件树示例：手机通讯录页面
- 整个页面就是一个组件
  - 头部header是一个子组件
  - 中部联系人列表是一个子组件
    - 列表中的每一个联系人也是一个子组件
  - 底部footer是一个子组件

##### 1.2 组件要素
- JavaScript
- HTML
- CSS

##### 1.3 父子组件间通讯机制
##### 1.4 组件的生命周期钩子（以下是几个重要的钩子）
- constructer: 构造器初始化；
- OnChanges: 第一次触发数据变化钩子；
- OnInit：组件初始化；
- OnChanges：运行期间触发数据变化钩子；
- OnDestory： 组件销毁前
  - 可解绑事件
  - 可取消订阅

##### 1.5 组件示例

```
@Component({  //装饰器
  selector: 'hello',  //元数据
  template:'<p>{{greeting}}</p>' //元数据
  //template指定模板->{{greeting}}是数据绑定
})
export class HelloComponent {  //组件类
  private greeting: string;
  constructor() {}
  OnInit() {
    this.greeting = 'Hello Angular2!'
  }
}
```
##### 1.6 装饰器与元数据
- 装饰器把它的元数据参数注入到class类中，从而使这个class类变成了angular能识别的组件(或模块或指令)；
- 装饰器：赋予一个类更丰富的信息(元数据)；

##### 1.7 数据绑定
- 属性绑定：<input [value]="myData" />
  - 作用：把组件类的数据传递到模板
- 事件绑定：<input (click)="handle($event)" />
  - 作用：把模板中的数据通过函数调用的方式传递到组件类
- 双向绑定：[(ngModel)]

##### 1.8 数据流向
- 父组件组件类-->通过属性绑定-->父组件模板--->通过属性绑定+@Input--->子组件的组件类-->通过属性绑定-->子组件模板
- 子组件的模板--->通过事件绑定-->子组件类-->通过事件绑定+@Ouput--->父组件模板-->通过事件绑定-->父组件的组件类


#### 2、指令
- 本质：指令是对模板元素的拓展；
- 组件是指令的一种，是一种自身带有模板的指令；
##### 2.1指令分类
- 按用途分类
  - 属性指令：用来改变组件模板的外观或者行为，如样式等；
  - 结构指令：用来改变组件模板的DOM结构，如*ngIf用来插入或移除DOM节点；
- 按产生方式分类
  - angular内置指令：angular框架已封装好的，拿来就用即可；
    - 注意积累常用的内置指令；
  - 自定义指令：开发者自己开发的；
##### 2.2内置指令示例

```
public myColor: any = "red";
template: "<p [style.color]="myColor">{{greeting}}</p>"

//经过组件渲染后
<hello>
	<p style="color:red">Hello angular2</p>
</hello>
```
##### 2.3自定义指令示例

```
//highlight.directive.ts
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: "[highlight]"
})
export class HighlightDirective {
  constructor(
    private el: ElementRef, 
    private renderer: Renderer
  ) { 
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
  }
}

//使用定义好的自定义指令
<p highlight >使用此自定义指令后p标签的背景色变为黄色</p>
```

#### 3、服务与依赖注入
##### 3.1 服务是什么？
- 服务是实现专一目的的逻辑单元，如日志服务；
- 服务就是一个calss类=内部封装了很多函数的对象=类似于js中的内置对象
- 服务最终是被组件使用的，组件中引入服务就是通过依赖注入实现的；

##### 3.2 服务分类：
- 内置服务：angular框架封装好的服务，如HttpClient服务（内部封装的是ajax）
  - 注意积累常用的内置服务；
- 自定义服务：开发者自己开发的

##### 3.2 依赖注入
- 依赖注入：组件引入外部构建（如服务）的一种机制；
##### 3.3 自定义一个服务示例

```
//logger.service.ts
import { Injectable } from '@angular/core';

@Injectable() 
export class LoggerService {
  constructor() { }

  debug(msg: string) {
    console.log(msg);
  }
}
```
##### 3.4 组件依赖注入服务示例

```
//1、引入服务文件
import { LoggerService } from './logger.service';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
  providers: [ LoggerService ]  //2、实例化服务并缓存到注入器中
})
export class AppComponent {
  //3、根据构造函数constructo中的参数找到注入器中的服务实例，并传入组件
  constructor(private logger: LoggerService) {	}

  ngOnInit() {
    //4、组件中即可调用服务中的方法函数
    this.logger.debug('应用已初始化');
  }
}
```
##### 3.5 依赖注入的分层注入
- 父组件中注入服务后，其子组件中无需再provider注入即可使用；
- 把服务注入到模块中，则服务的作用域是整个模块，无需每个组件都注入；
- 注入provider可在模块中配置，但组件中还需再次inport服务文件这个省不了；


#### 4、模块
##### 4.1 模块分类
- 文件模块：即anfular框架中的源代码以模块形式组织；
  - 文件模块==angular内置模块
  - angular框架作者编写的angular源代码，以模块的形式组织代码；
- 应用模块：即功能单元以模块形式组织；
  - 应用模块==自定义模块；
  - angular框架的使用者编写的实际项目代码，以模块的形式组件代码；

##### 4.2 文件模块（angular内置模块）
######  4.2.1 常用的内置的一级模块：
  - @angular/core: 核心模块，包含以下功能
    - 变化检测功能的源代码；
    - 依赖注入功能的源代码；
    - 渲染组件功能的源代码；
    - Component组件装饰器对象；
    - Directive指令装饰器对象；
    - 等。。。
  - @angular/common：通用模块，包含以下功能
    - 常用的内置指令的源代码；
  - @angular/forms：表单模块，包含以下功能
    - 表单相关的组件和指令；
  - @angular/http：网络模块，包含以下功能
    - 处理网络请求相关的服务；
  - 更多其他的内置模块。。。

###### 4.2.2 文件模块的使用方法

```
//按需导入对应的内置模块即可
import { Component } from '@angular/core';
```

##### 4.3 应用模块（自定义模块）的特性
- 应用模块就是把有零散的的组件、指令、服务等按功能进行分类包装而成的功能单元；
- 默认情况下一个组件是不能使用其他组件或者指令的功能的，而通过应用模块的导入导出功能形成一个应用模块后，模块内的组件和指令就可以相互利用了
- 跨模块间的组件要想相互使用，也需要模块的导入导出；

##### 4.4 应用模块示例

```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { ChildComponent } from './child.component';
import { HighlightDirective } from './highlight.directive';
import { LoggerService } from './logger.service';

@NgModule({
  //imports用来导入其他模块
  imports: [ BrowserModule, FormsModule ],
  //declarations用来引入组件和指令等
  declarations: [ AppComponent, ChildComponent, HighlightDirective ],
  //providers用来依赖注入服务
  providers: [ LoggerService ],
  //bootstrap设置根组件
  bootstrap: [ AppComponent ]，
  //export导出组件或者指令等
  export：[ChildComponent, HighlightDirective]
})
export class AppModule { }
```
##### 4.5 实际项目中应用模块的分类
- 根模块：应用启动的入口，项目中只有一个；
- 特性模块：整个应用可分割为多个特性功能模块，这些特性模块导入到根模块即可；
- 共享模块（公共模块）：多个特性模块之间把相似的功能组件抽离出来封装而成的模块，如theme模块；
- 核心模块：应用中的全局的组件或者服务，它们只需在应用启动的时候初始化一次，如维护登录信息的服务或者功能的头部组件，这些逻辑一般抽离封装成一个核心模块；
- 搭建项目时可参考这个模块分类思路把项目拆分抽离组装搭建起来；
- 思考统一运营平台项目的搭建结构；

### 三、相关知识点
#### 1、TypeScript
##### 1.1 TypeScript特性
- angular2官方推荐的语言；
- 微软开发的编程语言；
- JavaScript的超集，兼容JavaScript；
- 并不能运行在浏览器上，运行前需要预编译生成JavaScript；
- 加入了类型判断，编译时进行类型检查；
- 文件扩展名为.ts
##### 1.2  使用示例
- TypeSctipt就是type + JavaScript；
- 变量、函数以及函数的参数的声明都定义类型；

```
var book: string = "Angular2";
var num: number = 123;

function log(msg: string): void {
    console.log(msg);
}
```
##### 1.3 类和接口
- TypeScript中calss类的概念是继承自ES6
- 接口的关键字是interface

##### 1.4 装饰器
- 装饰器的概念其实是TypeScript中的，而非angular中的；
- 装饰器是一种特殊类型的声明；
- 能够被附加到类、方法、访问符、属性或参数上；

```
@SomeDecorator({
    //配置
})
class SomeClass {}
//TypeSctipt并不会帮我们实现装饰器的逻辑，需我们定义，如下
function SomeDecorator(config: any) {
    return function(cls: any) { //cls为类的构造函数
        cls.isSealed = true;
        return cls;
    }
}
```
- 故Angular2中的@Component等装饰器正是angular2框架的编者使用了TypeScript中的装饰器机制实现的，具体的代码实现在angualr/core中；

##### 官网地址：https//www.typescriptlang.org/

### 四、开发环境搭建
- 搭建环境有两种方式
  - 使用脚手架angular-cli，其集成了打包工具webpack；
  - 不使用angular-cli的方式，需自己下载并配置打包工具；
- IDE工具推荐下VS Code编辑器
  - 微软推出的，免费跨平台编辑器，支持TypeScript语法高亮及提示；
  - TypeScript也是微软推出的，故提示比较好；

### 五、hello Angular2 快速上手demo
- [github地址点击跳转](https://github.com/lizhonghui/angular2-demo)
