# Learn Next.js

[TOC]

# 一、入门

> [Next.js](https://github.com/zeit/next.js)    （其实你直接看官网就好了，还有例子参考学习）

创建一个单页Javascript应用程序是一件非常有挑战的事情, 幸运的是, 开源世界给我们提供了一些好用的工具来简化, 加速单页应用的开发.

[Create React App](https://github.com/facebookincubator/create-react-app) 就是这样一种工具.

即使是这样, 创建单页应用有非常高的学习曲线. 仍然需要我们学习客户端路由, 页面布局, 等技术. 如果你还想要运行服务器端渲染(SSR: Server Side Rendering), 事情就变得更加困难了.

> 因此, 我们需要一个简单并且可之定义的方案

想一下我们如何使用PHP创建Web应用程序. 首先创建一些文件, 编写PHP代码, 然后部署. 不用担心路由的问题, Web应用程序只是在服务器端运行, 并且输出HTML而已.

![Next.js](https://cloud.githubusercontent.com/assets/50838/24116055/7076ba9c-0dcb-11e7-93d0-ba8f9ac8f6e4.png)

但这里我们说的不是用PHP来创建Web应用程序, 我们使用Javascript和React, 使用Next.js框架给我们提供能力:

- 服务器端渲染(默认)
- 自动代码切分, 加速页面加载
- 简单的客户端路由(基于页面)
- 基于Webpack的开发环境, 支持热模块替换(HMR: Hot Module Replacement)
- 可以使用Express 或其他Node.js服务器实现
- 使用Babel和Webpack配置定制

## 1、设置

Next.js 可以在Windows, Mac和Linux运行. 只需要在系统中安装Node.js即可开始构建Next.js应用程序.

除了需要一个文本编辑器编写代码, 一个终端调用命令之外, 没什么别的是必须的.

> 如果在Windows上运行, 建议使用 PowerShell. Next.js可以工作在任何Shell和终端下. 但是本指南中, 我们使用UNIX相关的命令.
> 推荐在 Windows 下使用 PowerShell, 让工作方便一些.

运行下面的命令, 创建一个示例的项目:

```shell
mkdir hello-next
cd hello-next
npm init -y
npm install --save react react-dom next
mkdir pages
```

然后打开`package.json`, 添加下面的NPM脚本命令:

```json
{
  "scripts": {
    "dev": "next"
  }
}
```

现在, 一切就准备好了, 你可以运行下面的命令来启动开发服务器了.

```shell
npm run dev
```

在浏览其中打开: [http://localhost:3000](http://localhost:3000).

## 2、404 页面

打开 [http://localhost:3000](http://localhost:3000), 我们看到的是一个 404 页面. 这个时候 Next.js 没有任何功能. 默认就是一个 404 页面.

![404 Page](https://cloud.githubusercontent.com/assets/50838/24114002/ac4786f2-0dc4-11e7-8d84-b6f33c8f9aae.png)

## 3、创建第一个页面

现在我们来创建第一个页面. 在 `pages` 目录下创建一个名称为 `index.js` 的文件, 内容如下:

```jsx
const Index = () => (
  <div>
    <p>Hell Next.js</p>
  </div>
)
export default Index
```

现在, 再次访问 [http://localhost:3000](http://localhost:3000), 在页面上你会看到 "Hello Next.js". 这里, 我们只是从 `pages/index.js` 模块导出了一个简单的 React 组件. 同理, 可以编写你自己的模块并且导出它.

> 确保你的 React 组件为默认导出
> 译注: (`default`关键字)

现在, 我们在Index页故意引入一个语法错误(删除尾部的`</p>`HTML标签), 如下:

```jsx
const Index = () => (
  <div>
    <p>Hello Next.js
  </div>
)

export default Index
```

页面将会显示一个语法错误 `There's an error showing the syntax error`.

## 4、错误处理

默认情况, Next.js 会在浏览器中直接显示这些错误信息, 这方便你识别错误并且快速的搞定它.

你但你解决了这些错误, 页面会执行一个无刷新的更新. 这得益于Webpack提供的热模块替换功能, 在Next.js它是默认支持的.

## 5、你太棒了

看起来你已经构建了第一个Next.js应用程序. 有什么想法? 如果你喜欢, 可以进一步深入下去.





# 二、页面之间的导航

现在我们知道了如何创建一个Next.js应用程序并且运行它. 我们的示例应用程序只有一个简单的页面, 但是如果你想, 可以添加更多的页面. 例如, 可以创建一个 "About" 页面, 并添加内容到 `pages/about.js`.

```jsx
export default () => (
  <div>
    <p>This is the about page</p>
  </div>
)
```

然后, 我们可以打开 [http://localhost:3000/about](http://localhost:3000/about) 来访问这个页面. 然后我们需要链接这些页面, 使用HTML的 "a" 标签, 但是它并不会执行客户端导航, 它是执行的服务器端导航, 这并不是我们想要的.

为了支持客户端导航, 我们需要使用Next.js 的Link API, 它是通过 `next/link` 导出的. 下面我们来看看如何使用它.

## 1、设置

为了按照本课程学习, 需要有一个示例Next.js应用程序, 为此, 你可以下载下面的这个应用程序作为学习案例:

```shell
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout getting-started
```

可以用下面的命令来运行:

```shell
npm install
npm run dev
```

现在, 访问 [http://localhost:3000/](http://localhost:3000/).

## 2、使用 Link

现在我们将会使用 `next/link` 来连接我们的页面. 添加如下代码到 `page/index.js` 模块文件

```jsx
// This is the Link API
import Link from 'next/link'

const Index = () => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
)

export default Index
```

在这个例子中, 我们导入了 `next/link` 作为 Link 模块, 并且向下面这样使用它:

```html
<Link href="/about">
  <a>About Page</a>
</Link>
```

现在, 再次访问 [http://localhost:3000/](http://localhost:3000/), 点击 "About Page" 连接, 你将被带到 "About Page" 页面.

> 这是客户端导航, 行为发生在客户端, 没有请求服务器. 你可以打开浏览器开发工具的网络标签, 看看有没有网络请求来验证.

下面是一个简单的任务:

- 访问 [http://localhost:3000/](http://localhost:3000/)
- 点击 "About Page"
- 点击浏览器的后退按钮

描述一下, 点击后退按钮后你看到了什么? 是的, 客户端导航把你带回了Index页面.

## 3、客户端历史支持

当你点击后退按钮的时候, Next.js把你带回了Index页面, 这个过程完全是客户端实现的; `next/link` 为你处理了所有 `location.history`相关的事情. 你甚至不需要编写任意一行客户端路由代码.

你需要做的只是简单的连接页面而已, 就这样!

## 4、给连接添加样式

大多数情况, 我们可能想要给连接添加一点样式. 想下面这样:

```html
<Link href="/about">
  <a style={{ fontSize: 20 }}>About Page</a>
</Link>
```

添加了样式后, 你会看到, 样式被正确的设置了.

但是, 如果你想下面一样呢, 会发生什么?

```html
<Link href="/about" style={{ fontSize: 20 }}>
  <a>About Page</a>
</Link>
```

对的, 没任何效果!

## 5、连接仅仅是一个高阶组件(HOC:Higher Order Component)

实际上, 样式属性在 `next/link` 上是没有效果的. 因为 `next/link` 仅仅是一个能够接收 `href` 属性, 以及其他属性的高阶主键. 如果你要给它设置样式, 需要在底层的组件进行设置.

## 6、使用按钮进行连接

现在, 我们需要一个按钮而不是一个连接, 现在我们需要修改我们的导航代码, 像这样:

```jsx
<Link href="/about">
  <button>Go to About Page</button>
</Link>
```

## 7、让连接能够任意工作

就像一个按钮一样, 你可以在Link中放置任何你的自定义React组件, 甚至是一个`div`元素.放在Link中的组件的唯一要求是, 它能够接受一个 `onClick` 属性.

## 8、连接虽然简单, 但是强大

这里, 我们只看到了关于 `next/link` 的很基本的例子. 接下来的课程我们会更加深入的了解如何使用Link. 如果你想要了解Next.js的路由功能, 参考 [Next.js 路由文档](https://github.com/zeit/next.js#routing) 文档.



# 三、使用共享组件

我们知道 Next.js 是和页面相关的. 通过导出一个 React组件创建一个页面, 然后把它放到 `pages` 目录中, 基于这个文件名, Next.js存在一个固定的URL.

因为导出的页面是Javascript模块, 我们当然也能够导入其他组件进来.

在这节课中, 我们会创建一个共享的页头组件, 并在多个页面之间共用. 最后我们事先一个布局组件来看看, 它是如何定义多个页面的外观的.

## 1、设置

为了演示这节课说讲的知识点, 我们需要一个可运行的示例应用程序, 通过下面的命令来获取一个现成的应用程序:

```shell
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout navigate-between-pages
```

可以通过下面的命令行来运行:

```shell
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000).

## 2、创建页头组件

现在, 让我们来为我们的应用程序创建一个页头组件. 添加下面的代码到 `components/Header.js` 模块文件中.

```jsx
import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>About</a>
        </Link>
    </div>
)

export default Header
```

该组件包含两个链接到其他页面的连接. 我们同时给两个链接设置了一个样式对象, 设置了它的字体为15.

## 3、使用页头组件

现在, 让我们在页面中导入这个刚创建的页头组件. 现在对于 `pages/index.js`, 它的内容看起来像下面这样:

```jsx
import Header from '../components/Header'

export default () => (
  <div>
    <Header />
    <p>Hello Next.js</p>
  </div>
)
```

你可以对 `pages/about.js` 页面做同样的事情. 现在, 如果你访问 [http://localhost:3000/](http://localhost:3000), 你会看到新的页头, 并且能够在页面之间进行导航.

![Header component](https://cloud.githubusercontent.com/assets/50838/24333679/fa856f00-1279-11e7-931d-a5707e51a801.gif)

现在, 我们对这个应用程序进行一些小修改.

- 停止应用程序.
- 重命名 `components` 目录为 `comps`.
- 从 `../comps/Header` 导入, 而非 `../components/Header`
- 再次启动应用程序

它还能工作么?

## 4、组件目录

是的, 和之前一样, 工作正常! 我们不需要把组件放在一个特殊的目录下, 组件目录可以是任意名称, 唯一特殊的目录就是 `pages` 目录, 你甚至可以在 `pages` 目录中创建组件目录. 这里, 我们没有直接在 `pages` 目录下创建组件目录是因为, 我们不需要直接连接到 Header 组件.

> 译注: `pages`目录就像Web服务器的根目录一样, 通过自然的目录/URL路径, 你可以访问到 `pages` 目录下的组件. 就像Linux文件系统一样, URL中的PATH和文件系统的路径是一一对应的.

## 5、布局组件

在我们的应用程序中, 我们在多个页面之间共享一个公共的样式. 为此我们可以创建一个公共的布局组件, 并且在多个页面使用它. 下面是一个例子, 添加下面的代码到 `components/MyLayout.js` 模块文件:

```jsx
import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)

export default Layout
```

然后, 我们可以像下面一样, 在我们的应用程序页面中使用这个布局组件:

```jsx
// pages/index.js

import Layout from '../components/MyLayout.js'

export default () => (
    <Layout>
       <p>Hello Next.js</p>
    </Layout>
)
```

```jsx
// pages/about.js

import Layout from '../components/MyLayout.js'

export default () => (
    <Layout>
       <p>This is the about page</p>
    </Layout>
)
```

访问 [http://localhost:3000/](http://localhost:3000), 看看有什么效果.

现在我们从布局组件中删除 `{props.chidren}`, 看看会发生什么?

## 6、渲染子组件

如果你删除了 `{props.chidren}`, 布局组件Layout不再渲染它所包含的内容:

```jsx
export default () => (
    <Layout>
       <p>This is the about page</p>
    </Layout>
)
```

这只是创建布局组件的一种方式. 还有创建布局组件的其他方式:

```jsx
import withLayout from '../lib/layout'

const Page = () => (
  <p>This is the about page</p>
)

export default withLayout(Page)
```

```jsx
const Page = () => (
  <p>This is the about page</p>
)

export default () => (<Layout page={Page}/>)
```

```jsx
const content = (<p>This is the about page</p>)

export default () => (<Layout content={content}/>)
```

## 7、使用组件

上面, 我们提到了, 两种创建共享组件的方式:

1.作为公共的页头组件
2.作为布局组件

你可以把组件用于: 设置公共样式, 页面布局, 以及任何其他你想要的用途. 另外, 你也可以从NPM模块中导入组件并且使用他们.



# 四、创建动态页面

现在,我们知道了如何使用多个页面创建一个基本的Next.js应用程序. 为了创建页面, 我们需要在磁盘上创建实际的文件.

但是, 在真实的应用场景下,我们通常需要通过数据创建动态的页面, 用动态的方式显示页面内容. 在Next.js中有多种方式来实现这个目的.

首先, 我们使用查询串来创建一个动态的页面. 我们创建一个简单的博客应用程序. 在Index页面显示一个博客列表.

![Display blog list](https://cloud.githubusercontent.com/assets/50838/24542722/600b9ce8-161a-11e7-9f1d-7ed08ff394fd.png)

当你点击博客标题时, 可以看到博客的具体内容.

![Display blog content](https://cloud.githubusercontent.com/assets/50838/24542721/5fdd9c26-161a-11e7-9b10-296d4cb6912d.png)

现在, 让我们开始创建这个博客程序.

## 1、设置

为了按照本课程学习, 需要有一个示例Next.js应用程序, 为此, 你可以下载下面的这个应用程序作为学习案例:

```shell
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout using-shared-components
```

可以用下面的命令来运行:

```shell
npm install
npm run dev
```

现在, 访问 [http://localhost:3000/](http://localhost:3000/).

## 2、添加博客列表

首先, 让我们在首页添加博客标题列表, 添加下面的代码到 `pages/index.js` 模块文件中.

```jsx
import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const PostLink = (props) => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      <PostLink title="Hello Next.js"/>
      <PostLink title="Learn Next.js is awesome"/>
      <PostLink title="Deploy apps with Zeit"/>
    </ul>
  </Layout>
)
```

然后, 方位 [http://localhost:3000](http://localhost:3000), 你会看到下面的内容:

![Blog list](https://cloud.githubusercontent.com/assets/50838/24542722/600b9ce8-161a-11e7-9f1d-7ed08ff394fd.png)

## 3、通过查询串传递数据

我们通过查询串参数传递数据, 在这个例子中为"title"查询串阐述, 表示博客的标题, 我们下面为博客的标题实现一个自定义的`PostLink`组件.

```jsx
const PostLink = (props) => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)
```

## 4、创建博客页面

创建博客页面, 显示博客内容, 为此我们需要从查询串中获取标题. 下面创建一个 `pages/post.js` 文件, 并添加如下内容:

```jsx
import Layout from '../components/MyLayout.js'

export default (props) => (
    <Layout>
       <h1>{props.url.query.title}</h1>
       <p>This is the blog post content.</p>
    </Layout>
)
```

现在, 页面看起来像这样:

![Blog page](https://cloud.githubusercontent.com/assets/50838/24542721/5fdd9c26-161a-11e7-9b10-296d4cb6912d.png)

- 每个页面获得一个"URL"属性, 其中包含当前URL相关的详细信息
- 这里我们使用"query"对象, 它包含查询串参数
- 然后, 我们从 `props.url.query.title` 获取博客的标题

现在, 我们做一点细微的修改, 替换 `pages/post.js`的内容为如下:

```jsx
import Layout from '../components/MyLayout.js'

const Content = (props) => (
  <div>
    <h1>{props.url.query.title}</h1>
    <p>This is the blog post content.</p>
  </div>
)

export default () => (
    <Layout>
       <Content />
    </Layout>
)
```

然后访问 [http://localhost:3000/post?title=Hello%20Next.js](http://localhost:3000/post?title=Hello%20Next.js) 看是什么效果?

## 5、特殊属性"url"

你看到了, 代码会抛出一个如下所示的错误页面:

![Error page](https://cloud.githubusercontent.com/assets/50838/24542720/5fd985a0-161a-11e7-8971-bc677906b1bf.png)

这是因为, `url` 属性仅暴露给了页面的根主键. 并未暴露给页面中的其他组件. 但如果需要, 可以像下面这样把`url`属性传递给其他组件.

```jsx
export default (props) => (
    <Layout>
       <Content url={props.url} />
    </Layout>
)
```

## 6、最后

现在我们已经学习到了如何使用查询串创建动态页面. 但这仅仅只是开始. 一个动态页面需要更多的信息来渲染, 我们不太可能通过查询串传递所有的信息. 我们想要有一个干净的像这样的URL: [http://localhost:3000/blog/hello-nextjs](http://localhost:3000/blog/hello-nextjs).

接下来, 我们将会学到关于这方面的所有信息. 这是所有其他事情的基础.



# 五、使用路由掩码创建干净的URL

在前面的课程中, 我们学到了如何使用查询串创建动态页面. 一次为基础, 我们一篇博客的链接会想这样: [http://localhost:3000/post?title=Hello%20Next.js](http://localhost:3000/post?title=Hello%20Next.js)

但是这个URL看起来不怎么好看, 如果我们想要下面这样的链接, 我们应该怎么办呢?

[http://localhost:3000/p/hello-nextjs](http://localhost:3000/p/hello-nextjs)

![Clean url](https://cloud.githubusercontent.com/assets/50838/24586820/b65be244-17c6-11e7-87fd-d6880152261e.png)

看起来是不是好很多了, 是吧?

## 1、设置

为了按照本课程学习, 需要有一个示例Next.js应用程序, 为此, 你可以下载下面的这个应用程序作为学习案例:

```shell
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout create-dynamic-pages
```

可以用下面的命令来运行:

```shell
npm install
npm run dev
```

现在, 访问 [http://localhost:3000/](http://localhost:3000/).

## 2、路由掩码

现在,我们将使用Next.js特有的叫做路由掩码的功能. 基本上, 它在浏览器地址栏上显示一个不同于实际URL的地址.

现在, 我们来给我们的博客地址添加一个路由掩码.

`pages/index.js` 的内容修改为如下:

```jsx
import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      <PostLink id="hello-nextjs" title="Hello Next.js"/>
      <PostLink id="learn-nextjs" title="Learn Next.js is awesome"/>
      <PostLink id="deploy-nextjs" title="Deploy apps with Zeit"/>
    </ul>
  </Layout>
)
```

看一下下面的这个代码块:

```jsx
const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)
```

在 `<Link>` 元素中, 我们使用另外一个叫做 `as` 的属性. 这是我们需要显示在浏览器地址栏中的URL. 应用程序看到的实际URL是实际上是在 `href` 属性中.

现在点击博客标题链接, 进入博客内容页.

## 3、历史感知

正如你所看到的, 路由掩码, 也能够很好的和浏览器历史一起工作. 所有需要做的事情只是给链接添加了一个`as`属性.

## 4、重加载

现在, 转到主页: [http://localhost:3000/](http://localhost:3000/), 然后点击第一个博客标题, 你会被导航到博客内容页面.

![Navigate to blog content page](https://cloud.githubusercontent.com/assets/50838/24586820/b65be244-17c6-11e7-87fd-d6880152261e.png)

点击刷新按钮重新加载页面, 会发生什么?

## 5、404

页面刷新操作放回了一个 404 错误页面. 这是因为, 我们再服务器上没有一个这样的可加载页面. 服务器会试图去加载 `p/hello-next.js` 文件, 但是实际上这个文件是不存在的, 我们现在只有两个文件 `index.js` 和 `post.js`.

因此, 我们需要解决这个问题.

在下一节课中, 我们使用Next.js的[自定义服务器API](https://github.com/zeit/next.js#custom-server-and-routing)来解决这个问题.



# 六、干净URL的服务器支持

在前面的课程中, 我们学习了如何为我们的应用程序创建干净的URL. 基本上, 我们让URL像这样:

[http://localhost:3000/p/my-blog-post](http://localhost:3000/p/my-blog-post)

但是, 它现在只能用于客户端导航. 当我们重新加载页面的时候, 它给了我们一个404错误页面.

这是因为, 在`pages`目录中, 并不存在一个实际的`p/my-blog-post`模块文件.

![404 Page](https://cloud.githubusercontent.com/assets/50838/24919433/475417bc-1f01-11e7-9fae-a17030d3d051.png)

我们使用Next.js的[自定义服务器API](https://github.com/zeit/next.js#custom-server-and-routing)来解决这个问题, 让我们看看如何使用它?

## 1、设置

首先, 我们需下载示例代码:

```shell
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout clean-urls
```

然后通过下面的命令运行我们的示例程序:

```shell
npm install
npm run dev
```

最后通过 [http://localhost:3000](http://localhost:3000) 访问Web应用程序.

## 2、创建自定义服务器

我们使用 [Express](https://expressjs.com/) 来创建一个自定义服务器. 它非常简单:

首先, 添加 Express 依赖到应用程序:

```shell
npm install --save express
```

然后创建一个 `server.js` 文件, 并添加下面的内容:

```js
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
```

现在, 更新NPM的开发脚本为:

```json
{
  "scripts": {
    "dev": "node server.js"
  }
}
```

然后, 运行`npm run dev`, 你会看到什么?

## 3、创建自定义路由

现在你所看到的, Next.js 可以和 Express 一起协同工作. 现在我们要添加一个自定义的路由来匹配博客的URL.

用新的路由, `server.js` 看起来就是这个样子:

```js
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
```

注意一下代码块:

```js
server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id }
    app.render(req, res, actualPage, queryParams)
})
```

我们简单的映射了一个自定义路由到我们现有的博客页面 `post`. 同时我们还映射了查询串.

现在重启应用程序, 访问下面的地址:

[http://localhost:3000/p/hello-nextjs](http://localhost:3000/p/hello-nextjs)

现在, 不会再显示 404 页面了, 因为, 通过自定义路由, 我们把通过浏览器访问的地址映射到了实际的页面, 但是现在还有一个小问题, 你能看出来么?

## 4、URL信息

我们的 `/post` 页面通过查询串参数 `title` 来接收标题. 在客户端路由中, 我们可以通过 Link 的 `as` 属性设置正确的值.

```jsx
<Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
  <a>{props.title}</a>
</Link>
```

但是在服务器路由中, 我们得不到这个title, 因为我们只有一个URL中博客的ID, 因此我们使用这个ID作为服务器端查询串参数.

你可以通过如下的路由定义看到:

```js
server.get('/p/:id', (req, res) => {
  const actualPage = '/post'
  const queryParams = { title: req.params.id }
  app.render(req, res, actualPage, queryParams)
})
```

这就是问题. 但是在实际应用中, 这实际上不是一个问题, 因为, 通常我们在服务器端和客户端都通过ID从数据服务器获取数据. 因此实际上, 我们只需要一个ID.

## 5、最后

现在我们通过 Next.js 自定义服务器API 实现了一个简单的应用程序. 以此为基础, 我们添加了干净URL的服务器端支持. 就像这样, 你可以创建更多你想要的路由.

对于Web服务器, 不限于使用 [Express](https://expressjs.com/) 作为服务器, 你可以使用任何 Node.js Web框架. 对于 自定义服务器API的想信息文档, 参考 [定义服务器API文档](https://github.com/zeit/next.js#custom-server-and-routing)

# 七、为页面获取数据

得益于 Next.js 路由API的优点, 我们知道了如何创建一个具有简介URL的 Next.js 应用程序.

实际上, 我们通常需要从远程数据源获取数据. Next.js 提供了一个标准API用于为页面获取数据. 我们使用一个 `async` 函数 `getInitialProps` 来达到获取数据的目的.

以此为基础, 我们能够给以页面从远程数据源获取数据, 然后把数据穿给我们的一个页面组件的属性. 我们可以编写`getInitialProps`函数让他能够同时在客户端和服务器端运行.

在这节课中, 使用 `getInitialProps`, 我们将使用 [TVmaze API](http://www.tvmaze.com/api)构造一个显示Batman TV Shows 相关信息的应用程序.

![Batman TV Shows App](https://cloud.githubusercontent.com/assets/50838/26300776/bbf275ee-3efc-11e7-8304-df96c7c7cad5.png)

现在开始!

## 1、设置

下载需要的示例程序:

```shell
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout clean-urls-ssr
```

用下面的命令运行:

```shell
npm install
npm run dv
```

然后, 访问 [http://localhost:3000](http://localhost:3000)

## 2、获取 Batman Shows

在我们的演示程序中, 显示了一个博客列表, 现在我们改造演示程序以要显示一个Batman TV shows列表.

和之前博客列表的硬编码方式不同, 这次我们从远程服务器获取列表数据

> 这里我们使用 [TVMaze API](http://www.tvmaze.com/api) 获取电视节目信息. 它是一个搜索电视节目信息的API.

首先, 我们需要按照 [isomorphic-unfetch](https://github.com/developit/unfetch). 我们使用这个库来获取数据. 它是一个浏览器 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 的简单实现, 并且可以同时工作在客户端和服务器端环境中.

> 译注: 这类能够同时在客户端和服务器运行的应用程序, 我们称之为`同构应用程序`

然后, 用下面的代码, 替换 `pages/index.js` 文件:

```js
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({show}) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('http://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index
```

到现在, 上面的代码一切看来都是很熟悉了, 除了 `Index.getInitialProps`:

```js
Index.getInitialProps = async function() {
  const res = await fetch('http://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}
```

这是一个静态的 `async`, 可以把它添加到应用程序中的任何页面. 使用它, 我们可以获取数据, 并且作为页面组件的属性使用.

如你所见, 现在, 我们要获取 Batman TV 电视节目信息, 并且把获取的节目信息, 作为页面组件的 `shows` 属性进行访问.

![Fetching data as component property](https://cloud.githubusercontent.com/assets/50838/26300128/de007dd6-3efa-11e7-9084-6ba7ff10774b.png)

如你所见, 上面的 `getInitialProps` 函数, 它打印一系列获取到的数据到控制台.

现在, 看一下浏览器的控制台和服务器的控制台输出. 然后重新加载页面.

## 3、仅服务器

本来我们预想的, 客户端和服务器都能输出同样的信息, 但实际上, 在这种情况下, 输出信息只显示在了服务器端的控制台上. 这是因为, 我们的页面是在服务器端进行渲染的. 我们在服务器上已经获取到了电视节目的数据, 没有理由在客户端再获取一次.

## 4、实现信息展示页面

现在我们要实现一个 `/post` 页面来展示电视节目的详细信息.

首先, 打开 `server.js` 文件, 用下面的代码修改路由 `/p/:id`:

```js
server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
})
```

然后, 重启应用程序

> 先前, 我们映射了 `title` 查询参数到页面, 现在我们重命名为 `id`.

现在, 用下面的代码替换 `pages/post.js` 的内容:

```js
import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

const Post =  (props) => (
    <Layout>
       <h1>{props.show.name}</h1>
       <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
       <img src={props.show.image.medium}/>
    </Layout>
)

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`http://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post
```

我们再来看一下 `getInitialProps` 函数:

```js
Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`http://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.Title}`)

  return { show }
}
```

现在这个函数的第一个参数为一个 `context` 对象, 其中包含了我们用于获取信息的查询字段.

在我们这个例子中, 我们从查询串中获取电视节目ID, 然后通过它来从 TVMaze API 获取数据.

在 `getInitialProps`函数中, 我们添加了一个 `console.log` 调试输出来显示电视节目的标题. 下面我们来验证我们的程序是否能够正确运行.

打开服务器和客户端控制台, 访问 [http://localhost:3000](http://localhost:3000), 点击第一个电视节目标题.

输出显示在客户端还是服务器控制台?

## 5、从客户端获取数据

这里, 我们只在客户端的控制台上看到了调试输入. 这是因为我们是通过客户端进行导航的. 因此从客户端获取数据是更好的方式.

如果你直接访问Post页面(例如: http://localhost:3000/p/975), 你将会看到调试输出显示在了服务器端而非客户端.

## 6、最后

现在你学到了 Next.js 最为关键的特性: `通用数据获取`和`服务器端渲染(SRR)`.

我们了解了 `getInitialProps`, 在大多数情况下, 就足够了. 如果你要了解关于数据获取的更加深入的信息, 参考[data fetching](https://github.com/zeit/next.js#fetching-data-and-component-lifecycle) 文档.





# 八、组件样式



## 1、设置

下载需要的示例程序:

```shell
git clone https://github.com/arunoda/learnnextjs-demo.git
cd learnnextjs-demo
git checkout clean-urls-ssr
```

用下面的命令运行:

```shell
npm install
npm run dv
```

然后, 访问 [http://localhost:3000](http://localhost:3000)

## 2、给主页设置样式

现在, 给我们的主页添加一些样式(`pages/index.js`) ,用下面的代码替换 `pages/index.js` 文件.

```jsx
function getPosts () {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js'},
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome'},
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT'},
  ]
}

export default () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      {getPosts().map((post) => (
        <li key={post.id}>
          <Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
    <style jsx>{`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </Layout>
)
```

注意一下 `<style jsx>` 元素. 这是我们编写CSS规则的地方. 设置了样式之后, 我们的博客主页外观看起来是这样的:

![Blog home page styles](https://cloud.githubusercontent.com/assets/50838/25552915/f18f2f12-2c5a-11e7-97aa-4b9d4b9f95a7.png)

在上面的代码中, 没有在 style 标签中直接编写样式, 相反它是卸载模板字符串中的.

现在, 不用模板字符串(`{``}`), 像这样:

```css
<style jsx>
  h1, a {
    font-family: "Arial";
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
    margin: 5px 0;
  }

  a {
    text-decoration: none;
    color: blue;
  }

  a:hover {
    opacity: 0.6;
  }
</style>
```

刷新 [http://localhost:3000](http://localhost:3000), 看看效果.

## 3、样式应该放在模板字符串中

Styled jsx 作为一个Babel插件, 它会解析所有的CSS, 并且在构建过程中处理(在构建过程中处理样式, 消除了运行时处理额外的开销)

在styled jsx 还支持常量值, 在将来, 你还可以在styled jsx中使用动态变量, 这就是为什么CSS需要房子啊模板字符串中.(`{``}`)

## 4、样式和嵌套组件无效

这是你看到的结果

![No effect for nested component](https://cloud.githubusercontent.com/assets/50838/25552972/6becac5c-2c5c-11e7-9fce-61cdc207a10d.png)

如你所见, CSS规则对于嵌套在子组件中的其他元素是无效的. styled jsx 的这个特性, 让你能够在更大规模的应用中更好的, 统一的管理样式.

因此, 如果你要给你子组件设置样式, 应该在子组件上直接设置, 比如:

```jsx
const PostLink = ({ post }) => (
  <li>
    <Link as={`/p/${post.id}`} href={`/post?title=${post.title}`}>
      <a>{post.title}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
)
```

> 获取, 可以使用 [全局选择器](https://github.com/zeit/styled-jsx#global-selectors)





## 九、部署

> 要部署一个Next.js应用程序, 当然我们首先需要一个可部署的, 已经开发完成的应用程序. 以下面这个Next.js开发的小型博客为例, 来说明如何部署一个Next.js应用程序.

```
git clone https://github.com/developerworks/next.js-blog.git
cd next.js-blog
yarn build
yarn start
```

这样我们就就实现了一个Next.js应用程序的部署. 简单吧. 但是, 实际的产品环境可没有这么简单, 要解决很多问题, 比如:

随操作系统的Reboot, 自动启动Next.js应用程序, 我们这里使用PM2来管理我们的Next.js进程, 首先我们使用下面的命令启动这个Next.js应用程序.

```
# 自定义Express服务器
# https://github.com/zeit/next.js/tree/master/examples/custom-server-express
NODE_ENV=production pm2 start ./server.js --interpreter ./node_modules/.bin/babel-node --watch src --name next-blog
# 默认Next.js内置的方式
NODE_ENV=production pm2 start npm --name "next-blog" -- start
```

其次, 运行 `pm2 save` 保存进程启动信息, 最后, 运行`pm2 startup`创建系统启动服务. 以Ubuntu 16.04为例, 它会创建一个名为`pm2-www.service`的SYSTEMD服务.

通过 `systemctl status pm2-www.service` 可以查看PM2管理的Next.js应用程序状态.

```
➜  ~ systemctl status pm2-www.service
● pm2-www.service - PM2 process manager
   Loaded: loaded (/etc/systemd/system/pm2-www.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2017-08-31 15:17:30 CST; 3 days ago
     Docs: https://pm2.keymetrics.io/
  Process: 695 ExecStart=/usr/local/lib/node_modules/pm2/bin/pm2 resurrect (code=exited, status=0/SUCCESS)
 Main PID: 1195 (PM2 v2.6.1: God)
   CGroup: /system.slice/pm2-www.service
           ├─ 1195 PM2 v2.6.1: God Daemon (/home/www/.pm2)
           ├─ 1215 node ./node_modules/.bin/babel-node /usr/local/lib/node_modules/pm2/lib/ProcessContainerFork.js
           ├─ 1221 node ./node_modules/.bin/babel-node /usr/local/lib/node_modules/pm2/lib/ProcessContainerFork.js
           ├─ 1234 node ./node_modules/.bin/babel-node /usr/local/lib/node_modules/pm2/lib/ProcessContainerFork.js
...
...
...
Aug 31 15:17:30 iZwz99do2ak2kdy3324r6bZ systemd[1]: Started PM2 process manager.
```

![image](https://user-images.githubusercontent.com/725190/30004242-2a075cae-90fe-11e7-82c4-bf97c067469c.png)

到这儿, Next.js 应用程序就部署完成了.

## 2、如何指定运行的端口

Next.js 应用程序默认跑在`3000`端口上, 如果我们运行一个Web门户站点, 那么我们需要把端绑定在`80`, 或`443`端口上.

首先配置 `package.json`, 修改 scripts 为:

```
"scripts": {
  "start": "next start -p $PORT"
}
```

然后在项目目录中启动:

```
PORT=8000 yarn start
```

## 3、使用Nginx反向代理

当然, 也可以不直接指定端口, 让Next.js 应用程序在Nginx反向代理后面跑.

```
location / {
  # default port, could be changed if you use next with custom server
  proxy_pass http://localhost:3000;

  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;

  # if you have try_files like this, remove it from our block
  # otherwise next app will not work properly
  # try_files $uri $uri/ =404;
}
```
