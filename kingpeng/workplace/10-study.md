## Typescript运用于react项目中的一些注意点：

### 一、typings.d.ts文件

#### 1、场景a：当项目中引入一些js文件，需要调用某个方法是，tslint会报错，这时你需要声明一下

#### 2、场景b：一些传入的pros或者state强类型，可以在这个文件中声明

Example：

```
// 接口
interface option {
  type?: number
}
// 声明变量
declare const _hmt: string[][]
// 声明方法
declare const getAds: (tagId: string, option, callBack: (result: any) => void) => void
// 接口window对象
interface Window {
  data: any
  firstUrl: string
}
// 声明命名空间
declare namespace h5 {
  interface IAdProps {
    ads: any[]                           // 本页面所有广告
    position: any                        // 广告位置
    isImgPlus?: boolean                  // 是否是百度联盟
    isFromList?: boolean                 // 是否来自列表
    eid?: string                         // eid
    isNj?: boolean                       // 是否是新页面
  }
}

用法：AdBox.tsx文件

export default class AdBox extends Component<h5.IAdProps> {}

```

### 二、react.d.ts文件（react的ts文件声明）

#### 场景a：react对元素属性做了校验，如果在原生属性上使用此元素不支持的属性，则不能编译成功。必须使用data-前缀

```
<input type="text" data-init="22"/>

```
#### react会转义一些标签的属性为“data-init”，但是我们并不需要它这么转，有些js不识别，这时候以下声明文件就可以起作用了

```
import { ScriptHTMLAttributes } from 'react'
import { Component } from "react";

declare module 'react' {
    interface ScriptHTMLAttributes<T> {
        name?: boolean | string
    }

    export interface Component {
        render(): any
    }

    export function createRef(): any
}

用法：比如script的name属性，react本来不支持，但是有了这个文件，在其中声明之后，便可以生效了，这个文件中的声明尤其对一些dom的操作，声明属性方便！

<script type="text/javascript" id="fd78b1ed2c1a437fabb11882f3aa79f6" name="vivo-ad" ></script>

```

### 三、http-res.d.ts

* 1、首先说明这个文件的作用在哪，其实是个骚操作，前提是你使用koa，还有服务端渲染框架Next或者Nuxt
* 2、当你使用服务端使用node的框架koa或者express的时候，你想给res赋一个属性变量，以挂载其他的属性和方法的时候，就可以这么声明了

```
import http from 'http'

declare module 'http' {
    interface ServerResponse {
        /**
         * 后端next服务传给 getInitialProps的数据，获取方式 getInitialProps({res}) { return res.locals}
         */
        locals: any
    }
}

```

#### Example

* 第一步：在middleware中间件文件夹中创建以下文件：init-res-locals.ts

```
import { Middleware } from 'koa'

const initResLocals: Middleware = async (ctx, next) => {
    ctx.res.locals = {}
    await next()
}

export default initResLocals

```

* 第二步：在整个项目的入口文件index.ts中引入，执行

```
import Koa from 'koa'
import koaStatic from 'koa-static'
import initResLocals from './middleware/init-res-locals'
const server = new Koa()
const dev = process.env.NODE_ENV !== 'production'

server.use(initResLocals)

export default nextApp

```

* 第三步：在路由文件中就可以使用```res.locals```

```
import Router from 'koa-router'
const router = new Router({ prefix: '/article' })
export default router

router.get('/show/nj/:groupId', async (ctx) => {
    const eid = ctx.query.eid || '0'
    const article = {}
    const list = []
    const query = {}
    let page = '/Test'
    ctx.status = 200
    
    ctx.res.locals = { article, city: ctx.state.city, showTopNav, list, }
    return await app.render(ctx.req, ctx.res, page, { ...ctx.query, ...query })
})

```

* 第四步：服务端渲染框架Next项目中，在Text页面就可以使用了

```
export default class Test extend Component<any> {
  public static async getInitialProps({ res, query }) {
     return { query, ...res.locals }
  }
  
  componentDidMount() {
  }
  
  render() {
    const { query: { eid } } = this.props
    
    return(
      <div>{eid}</div>
    )
  }
}

```



