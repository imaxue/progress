## Window 或 Document 对象未定义？
>官网process.BROWSER_BUILD未更新
>这是因为一些只兼容客户端的脚本被打包进了服务端的执行脚本中去。 对于只适合在客户端运行的脚本，需要通过使用 process.browser 变量来判断导入。
```javascript
if (process.browser) {
  require('external_library')
}
```
## 异步数据 asyncData方法
>1.返回 Promise
```javascript
export default {
  asyncData ({ params }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
  }
}
```
>2.使用 async或await
```javascript
export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```
>3.使用 回调函数
```javascript
export default {
  asyncData ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      callback(null, { title: res.data.title })
    })
  }
}
```
## 如果组件的数据不需要异步获取或处理，可以直接返回指定的字面对象作为组件的数据。
```javascript
export default {
  data () {
    return { foo: 'bar' }
  }
}
```

## nuxt 区分环境打包
>1.package.json
>先看一下 nuxt-build 源码
>在package.json中加入
>"build": "nuxt build",
>"build-test1": "nuxt build -c nuxt.config.ts1.js",
>"build-test2": "nuxt build -c nuxt.config.ts2.js",
>
>2.创建两个nuxt.config.ts1.js 和 nuxt.config.ts2.js 文件
>
>3.在nuxt.config.js中
>正式服配置
>env: {
>baseUrl: "production"
>}
>测试1配置：
>env: {
>baseUrl: “tes1"
>}
>测试2同理
>
>4.在plugins中加一个公共接口js文件暴露一个对象
>export const Config = {
>remote4Server:''
>}
>process.env.NODE_ENV在开发环境时 为development,生产环境时候为production
>process.env.baseUrl 可以读取到nuxt.config.js 中的配置项
```javascript
if (process.env.NODE_ENV !== 'production') {
  Config.remote4Server =‘本地地址'
} else if (process.env.baseUrl == "test1") {
  Config.remote4Server = ‘测试1地址'
} else if (process.env.baseUrl == "test2") {
  Config.remote4Server = ‘测试2'
} else if (process.env.baseUrl == "production") {
  Config.remote4Server = ‘正式服'
}
```
