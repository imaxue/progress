## Vue服务端渲染框架

** 我们都知道web端的开发无非就是三种渲染模式 **

* 服务端渲染
* 客户端渲染
* 服务端渲染 + 客户端渲染

相对于性能而言服务端渲染更好，服务端生成html模版渲染在真实的客户端dom上，只不过对于处理一些组件化、或者运行客户端js代码不太容易实现，客户端渲染是现在webview项目比较多的开发方式，

性能不是很好，很多逻辑都在客户端执行，尤其首屏的加载速度很慢，需要各种优化处理，第三种方式，面对的主要问题是服务端渲染的一次，客户端状态的更改亦会渲染一次，造成dom节点的重新渲染

这三种方式的选择要依据真实的需求场景选择，不过有了ssr服务端渲染的这些框架，一切似乎简单了许多。


一、前言

1、网址：[Nuxt](https://zh.nuxtjs.org/guide/installation)

2、与React再次呼应，vue的服务端框架是Nuxt.js

3、关于Nuxt.js

2016 年 10 月 25 日，zeit.co 背后的团队对外发布了 Next.js，一个 React 的服务端渲染应用框架。几小时后，与 Next.js 异曲同工，一个基于 Vue.js 的服务端渲染应用框架应运而生，我们称之为：Nuxt.js。

Nuxt.js 是一个基于 Vue.js 的通用应用框架。

通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。

我们的目标是创建一个灵活的应用框架，你可以基于它初始化新项目的基础结构代码，或者在已有 Node.js 项目中使用 Nuxt.js

Nuxt.js 预设了利用Vue.js开发服务端渲染的应用所需要的各种配置。

除此之外，我们还提供了一种命令叫：nuxt generate，为基于 Vue.js 的应用提供生成对应的静态站点的功能。

我们相信这个命令所提供的功能，是向开发集成各种微服务（microservices）的 Web 应用迈开的新一步。

作为框架，Nuxt.js 为 客户端/服务端 这种典型的应用架构模式提供了许多有用的特性，例如异步数据加载、中间件支持、布局支持等。


