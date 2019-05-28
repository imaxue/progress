## 安装和使用

我们使用npm或者yarn来安装webpack，可以作为一个全局的命令来使用：
```shell
  npm install webpack webpack-cli -g
  
  # 或者
  yarn global add webpack webpack-cli
  
  # 然后就可以执行全局命令了
  webpack --help

```

webpack-cli是使用webpack的命令行工具，在4.x版本之后不在作为webpack的依赖了，我们使用时需要单独安装这个工具。

在项目中，我们更多地会把 webpack 作为项目的开发依赖来安装使用，这样可以指定项目中使用的 webpack 版本，更加方便多人协同开发：

> 确保你的项目中有 package.json 文件，如果没有可以使用 npm init 来创建。

```shell

    npm install webpack -D 

    # 或者
    yarn add webpack -D
  
```

这样 webpack 会出现在 package.json 中，我们再添加一个 npm scripts：

``` json
    "scripts": {
      "build": "webpack --mode production"
    },
    "devDependencies": {
      "webpack": "^4.1.1",
      "webpack-cli": "^2.0.12",
    }

```

>然后我们创建一个 ./src/index.js 文件，可以写任意的 JS 代码。创建好了之后执行 npm run build 或者 yarn build 命令，你就会发现新增了一个 
>dist 目录，里边存放的是 webpack 构建好的 main.js 文件。

>因为是作为项目依赖进行安装，所以不会有全局的命令，npm/yarn 会帮助我们在当前项目依赖中寻找对应的命令执行，如果是全局安装的 webpack，
>直接执行 webpack --mode production 就可以。

## webpack 的基本概念

webpack 本质上是一个打包工具，它会根据代码的内容解析模块依赖，帮助我们把多个模块的代码打包。

webpack 会把我们项目中使用到的多个代码模块（可以是不同文件类型），打包构建成项目运行仅需要的几个静态文件。webpack 有着十分丰富的配置项，
提供了十分强大的扩展能力，可以在打包构建的过程中做很多事情。我们先来看一下 webpack 中的几个基本概念。

### 入口

在多个代码模块中会有一个起始的 .js 文件，这个便是 webpack 构建的入口。webpack 会读取这个文件，并从它开始解析依赖，然后进行打包。

>我们常见的项目中，如果是单页面应用，那么可能入口只有一个；如果是多个页面的项目，那么经常是一个页面会对应一个构建入口。

入口可以使用 entry 字段来进行配置，webpack 支持配置多个入口来进行构建：

```
  module.exports = {
    entry: './src/index.js' 
  }

  // 上述配置等同于
  module.exports = {
    entry: {
      main: './src/index.js'
    }
  }

  // 或者配置多个入口
  module.exports = {
    entry: {
      foo: './src/page-foo.js',
      bar: './src/page-bar.js', 
      // ...
    }
  }

  // 使用数组来对多个文件进行打包
  module.exports = {
    entry: {
      main: [
        './src/foo.js',
        './src/bar.js'
      ]
    }
  }

```

最后的例子，可以理解为多个文件作为一个入口，webpack 会解析两个文件的依赖后进行打包。

### loader

webpack 中提供一种处理多种文件格式的机制，便是使用 loader。我们可以把 loader 理解为是一个转换器，负责把某种文件格式的内容转换成 webpack 可以支持打包的模块。

举个例子，在没有添加额外插件的情况下，webpack 会默认把所有依赖打包成 js 文件，如果入口文件依赖一个 .hbs 的模板文件以及一个 .css 的样式文件，那么我们需要 handlebars-loader 来处理 .hbs 文件，需要 css-loader 来处理 .css 文件（这里其实还需要 style-loader），最终把不同格式的文件都解析成 js 代码，以便打包后在浏览器中运行。

当我们需要使用不同的 loader 来解析处理不同类型的文件时，我们可以在 module.rules 字段下来配置相关的规则，例如使用 Babel 来处理 .js 文件：

```
  module: {
    // ...
    rules: [
      {
        test: /\.jsx?/, // 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
        include: [
          path.resolve(__dirname, 'src') // 指定哪些路径下的文件需要经过 loader 处理
        ],
        use: 'babel-loader', // 指定使用的 loader
      },
    ],
  }

```

### plugin

在 webpack 的构建流程中，plugin 用于处理更多其他的一些构建任务。可以这么理解，模块代码转换的工作由 loader 来处理，除此之外的其他任何工作都可以交由 plugin 来完成。通过添加我们需要的 plugin，可以满足更多构建中特殊的需求。例如，要使用压缩 JS 代码的 uglifyjs-webpack-plugin 插件，只需在配置中通过 plugins 字段添加新的 plugin 即可：

```
  const UglifyPlugin = require('uglifyjs-webpack-plugin')

  module.exports = {
    plugins: [
      new UglifyPlugin()
    ],
  }

```

除了压缩 JS 代码的 uglifyjs-webpack-plugin，常用的还有定义环境变量的 DefinePlugin，生成 CSS 文件的 ExtractTextWebpackPlugin 等。在这里提到这些 plugin，只是希望读者们能够对 plugin 的作用有个大概的印象，后续的小节会详细介绍如何使用这些 plugin。

plugin 理论上可以干涉 webpack 整个构建流程，可以在流程的每一个步骤中定制自己的构建需求。第 15 小节我们会介绍如何开发 plugin，让读者们在必要时，也可以在 webpack 的基础上开发 plugin 来应对一些项目的特殊构建需求。

### 输出

webpack 的输出即指 webpack 最终构建出来的静态文件，可以看看上面 webpack 官方图片右侧的那些文件。当然，构建结果的文件名、路径等都是可以配置的，使用 output 字段：

```
  module.exports = {
    // ...
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
  }

  // 或者多个入口生成不同文件
  module.exports = {
    entry: {
      foo: './src/foo.js',
      bar: './src/bar.js',
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist',
    },
  }

  // 路径中使用 hash，每次构建时会有一个不同 hash 值，避免发布新版本时线上使用浏览器缓存
  module.exports = {
    // ...
    output: {
      filename: '[name].js',
      path: __dirname + '/dist/[hash]',
    },
  }

```

我们一开始直接使用 webpack 构建时，默认创建的输出内容就是 ./dist/main.js。

## 一个简单的 webpack 配置

我们把上述涉及的几部分配置内容合到一起，就可以创建一个简单的 webpack 配置了，webpack 运行时默认读取项目下的 webpack.config.js 文件作为配置。

所以我们在项目中创建一个 webpack.config.js 文件：

```
  const path = require('path')
  const UglifyPlugin = require('uglifyjs-webpack-plugin')

  module.exports = {
    entry: './src/index.js',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.jsx?/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          use: 'babel-loader',
        },
      ],
    },

    // 代码模块路径解析的配置
    resolve: {
      modules: [
        "node_modules",
        path.resolve(__dirname, 'src')
      ],

      extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
    },

    plugins: [
      new UglifyPlugin(), 
      // 使用 uglifyjs-webpack-plugin 来压缩 JS 代码
      // 如果你留意了我们一开始直接使用 webpack 构建的结果，你会发现默认已经使用了 JS 代码压缩的插件
      // 这其实也是我们命令中的 --mode production 的效果，后续的小节会介绍 webpack 的 mode 参数
    ],
  }

```

webpack 的配置其实是一个 Node.js 的脚本，这个脚本对外暴露一个配置对象，webpack 通过这个对象来读取相关的一些配置。因为是 Node.js 脚本，所以可玩性非常高，你可以使用任何的 Node.js 模块，如上述用到的 path 模块，当然第三方的模块也可以。

创建了 webpack.config.js 后再执行 webpack 命令，webpack 就会使用这个配置文件的配置了。

有的时候我们开始一个新的前端项目，并不需要从零开始配置 webpack，而可以使用一些工具来帮助快速生成 webpack 配置。
