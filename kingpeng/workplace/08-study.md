## React服务端渲染框架

### 一、入门：

[Next.js](https://github.com/zeit/next.js)

  创建一个单页Javascript应用程序是一件非常有挑战的事情, 幸运的是, 开源世界给我们提供了一些好用的工具来简化, 加速单页应用的开发.
[Creact React App](https://github.com/facebook/create-react-app)就是这样一种工具.
  即使是这样, 创建单页应用有非常高的学习曲线. 仍然需要我们学习客户端路由, 页面布局, 等技术. 如果你还想要运行服务器端渲染(SSR: Server Side Rendering), 事情就变得更加困难了.
想一下我们如何使用PHP创建Web应用程序. 首先创建一些文件, 编写PHP代码, 然后部署. 不用担心路由的问题, Web应用程序只是在服务器端运行, 并且输出HTML而已.

但这里我们说的不是用PHP来创建Web应用程序, 我们使用Javascript和React, 使用Next.js框架给我们提供能力:

* 服务器端渲染(默认)
* 自动代码切分, 加速页面加载
* 简单的客户端路由(基于页面)
* 基于Webpack的开发环境, 支持热模块替换(HMR: Hot Module Replacement)
* 可以使用Express 或其他Node.js服务器实现
* 使用Babel和Webpack配置定制

### 二、开发

#### 1、Next.js 可以在Windows, Mac和Linux运行. 只需要在系统中安装Node.js即可开始构建Next.js应用程序.

除了需要一个文本编辑器编写代码, 一个终端调用命令之外, 没什么别的是必须的.

运行下面的命令, 创建一个示例项目:

```
mkdir hello-next
cd hello-next
npm init -y
npm install --save react react-dom next
mkdir pages

```

然后打开package.json, 添加下面的NPM脚本命令:

```
{
  "scripts": {
    "dev": "next"
  }
}

```

现在, 一切就准备好了, 你可以运行下面的命令来启动开发服务器了.

```
npm run dev

```

在浏览其中打开: http://localhost:3000.

打开 http://localhost:3000, 我们看到的是一个 404 页面. 这个时候 Next.js 没有任何功能. 默认就是一个 404 页面.

#### 2、创建第一个页面

现在我们来创建第一个页面. 在 pages 目录下创建一个名称为 index.js 的文件, 内容如下:

```

const Index = () => {
  return (
    <div>
      <p>Hell Next.js</p>
    </div>
  )
}
export default Index

```

现在, 再次访问 http://localhost:3000, 在页面上你会看到 "Hello Next.js". 这里, 我们只是从 pages/index.js 模块导出了一个简单的 React 组件. 同理, 可以编写你自己的模块并且导出它.

#### 3、错误处理

默认情况, Next.js 会在浏览器中直接显示这些错误信息, 这方便你识别错误并且快速的搞定它.

你但你解决了这些错误, 页面会执行一个无刷新的更新. 这得益于Webpack提供的热模块替换功能, 在Next.js它是默认支持的.
