# webpack4——SplitChunksPlugin使用指南

##  0. 参数介绍

先对参数有一个大概的认识，虽然撸了很多遍官方的更新文档，但是还是去参看了一下新的wbepack源码，下面是各种参数及含义：


- chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
- minSize: 表示在压缩前的最小模块大小，默认为0；
- minChunks: 表示被引用次数，默认为1；
- maxAsyncRequests: 最大的按需(异步)加载次数，默认为1；
- maxInitialRequests: 最大的初始化加载次数，默认为1；
- name: 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
- cacheGroups: 缓存组。


对于缓存组是一个对象，处了可以有上面的chunks、minSize、minChunks、maxAsyncRequests、maxInitialRequests、name外，还有其他的一些参数

> 如果不在缓存组中重新赋值，缓存组默认继承上面的选项，但是还有一些参数是必须在缓存组进行配置的。 
- priority: 表示缓存的优先级；
- test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
- reuseExistingChunk: 表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。

## 1. 基本使用
首先，在新版本的webpack会默认对代码进行拆分，拆分的规则是：

- 模块被重复引用或者来自node_modules中的模块
- 在压缩前最小为30kb
- 在按需加载时，请求数量小于等于5
- 在初始化加载时，请求数量小于等于3

> 小于30kb的模块不值得再单独发送一次请求，在很小的模块的前提下，相比与多次打包，减少请求次数成本要低。

当然也可以不使用默认的配置，比如这样：
```js
new webpack.optimize.SplitChunksPlugin({
    chunks: "all",
    minSize: 20000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true
)}
```

上面的代码就表示，在所有代码中，引用模块大小最小为20kb，引用次数最少为1次，按需加载最大请求次数为5，初始化加载最大请求次数为3的所有模块就行拆分到一个单独的代码块中，name表示代码的名字，设置为true则表示根据模块和缓存组秘钥自动生成。



## 2. 使用缓存组(Cache Groups)

如果想继续细分代码，可以使用缓存组(Cache Groups)。同样的，缓存组也有默认的配置；缓存组默认将node_modules中的模块拆分带一个叫做vendors的代码块中，将最少重复引用两次的模块放入default中。

这是一段官方里面的代码：

```js
splitChunks: {
    chunks: "async",
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true,
    cacheGroups: {
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
        },
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        }
    }
}



```
上面是缓存组的默认配置，可以通过default:false禁用默认的缓存组，然后就可以自定义缓存组，将初始化加载时被重复引用的模块进行拆分，就像这样

```js
cacheGroups: {
    commons: {
        name: "commons",
        chunks: "initial",
        minChunks: 2
    }
}
```
这会创建一个commons代码块，这个代码块包含所有被其他入口(entrypoints)共享的代码。

注意：这可能会导致下载额外的代码。

之后就随心所欲，可以根据具体的需求，创建多个缓存组：




```js
splitChunks: {
    cacheGroups: {
        commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
        }
    }
}

```
这会创建一个名为vendors的代码块，它会包含整个应用所有来自node_modules的代码。

```js
runtimeChunk: { name: 'runtime' }
```
通过optimization.runtimeChunk: true选项，webpack会添加一个只包含运行时(runtime)额外代码块到每一个入口。
（译注：这个需要看场景使用，会导致每个入口都加载多一份运行时代码）

- [内容来源](https://blog.csdn.net/songluyi/article/details/79419118)
