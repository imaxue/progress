#### 一、引言
- vue项目中不一定适用vue-router
- Vue Router让构建单页面应用变得易如反掌，那多页面的vue项目能用吗？

#### 二、vue项目中使用路由的几种方式：
- **方式一：使用官方支持的vue-router库**
    - https://router.vuejs.org/zh/
- **方式二：自制简单路由**
    - 原理是使用 HTML5 History API window.location实现的
    - 实例应用：https://github.com/chrisvfritz/vue-2.0-simple-routing-example
- **方式三：整合第三方路由**
    - 如果有非常喜欢的第三方路由，如 Page.js 或者 Director，整合很简单。这有个用了 Page.js 的复杂示例。

#### 三、vue-router的安装
- **1、直接下载 / CDN**
  - 直接引入这个链接：https://unpkg.com/vue-router/dist/vue-router.js
  - 在 Vue 后面加载 vue-router，它会自动安装的
```
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
```
- **2、NPM**
    - npm install vue-router
- **3、构建开发版**
    - 如果你想使用最新的开发版，就得从 GitHub 上直接 clone，然后自己 build 一个 vue-router。
    ```
    git clone https://github.com/vuejs/vue-router.git node_modules/vue-router
    cd node_modules/vue-router
    npm install
    npm run build
    ```
#### 四、vue-router基础
##### 1、起步详见vue-router.md文档
##### 2、动态路由匹配
- 应用场景：我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。
-  动态路径参数 以冒号开头
    ```
      routes: [
        { path: '/user/:id', component: User }
      ]
    ```
##### 3、编程式的导航
- 声明式：<router-link :to="...">
- 编程式：router.push(...)
- 该方法的参数可以是一个字符串路径，或者一个描述地址的对象：
    ```
    // 字符串
    router.push('home')
    
    // 对象
    router.push({ path: 'home' })
    
    // 命名的路由
    router.push({ name: 'user', params: { userId: 123 }})
    
    // 带查询参数，变成 /register?plan=private
    router.push({ path: 'register', query: { plan: 'private' }})
    ```
##### 4、HTML5 History 模式
- vue路由中为啥有个#
  - vue路由中有个#号，是因为vue-router默认 hash 模式的缘故
- vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
- 如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面
    ```
    const router = new VueRouter({
      mode: 'history',
      routes: [...]
    })
    ```
- 当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id，也好看！
- 不过这种模式需要后台配置支持一下：
    - 你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面
    - 因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

##### 5、待更新...

#### 五、vue-router进阶