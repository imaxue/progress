## 简介
谷歌浏览器（通常简称为 Chrome ）是由谷歌开发的网络浏览器。 它于 2008 年首次针对 Microsoft Windows 发布，后来移植到 Linux ，macOS ，iOS 和 
Android 。 浏览器也是 Chrome OS 的主要组件，它可以作为 Web 应用的平台。

### 打开Chrome开发者工具
1.菜单中选择 更多工具 => 开发者工具

2.在页面元素上右键点击，选择“检查”

3. 使用Ctrl + Shift + I(windows) 或 Cmd + Opt + I(Mac)

### 了解面板
1.元素面板
2.控制台面板
3.源代码面板
4.网络面板
5.性能面板
6.内存面板
7.应用面板
8.安全面板

##  copying & saving
1. copy()
在控制台输入 copy(你的变量)就可以把内容复制到粘贴板上

2. Store as global(存储为一个全局变量)
如果你在 console 中打印了一堆数据 (例如你在 App 中计算出来的一个数组) ，然后你想对这些数据做一些额外的操作比如我们刚刚说的
copy (在不影响它原来值的情况下) 。 那就可以将它转换成一个全局变量，只需要 右击 它，并选择 “Store as global variable” (保存为全局变量) 选项。
第一次使用的话，它会创建一个名为 temp1 的变量，第二次创建 temp2，第三次 ... 。通过使用这些变量来操作对应的数据，不用再担心影响到他们原来的值。

3. copy Html
选中dom节点直接右击copy，或者Ctrl + c，依然可以用

## 使用Command
我们直接可以直接看到的 DevTools 的功能，其实只是有限的一部分，怎么去探索更多的功能呢？
Command 菜单可以帮助我们快速找到那些被隐藏起来的功能，这也是它本身必不可少的原因。
如果你使用过 WebStorm 中的 Find Action (查找动作) 或者 Visual Studio Code 中的 Command Palette 的话，那么在 DevTools 中的 Command
菜单也与之类似：
在 Chrome 的调试打开的情况下 按下 [ Ctrl] + [Shift] + [P] (Mac： [⌘] + [Shift]+ [P] )

1.截屏新姿势
⌘+Shift+P后输入screen,选择Capture node screenshot

2.快速切换面板
DevTools 使用双面板布局，形式一般是：元素面板 + 资源面板 ，它根据屏幕可用的部分，经常将不同面板横向或者纵向的排列，以适合阅读的方式展示出来。但有时候我们并不喜欢默认的布局。
打开 Commands 菜单并且输入 layout ，你会看到 2 到 3 个可供选择的项(这里不再显示你已经激活的选项)：

使用横向面板布局
使用纵向面板布局
使用自动面板布局

3.快速切换主题
 Commands 菜单中寻找与 theme 相关的选项，实现 明亮 & 暗黑 两种主题之间的切换
 
 ## 代码块使用
 
 Snippets:它允许你存放 JavaScript 代码到 DevTools 中，方便你复用这些 JavaScript 代码块。
 进入到 Sources 面板，在导航栏里选中 Snippets 这栏，点击 New snippet(新建一个代码块) ，然后输入你的代码之后保存，大功告成！现在你可以通过右击菜单或者快捷键： [ctrl] + [enter] 来运行它了
 
当我在 DevTools 中预设了一组很棒的代码块以后，甚至都不必再通过 Sources 来运行它们。使用 Command Menu(Cmd + P) 才是最快的方式。只需在它的输入框中输入 ! ，就可以根据名字来筛选预设代码块

## console篇 - console中的'$'

在 Chrome 的 Elements 面板中， $0 是对我们当前选中的 html 节点的引用。
理所当然，$1 是对上一次我们选择的节点的引用，$2 是对在那之前选择的节点的引用，等等。一直到 $4
你可以尝试一些相关操作(例如: $1.appendChild($0))

1.$ 和 $$
如果你没有在 App 中定义过 $ 变量 (例如 jQuery )的话，它在 console 中就是对这一大串函数 document.querySelector 的别名。
如果是 $$ 就更加厉害了，还能节省更多的时间，因为它不仅执行 document.QuerySelectorAll 并且它返回的是：一个节点的 数组 ，而不是一个 Node list

2.调试的过程中，你经常会通过打印查看一些变量的值，但如果你想看一下上次执行的结果呢？再输一遍表达式吗？
这时候 $_ 就派上了用场，$_ 是对上次执行的结果的引用。

3.$i
现在的前端开发过程，离不开各种 npm 插件，但你可能没有想过，有一天我们竟然可以在 Dev Tools 里面来使用 npm 插件！
有时你只是想玩玩新出的 npm 包，现在不用再大费周章去建一个项目测试了，只需要在 Chrome插件:Console Importer 的帮助之下，快速的在 console 中引入和测试一些 npm 库。
运行 $i('lodash') 或者 $i('moment') 几秒钟后，你就可以获取到 lodash / momentjs 了

## console.log
一般来说，我们会使用 console.log() 来打印某个对象，并且，两次打印之间，还会对这个对象进行修改，最后我们查看打印的结果发现，
修改前的打印和修改后的打印，竟然是一样的？这样出乎意料的情况，让我们难以继续 console.log 的调试。这是因为console 中打印出的对象，在你打印出他内容之前，是以引用的方式保存的。

知道了原因，对应的就知道该怎么处理这样的情况了：

打印一个从这个对象复制出来的对象。
使用资源面中的断点来调试
使用 JSON.stringify() 方法处理打印的结果

## console篇 - 自定义格式转换器
大多数的情况下，我们习惯使用 DevTools 的 console 默认对 object 的转换，但有时候我们想用与众不同的方式来处理。 那我们就可以自定义输出对象的函数，它通常被称为 Custom Formatter 。

```
  请注意: 在我们写一个之前，需要在 DevTools 进行设置 (在 DevTools 的 ⋮ 下拉框找到设置，或者按下 F1 ) 中把对应的设置打开(Console下面的 Enable custom formatters)
```
formatter 长什么样呢？ 它是一个对象，最多包含三个方法：

- header : 处理如何展示在 console 的日志中的主要部分。
- hasbody : 如果你想显示一个用来展开对象的 ▶ 箭头，返回 true
- body : 定义将会被显示在展开部分的内容中。

一个基础的自定义formatter
```
   window.devtoolsFormatters = [
          {
            header: function(obj) {
              return ['div', {}, `${JSON.stringify(obj, null, 7)}`]
            },
            hasBody: function() {
              return false
            },
          },
        ]
```

### console.table
console.table 这个小技巧在开发者中可能并没有多少人知道: 如果有一个 数组 (或者是 类数组 的对象，或者就是一个 对象 )需要打印，你可以使用 console.table 方法将它以一个漂亮的表格的形式打印出来。它不仅会根据数组中包含的对象的所有属性，去计算出表中的列名，而且这些列都是可以缩放甚至 
还可以排序!!!

还可以给console加上时间戳，在Commands Menu中搜索timestamps

### 监测时间  

- console.time() 开启一个计时器
- console.timeEnd 计时结束并打印

### 给你的console.log加上css样式
在console的第一个参数上加%c,第二个参数为css样式
```
  console.log('%cabc', 'color: red; font-size: 100px')

```

### 使用实时表达式

DevTools 在 Console 面板中引入了一个非常漂亮的附加功能，这是一个名为 Live expression 的工具

只需按下 "眼睛" 符号，你就可以在那里定义任何 JavaScript 表达式。 它会不断更新，所以表达的结果将永远，存在 :-)
