

## 搭建一个迷你React。 


[中文官网](https://doc.react-china.org/)

mini特点概述：

  1. JSX不涉及。使用原生 JavaScript。 

  2. 为了方便，某些时候会用到jQuery。 （trigger）
  <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>

  3. 以实现效果为首要前提，代码以及性能优化不考虑。

  4. 不会涉及到的： 内存的线程池管理，批量更新机制，事件的优化，服务器端渲染， immutable data 等等. 路由。


### 项目构建

  开始构建新的React单页应用程序的最佳方式。它设置了您的开发环境，以便您可以使用最新的JavaScript功能，提供良好的开发人员体验，并优化您的应用程序以进行生产。你需要在你的机器上有`Node> = 6`版本。

  步骤：
  1.	npm install -g create-react-app
  2.	create-react-app mini-react
  3.	进入目录 -> cd mini-react
  4.	npm start 运行项目

### 首页渲染

#### 文本过程

  1. ReactDOM.render 入口。调用渲染

  2. 不论是文本，还是原生DOM节点，自定义React组件。 都经过工厂判断，得到对应的实例。

  3. mountComponent 决定了不同的 element运行不同的逻辑。



#### 虚拟DOM

引入基本element  React.createElement 来创建一个虚拟DOM元素。

1. 浏览器自带的  JSX以小写开头, div p input form ..

  问题： 以div为例子， input,img 不需要tagClose。 
  react事件处理是非常复杂的，实现了一套标准的 W3C事件，这偷懒使用的jquery的事件代理。 

2. 自定义元素， <App/>。。

 =========> 自定义组件


   createReactClass: 

   使用了create-react-class 替代es6中class的概念

   参考文本 https://blog.csdn.net/younghaiqing/article/details/79562980


 =======  总结：

   1、 渲染文本。

   2、 渲染浏览器DOM元素。

   3、 渲染自定义React组件。

   事件监听，虚拟DOM渲染（工厂），基本组件生命周期也实现了。