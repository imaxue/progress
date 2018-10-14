#### 分享预期
- 此分享的目标重点是思路，即应用angular框架开发都需要做哪些事的一个思路；
- 部分知识点只是提供了一种解决方法，不一定是最优解，建议批判吸收；

#### 目录
- 1、应用angular-cli脚手架初始化项目(搭建完后过下概念)
- 2、配置反向代理实现前后端分离下的接口联调
- 3、环境搭建进阶
  - 3.1、项目中引入UI库ng-ant.design辅助开发的具体配置
  - 3.2、angular4项目使用scss编写样式的具体配置
  - 3.3、项目中引入并使用angular内置插件的具体配置
  - 3.4、使用base64.js、sha1.js等第三方的非node依赖包进行辅助开发
  - 3.5、在原生js内置对象Date和String上挂载了些自定义方法辅助开发，如日期字符串转日期对象方法；
- 4、路由模块router的配置及使用；
- 5、应用HttpClient模块进行HTTP 请求；
- 6、组件间通信
- 7、项目中typescript的使用
- 8、性能优化
- 代码链接：https://github.com/zengkaiwang/Angular4

#### 1、应用angular-cli脚手架初始化项目
- 1.1详见 angular-cli使用教程.md
- 1.2详见 angular-cli.json常见配置.md
- 1.3初始化项目目录简介：https://www.angular.cn/guide/quickstart
- 1.4 详见 angular4理论概念.md
- 注意：1.3官网可查简单介绍即可；

#### 2、配置反向代理实现前后端分离下的接口联调；
- 2.1 详见 angular4代理配置.md

#### 3、环境搭建进阶
##### 3.1、项目中引入UI库ng-ant.design辅助开发的具体配置；
- 详见 UI库ng-zorro-antd的配置及使用.md

##### 3.2、angular4项目使用scss编写样式的具体配置；
- 详见 angular4项目如何使用scss.md

##### 3.3、项目中引入并使用angular内置插件的具体配置；
- 示例 angular2-draggable实现拖拽效果；
- npm安装，在模块module中配置引入即可；
- 在页面中给标签添加ngDraggable属性即可；
- 注意版本需要跟angular版本吻合，故此次执行：npm install angular2-draggable@1.x --save


##### 3.4、使用base64.js、sha1.js等第三方的非node依赖包进行辅助开发；
- 适用场景：实际需求的解决方案在angular生态中找不到，第三方的node包也找不到，只找到了原生js的插件，则其具体的配置；
- sha1.js是第三方的非node依赖包；
- 手动下载后直接放在项目中如widget目录；
- 在页面中通过import引入通过declare声明后直接使用即可
    ```
    import '../../../../widget/script/base64.js';
    declare var Base64: any;
    
    let base64 = new Base64();
    let password = base64.encode("123456"); //对密码加密,注意传值不能是数字
    ```

##### 3.5、在原生js内置对象Date和String上挂载了些自定义方法辅助开发，如日期字符串转日期对象方法；
- 适用场景: 自封装的通用小工具在项目中的具体配置；
- 原理是在Date对象的原型上定义函数，并最终封装到date.js和string.js；
- 在根组件app.component.ts中引入即可完成挂载；
    ```
    import './widget/script/date';
    import './widget/script/string';
    import { session } from './widget/script/sessionStorage'
    
    //测试Date对象上拓展的方法
  	let newStr =  this.str.padLeft('w', 9)
  	// console.log('newStr', newStr);

    //测试第三方js文件引入
    let base64 = new Base64();
    let password = base64.encode('123456'); //对密码加密
    // console.log('password', password)

    //测试应用ts开发的公共模块
    session.set('keyaaa', "value");
    ```

#### 4、路由模块router的配置及使用
- 4.1详见 router快速入门.md

#### 5、应用HttpClient模块进行HTTP请求
- 5.1 详见 httpclient的使用.md

#### 6、组件间通信
- 6.1详见 组件间通讯.md

#### 7、项目中typescript的使用

#### 8、性能相关
- 8.1 模块延时加载路由loadChildren的使用；