##### 依赖注入：dependency injectiion

> 让创建的对象和函数，映射到相应的依赖中。<br>
> 模块：module，若要进行依赖注入，需要先把这些需要协同工作的对象和函数注册的某个地方（模块）中。

            ng-app='invoice2' ：告诉angular使用invoice2模块作为该应用程序的主模块。
            angular.module('invoice',['finance']):invoice模块依赖于finance模块。

* js中的工厂factory：是指一个以函数作为返回值的函数。

##### 1. 自动初始化：
> document.readyState被置为‘complete’的情况下，初始化时，angular会去找ng-app这个指明应用开始所在的指令，然后做以下事情：<br>
> 1. 加载ng-app指令所指定的模块
> 2. 创建应用所需的injector
> 3. 以ng-app所在的节点为根节点，开始遍历并编译DOM树

##### 2. 手动初始化：

        <script>
        angular.element(document).ready(function(){
        angular.module('myApp',[]);
        angular.bootstrap(document,['myApp']); //可以添加应用启动时被注入的模块
        });
        </script>

> 在HTML页面以及所有代码加载完毕后，angular会去找到应用的根元素（通常是文档的根节点）<br>
> 调用api/angular.bootstrap去编译各元素成为一个可执行的且双向绑定的应用。

* HTML编译过程
> 1.编译：遍历DOM节点，收集所有的指令，返回一个连接函数（link func）<br>
> 2.连接：将上一步收集到的每个指令和其作用域连接生成一个实时视图。（任何作用域的模型改变都会实时在视图中反应出来，交互也会映射到作用域的模型中。数据模型就是唯一数据源）<br>
> 3.指令：遇到特定的HTML结构（指令)，指令所声明的行为操作会被触发。

            <span ng-bind="exp"></span>
            <span class="ng-bind: exp;"></span>
            <ng-bind></ng-bind>
            <!-- directive: ng-bind exp -->
            以上指令等价

##### 控制器controller
> 通过ng-controller指令被添加到DOM中，ng会调用构造函数生成一个控制器对象，便创建了一个新的子级作用域scope，同时scope会作为$scope参数注入其中。

* 1. 初始化$scope对象
* 2. 为$scope对象添加行为方法
* 在特定模块下，为.controller为应用创建控制器：

        var myApp = angular.module('myApp',[])
        myApp.controller('GreetingCtrl',['$scope',function($scope){
        $scope.greeting = 'Hola!';
        }])

* 使用：1.只负责一个单一视图所需的业务逻辑，其他的抽象逻辑都封装到services中
* 任何形式的DOM操作：属于表现曾逻辑，请封装在指令中
* 格式化输出：请使用angular表单控件
* 过滤输出：请使用angular过路器代替
* 控制器与scope关联
> 1.ngController指令，这个指令会创建一个新的scope，性对应与dom层级的scope基于继承的关系。
> 2.$route路由服务


##### 作用域scope
* 作用域的结构对应于DOM结构，指令可以创建子级作用域、controller也可创建作用域
* 提供了$watch方法监听数据模型
* 提供了$apply方法将 不是ng触发的数据模型的改变引入ng的控制范围(controller\services...)内，如jQuery等
* 提供了表达式的执行环境
* 提供了基于原型链继承其父作用域属性的机制
* angular.element($0).scope()控制台可查看：从DOM元素抓取作用域的方式




##### 依赖注入dependency injection
> 每个angular应用都有一个injector对象，类似于一个服务定位器，负责创建和查找依赖。
> 使用：$inject注释

        为了避免代码压缩会重命名参数，通过$inject属性进行标注
        var MyController = function($scope,greeter){}
        MyController['$inject'] = ['$scope', 'greeter']


##### 模板template
> 一个声明式视图，一个动态DOM。


##### css类
* ng-scope
* ng-binding
* ng-invalid,ng-valid
* ng-pristine,ng-dirty: ng-pristine给没有交互的input元素附加；有交互式加ng-dirty.


##### 过滤器filter
> {{表达式 | 过滤器名}}、{{表达式  |  过滤器1  | 过滤器2  |  .. }} 、 {{ 表达式 | 过滤器:参数1:参数2:... }} 


##### 表单Forms
> input、select、textarea
> 双向绑定的关键指令ng-model来维护’数据到视图‘的同步及’视图到数据‘的同步实现了双向绑定

        <div ng-show="form.uEmail.$dirty && form.uEmail.$invalid">Invalid:
            <span ng-show="form.uEmail.$error.required">Tell us your email.</span>
            <span ng-show="form.uEmail.$error.email">This is not a valid email.</span>
        </div>


#### 指令 directives
> 附加在HTML元素上的自定义标记，来附加某些操作DOM、改变DOM元素。
* ngModel ngBind ngView
* 自定义指令：属性 <span ng-attr-cx></span>
* 创建指令（注册到module中）：

        module.directive('myDirectives', () => ({
        restrict:'E',  // restrict定义使用指定的方式，默认使用属性的方式。’A’仅匹配属性名；‘E’仅匹配元素名；‘AE’即匹配属性名又匹配元素名
        templateUrl:'.html'
        })) 返回一个对象
        <span my-directives></span>


##### 动画Animations
> ng提供了一些动画钩子，如ngRepeat,ngSwitch,ngView


##### 特性：
> 容错性 ： 在undefined或null上调用a.b.c()时，会返回undefined，而不是报错！！
