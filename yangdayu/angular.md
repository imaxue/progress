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
* currency 将一个数值格式化为货币格式

* date
> {{ today | date:'MMMM' }}

* filter
> {{ ['Ari', 'Lerner', 'Likes', 'To'] | filter: 'e' }}
> <br/>['Lerner', 'Likes']

* json: 将一个json或js对象转换成字符串
> {{ {'name': 'Ari', 'City': 'San Francisco'} | json }}

* limitTo: 根据传入的参数生成一个新的数组或字符串
> {{ San Francisco is very cloudy | limitTo:3 }}
San

* lowercase

* number:将数字格式化成文本，第二个参数可选，用来控制小数点后截取的位数。非数字则为空字符串
> {{ 1234567 | number:2 }}
1,234,567.00

* orderBy: 用表达式对指定的数组进行排序,第二个参数设置为true可以将排序结果进行反转
> {{ [{'name': 'Ari','status': 'awake'},{'name': 'Q','status':'sleeping'},{'name': 'Nate', 'status': 'awake'}] | orderBy: 'name':true}}

[{'name': 'Q',},{'name': 'Nate',},{name: 'Ari'}]

* uppercase

* 自定义过滤器


        angular.module('myApp.filters',[])
        .filter('capitalize', function(){
                if(input){
                        return input[0].toUpperCase() + input.slice(1);
                }
        })

        // use
        {{ 'ginger loves dog treats' | lowercase | capitalize }}



##### 表单Forms
> input、select、textarea
> 双向绑定的关键指令ng-model来维护’数据到视图‘的同步及’视图到数据‘的同步实现了双向绑定

        <div ng-show="form.uEmail.$dirty && form.uEmail.$invalid">Invalid:
            <span ng-show="form.uEmail.$error.required">Tell us your email.</span>
            <span ng-show="form.uEmail.$error.email">This is not a valid email.</span>
        </div>

* 表单验证
        
        <input type='text' required ng-minlength='5' ng-maxlength='20' ng-pattern='[a-zA-Z]'
                type='email' type='number' type='url'>

* 控制变量

        formName.inputFieldName.$pristine 未修改的
        formName.inputFieldName.$dirty 修改的
        formName.inputFieldName.$valid 合法的
        formName.inputFieldName.$invalid 不合法的
        formName.inputFieldName.$error 错误


#### 指令 directives
> 附加在HTML元素上的自定义标记，来附加某些操作DOM、改变DOM元素。
* ngModel ngBind ngView
* 自定义指令：属性 <span ng-attr-cx></span>
* 创建指令（注册到module中）：

        module.directive('myDirectives', () => ({
        restrict:'E',  // restrict定义使用指定的方式，默认使用属性的方式。’A’仅匹配属性名；‘E’仅匹配元素名；‘C'即类名；‘AE’即匹配属性名又匹配元素名
        templateUrl:'.html',
        replace: true, // 用自定义元素取代指令声明，而不是嵌套
        scope:{
                someProperty: '@', // 本地作用域绑定：将DOM中some-property属性的值复制给新的作用域对象的someProperty,
                someProperty: '=', // 双向数据绑定
                onSend:'&', 引用传递方法
        },
        scope:{}, // 如果scope为空对象，隔离作用域，就无法访问外部了，
        scope: true, 会从父级作用域继承并创建一个新的作用域；默认为false
        priority: 0, 优先级
        terminal: true, 停止运行优先级比本指令低的，同级的还会被执行。
        template: 字符串或函数，
        transclude: true, 嵌入
        require: string | array, 注入指令，并当做第四个参数
        compile: fn, 编译函数负责对模版DOM进行转换。
        link: fn 连接函数负责将作用域和DOM进行链接
        link: function(scope, element, attrs){ 这里可以操作DOM }
        // require: 'SomeController',
        link: function(scope, element, attrs, someController){ 这里操作DOM，可以访问required指定的控制器 }
        })) 返回一个对象
        <span my-directives></span>

* 内置指令

        ng-disabled
        ng-readonly
        ng-checked
        ng-selected
        ng-href
        ng-src
        ng-app DOM元素被标记为$rootScope的起始点
        ng-control 创建一个子作用域
        ng-include
        ng-switch
        ng-view
        ng-if
        ng-repeat
        ng-init
        ng-bind
        ng-clock <p ng-clock>{{greeting}}</p> 避免元素闪烁
        ng-model
        ng-show
        ng-hidden
        ng-change
        ng-form
        ng-submit
        ng-click
        ng-select
        ng-class
        ng-attr-(suffix) <svg><circle ng-attr-cx="{{cx}}"></circle></svg>


##### 动画Animations
> ng提供了一些动画钩子，如ngRepeat,ngSwitch,ngView


##### 特性：
> 容错性 ： 在undefined或null上调用a.b.c()时，会返回undefined，而不是报错！！


#### $scope的生命周期

* 创建

> 在创建控制器或指令时，会创建一个新的作用域

* 链接

> 开始运行时，$scope对象和函数都会附加链接到视图中。这些作用域都会注册当ag应用上下文中发生变化时需要运行的函数。<br>被称为$watch函数，ag通过这些函数获知何时启动事件循环。

* 更新

> 每个子作用域都执行自己的脏值检测，每个监控函数都会检查变化，$scope便会触发指定的回调函数

* 销毁

> 当一个$scope在视图中不在需要时，这个作用域将会清理和销毁自己。也可以使用$scope上叫做$destory()的方法来清理这个作用域。


#### 路由
> 通过$routeProvider 声明路由来实现这个功能。

        angular.module('myApp', [])
        .config(['$routeProvider', function($routeProvider) {
                $routeProvider
                .when('/',{
                        templateUrl: 'view/home.html',
                        controller: 'HomeController',
                        resolve: {
                                'data': ['$http', function($http){
                                        function success(response){return response.data},
                                        function error(reason){return false}
                                }]
                        }
                })
                .otherwise({
                        redirectTo: '/'
                })
        }])
