#### 架构预览 
    - 1、是这样写 Angular 应用的：
            - 用 Angular 扩展语法编写 HTML 模板，
            - 用组件类管理这些模板，用服务添加应用逻辑，
            - 用模块打包发布组件与服务。   
#### 模块 

    - 1、每个 Angular 应用至少有一个模块（根模块），习惯上命名为AppModule。

    - 2、Angular 模块（无论是根模块还是特性模块）都是一个带有@NgModule装饰器的类。

    - 3、装饰器是用来修饰 JavaScript 类的函数。 Angular 有很多装饰器，它们负责把元数据附加到类上，以了解那些类的设计意图以及它们应如何工作。
    NgModule装饰器函数 
        NgModule是一个装饰器函数，它接收一个用来描述模块属性的元数据对象。其中最重要的属性是：
            - declarations - 声明本模块中拥有的视图类。Angular 有三种视图类：组件（component.ts）、指令和管道。
            exports - declarations 的子集，可用于其它模块的组件模板。

            imports - 本模块声明的组件模板需要的类所在的其它模块module.ts。

         providers - 服务(service.ts)的创建者，并加入到全局服务列表中，可用于应用任何部分。

            bootstrap - 指定应用的主视图（称为根组件），它是所有其它视图的宿主。只有根模块才能设置bootstrap属性。

    - main.ts文件 

        通过引导根模块来启动应用。 在开发期间，通常在一个main.ts文件中引导AppModule； 

    ##### NgModules vs. JavaScript 模块 

        - 1、JavaScript也有自己的模块系统，用来管理一组 JavaScript对象，它与 Angular 的模块系统完全不同且完全无关； 

        - 2、这两个模块化系统是互补的，我们在写程序时都会用到。 
    ##### Angular 模块(module)库 
        - 1、Angular 提供了一组 JavaScript 模块，每个 Angular 库的名字都带有@angular前缀； 

        - 2、使用规则： 
            1、用 JavaScript 的import语句导入这些组件，如。import { BrowserModule } from '@angular/platform-browser'; 

            2、要使用这些组件，还得把它加入@NgModule元数据的imports中，如：imports: [ BrowserModule ]； 

            3、这种情况下，你同时使用了 Angular 和 JavaScript 的模块化系统。 

#### 组件 

    - 1、组件负责控制屏幕上的一小块区域，我们称之为视图。 
    - 2、每一个component.ts文件就是一个组件； 

    - 3、在组件类中定义组件的应用逻辑，为视图提供支持。 组件通过一些由属性和方法组成的 API 与视图交互。 

    - 4、当用户在这个应用中漫游时， Angular 会创建、更新和销毁组件。 应用可以通过生命周期钩子在组件生命周期的各个时间点上插入自己的操作，例如上面声明的ngOnInit()。 


#### 元数据 

    - 1、元数据告诉 Angular 如何处理一个类。 

    - 2、实际上，HeroListComponent真的只是一个类。直到我们告诉 Angular 它是一个组件，要告诉 Angular HeroListComponent是个组件，只要把元数据附加到这个类。 

    - 3、在TypeScript中，我们用装饰器来附加元数据。 


#### @Component装饰器 

    - 1、@Component装饰器能接受一个配置对象， Angular 会基于这些信息创建和展示组件及其视图。 

    - 2、@Component的配置项包括： 

        - selector： CSS 选择器，它告诉 Angular 在父级 HTML 中查找<hero-list>标签，创建并插入该组件； 

       - templateUrl：组件 HTML 模板的模块相对地址，如前所示； 

       - providers - 组件所需服务的依赖注入提供商数组。 这是在告诉 Angular：该组件的构造函数需要一个HeroService服务，这样组件就可以从服务中获得英雄数据； 

    - 3、@Injectable、@Input和@Output等是一些最常用的装饰器。 


#### 数据绑定

    - 1、Angular 支持数据绑定，一种让模板与组件相互合作的机制；

    - 2、我们往模板 HTML 中添加绑定标记，来告诉 Angular 如何把二者联系起来；

    - 3、数据绑定在模板与对应组件的交互中扮演了重要的角色，数据绑定在父组件与子组件的通讯中也同样重要。


#### 指令(derective)

    - 1、严格来说组件就是一个指令；

    - 2、还有两种其它类型的指令：结构型指令和属性 (attribute) 型指令。

    - 3、结构型指令通过在 DOM 中添加、移除和替换元素来修改布局，如*ngFor

    - 4、属性型 指令修改一个现有元素的外观或行为，如ngModel。


#### 服务（service）

    - 1、依赖注入的就是服务；

    - 2、例如，日志服务、数据服务、data service、消息总线、message bus、税款计算器、tax calculator、应用程序配置；

    - 3、组件就是最大的服务消费者。

    - 4、组件类应保持精简。组件本身不从服务器获得数据、不进行验证输入，也不直接往控制台写日志。 它们把这些任务委托给服务。

    - 5、设计良好的组件为数据绑定提供属性和方法，把其它琐事都委托给服务。

    - 6、angular让我们能轻易地把应用逻辑拆分到服务，并通过依赖注入来在组件中使用这些服务。


#### 依赖注入

    - 1、大多数依赖都是服务。

    - 2、组件的任务就是提供用户体验，仅此而已。它介于视图（由模板渲染）和应用逻辑（服务）之间。

    - 3、Angular 通过查看构造函数的参数类型得知组件需要哪些服务，如，constructor(private service: HeroService) { } 这句代码是写到component.ts组件文件中的；

    - 4、在constructor注入服务前，需要先注册提供商（provider），提供商来创建服务，而后才能注入，而后才能使用服务；

            a、注册提供商可以在模块中也可以在组件中，即providers:  [ HeroService ]可写在module.ts模块中也可写在component.ts组件中；

    - 5、依赖注入具体步骤：

            第一步：注册提供商,providers: [ ] , 可写在module.ts模块中也可写在component.ts组件中；

            第二步：在组件中通过constructor（）注入到组件中，而后组件中即可访问此服务的方法了；

