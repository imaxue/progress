## 聊聊nodeJs之中间件

### 一、概念

> Express／koa里有个中间件（middleware）的概念。所谓中间件，就是在收到请求后和发送响应之前这个阶段执行的一些函数。

要在一条路由的处理链上插入中间件，可以使用express对象的use方法。该方法原型如下：

```
app.use([path,] function [, function...])
```

当app.use没有提供path参数时，路径默认为“/”。

当你为某个路径安装了中间件，则当以该路径为基础的路径被访问时，都会应用该中间件。比如你为“/abcd”设置了中间件，那么“/abcd/xxx”被访问时也会应用该中间件。

中间件模式（middleware）是一种很常见、也很强大的模式，被广泛应用在 Express、Koa、Redux 等类库和框架当中。

如果你能在自己的代码中也使用灵活这种模式能给你的程序带来更大的便利性和灵活性。

简单来说，中间件就是在调用目标函数之前，你可以随意插入其他函数预先对数据进行处理、过滤，在这个过程里面你可以打印数据、或者停止往下执行中间件等。

数据就像水流一样经过中间件的层层的处理、过滤，最终到达目标函数。


### 二、特点：

1、中间件就是一种功能的封装方式，就是封装在程序中处理http请求的功能，

2、中间件是在管道中执行

3、中间件有一个next()函数，如果不调用next函数，请求就在这个中间件中终止了，

4、中间件和路由处理器的参数中都有回调函数，这个函数有2,3,4个参数

      如果有两个参数就是req和res；

      如果有三个参数就是req,res和next

      如果有四个参数就是err，req，res，next

5、如果不调用next ，管道就会终止，不会再有处理器做后续响应，应该向客户端发送一个响应

6、如果调用了next，不应该发送响应到客户端，如果发送了，则后面发送的响应都会被忽略

7、中间件的第一个参数可以是路径，如果忽略则全部都匹配


### 三、koa提供的中间件：

#### No.1、 koa-router

路由是Web框架必不可少的基础功能，koa.js为了保持自身的精简，并没有像Express.js自带了路由功能，

因此koa-router做了很好的补充，作为koa星数最多的中间件，koa-router提供了全面的路由功能，

比如类似Express的app.get/post/put的写法，URL命名参数、路由命名、支持加载多个中间件、嵌套路由等。

其他可选路由中间件：koa-route, koa-joi-router, koa-trie-router

#### No.2、 koa-bodyparser

koa.js并没有内置Request Body的解析器，当我们需要解析请求体时需要加载额外的中间件，

官方提供的koa-bodyparser是个很不错的选择，支持x-www-form-urlencoded, application/json等格式的请求体，

但不支持form-data的请求体，需要借助 formidable 这个库，也可以直接使用 koa-body 或 koa-better-body

#### No.3、 koa-views

koa-views对需要进行视图模板渲染的应用是个不可缺少的中间件，支持ejs, nunjucks等众多模板引擎。

#### No.4、 koa-static

Node.js除了处理动态请求，也可以用作类似Nginx的静态文件服务，在本地开发时特别方便，可用于加载前端文件或后端Fake数据，可结合 koa-compress 和 koa-mount 使用。

#### No.5、 koa-session

HTTP是无状态协议，为了保持用户状态，我们一般使用Session会话，koa-session提供了这样的功能，

既支持将会话信息存储在本地Cookie，也支持存储在如Redis, MongoDB这样的外部存储设备。

#### No.6、 koa-jwt

随着网站前后端分离方案的流行，越来越多的网站从Session Base转为使用Token Base，JWT(Json Web Tokens)作为一个开放的标准被很多网站采用，koa-jwt这个中间件使用JWT认证HTTP请求。

#### No.7、 koa-helmet

网络安全得到越来越多的重视，helmet 通过增加如Strict-Transport-Security, X-Frame-Options, X-Frame-Options等HTTP头提高Express应用程序的安全性，koa-helmet为koa程序提供了类似的功能，参考Node.js安全清单。

#### No.8、 koa-compress

当响应体比较大时，我们一般会启用类似Gzip的压缩技术减少传输内容，koa-compress提供了这样的功能，可根据需要进行灵活的配置。

#### No.9、 koa-logger

koa-logger提供了输出请求日志的功能，包括请求的url、状态码、响应时间、响应体大小等信息，对于调试和跟踪应用程序特别有帮助，koa-bunyan-logger 提供了更丰富的功能。

#### No.10、 koa-convert

对于比较老的使用Generate函数的koa中间件(< koa2)，官方提供了一个灵活的工具可以将他们转为基于Promise的中间件供Koa2使用，同样也可以将新的基于Promise的中间件转为旧式的Generate中间件。


四、根据业务具体封装中间件：

```
1、创建middlerware文件夹

比如我们要实现加载所有的api请求的路由，可以这么封装: load-api-routes.ts

import md5 from "blueimp-md5";
import Koa from "koa";
import Router from "koa-router";
import { join } from "path";
import { flatten } from "ramda";
import { readdirRecursivelySync } from "readdir-recursively-sync";
import sortByKey from "../lib/sortByKey";

const api = new Router({ prefix: "/api" });

api.use((ctx, next) => {
    if (ctx.hostname === "localhost") return next();
    if (!ctx.session!.sign) {
        console.log("确少sign", ctx.session);
        return ctx.throw(400);
    }
    if (ctx.method.toUpperCase() === "POST" && ctx.request.body) {
        if (ctx.header.sign !== md5(JSON.stringify(sortByKey(ctx.request.body)))) {
            console.log("sign计算不一致");
            return ctx.throw(400);
        }
    }
    return next();
});

// 加载所有路由

export default (app: Koa) => {
    flatten(readdirRecursivelySync(join(__dirname, "..", "api")))
        .map((item: any) => item.replace(join(__dirname, ".."), ".."))
        .filter((item: string) => item.includes(".router.") && !item.includes(".js.map"))
        .map((routeFile: string) => {
            const router = require(routeFile).default;
            if (router && router.routes) {
                api.use(router.routes());
            }
        });
    app.use(api.routes());
};

sortByKey.ts
export default function(obj: { [key: string]: any }) {
    const o = {};
    for (const key of Object.keys(obj).sort()) {
        o[key] = obj[key];
    }
    return o;
}


```

2、在node服务中，index.ts文件中这样引入

```
import { createServer } from "http";
import Koa from "koa";
import bodyparser from "koa-bodyparser";
import json from "koa-json";
import logger from "koa-logger";
import onError from "koa-onerror";
import session from "koa-session";
import koaStatic from "koa-static";
import next from "next";
import NextRoutes from "next-routes";
import path from "path";
import loadApiRoutes from "./middleware/load-api-routes";

const port = parseInt(process.env.PORT || "3000", 10);
const server = new Koa();
const errOption = process.env.NODE_ENV === "production" ? { redirect: "/" } : {};
const router = new NextRoutes();
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });

const handler = router
    .getRequestHandler(nextApp, ({ req, res, route, query }: any) => {
        if (req.url.startsWith("/site/other")) {
            const eid = query.eid;
            const pathname = eidMap.get(eid) || "/site/oppo/uid";
            return nextApp.render(req, res, pathname, query);
        }
        nextApp.render(req, res, route.page, query);
    });

onError(server, {
    ...errOption,
    json(err, ctx) {
        ctx.body = { err };
    },
});
server.use(koaStatic(path.resolve("logs"))); // /logs/hk-h5-out-1.log
server.use(koaStatic(path.resolve("static"), { maxage: 365 * 24 * 60 * 60 * 1000, immutable: true }));
server.keys = ["some secret li hk-share"];
server.use(session({
    key: "hk-share", /** (string) cookie key (default is koa:sess) */
    maxAge: 86400000 * 10000, /** (number) maxAge in ms (default is 1 days) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
} as any, server));

server.use(bodyparser({ enableTypes: ["json", "form", "text"] }));
server.use(json());
server.use(logger());

loadApiRoutes(server); // 加载所有接口
server.use(address);
server.use(initResLocals);
loadRoutes(server); // 加载所有页面路由
server.use(async (ctx) => {
    if (ctx.url.startsWith("/api") || ctx.url.startsWith("/social")) return;
    ctx.respond = false;
    ctx.status = 200;
    return handler(ctx.req, ctx.res);
});

nextApp.prepare().then(() => {
    const httpServer = createServer((req, res) => {
        if (req.url === "/checkup") {
            res.statusCode = 200;
            return res.end("ok");
        }
        if (req.url && req.url.startsWith("/_next/")) {
            if (req.url.startsWith("/_next/static/images/")) {
                res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
            }
            return handler(req, res);
        }
        server.callback()(req, res);
    }).listen(port).on("listening", (err: Error) => {
        if (err) { throw err; }
        const addr = httpServer.address() as any;
        // tslint:disable-next-line:no-console
        if (dev) return console.log("web > http://1.autodis.cn:" + addr.port + "/test");
        console.log("web > http://localhost:" + addr.port);
    });
});

process.on("unhandledRejection", (reason) => {
    // tslint:disable-next-line:no-console
    console.error("unhandledRejection reason:", reason);
});

export default nextApp;
export {
    router,
};



```





