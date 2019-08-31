## react-router和react-router-dom的区别

> react-router-v4，我称之为“第四代react-router”，react-router和react-router-dom的区别是什么呢？


为什么有时候我们看到如下的写法：

1. 写法1:

``` js
import {Swtich, Route, Router, HashHistory, Link} from 'react-router-dom';
```
2. 写法2:

```js
import {Switch, Route, Router} from 'react-router';
import {HashHistory, Link} from 'react-router-dom';
```

先简单说下各自的功能：

react-router: 实现了路由的核心功能
react-router-dom: 基于react-router，加入了在浏览器运行环境下的一些功能，例如：Link组件，会渲染一个a标签，Link组件源码a标签行; BrowserRouter和HashRouter组件，前者使用pushState和popState事件构建路由，后者使用window.location.hash和hashchange事件构建路由。
react-router-native: 基于react-router，类似react-router-dom，加入了react-native运行环境下的一些功能。

Link组件的源码如下图所示：

从源码层面来说明：
首先看react-router-dom中的Switch组件的源码
// Written in this round about way for babel-transform-imports
import { Switch } from 'react-router'
export default Switch
只是从react-router中导入Switch组件，然后重新导出而已。
查看其他模块的源码，
Route组件的源码
Router组件的源码
...
和Swtich一样，都是从react-router中导入了相应的组件，重新导出而已，并没有对实现做什么特殊处理。

结论：
1. react-router-dom依赖react-router，所以我们使用npm安装依赖的时候，只需要安装相应环境下的库即可，不用再显式安装react-router。基于浏览器环境的开发，只需要安装react-router-dom；基于react-native环境的开发，只需要安装react-router-native。npm会自动解析react-router-dom包中package.json的依赖并安装。

```js
//react-router-dom中package.json依赖:
"dependencies": {
    "history": "^4.7.2",
    "invariant": "^2.2.2",
    "loose-envify": "^1.3.1",
    "prop-types": "^15.5.4",
    "react-router": "^4.2.0",
    "warning": "^3.0.0"
  }
```
安装了react-router-dom，npm会解析并安装上述依赖包。可以看到，其中包括react-router。
2. 所以，回到最开始的写法。基于浏览器环境的开发，写法1就可以了。
参考链接:
ReactTraining/react-router#4648
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/README.md