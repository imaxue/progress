### 1.去掉点击300毫秒延迟插件
> fastclick插件[使用needsclick类名解决他和其他库点击冲突的问题]
> 使用方法：
> ` fastclick.attch(document.body)`
### 2.JSOP的原理以及使用方法
#### JSONP原理：
> ajax请求受同源策略影响，不允许进行跨域请求，而script标签src属性中的链接却可以访问跨域的js脚本，利用这个特性，服务端不再返回JSON格式的数据，而是返回一段调用某个函数的js代码，在src中进行了调用，这样实现了跨域
#### 使用方法
##### JQuery实现：
```javascript
  $(document).ready(function(){
    $.ajax({
      type : "get",
      async: false,
      url :"http://www.practice-zhao.com/student.php?id=1",
      dataType: "jsonp",
      jsonp:"callback", //请求php的参数名
      jsonpCallback: "jsonhandle",//要执行的回调函数
      success : function(data) {
          alert("age:" + data.age + "name:" + data.name)
      }
    })
  )
```
##### 运用vue插件jsonp
``` javascript
  import originJsonp from 'jsonp'
  export default function jsonp(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return new Promise((resolve, reject) => {
      originJsonp(url, option, (err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      })
    })
  }
  export function param(data) {
    let url = ''
    for (var k in data) {
      let value = data[k] !== undefined ? data[k] : ''
      url += '&' + k + '=' + encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''
  }
```
#### 如何跳过host和referer的限制
> 需要用后端代理的方式去解决，手动代理一个请求 (使用axios)://把原来的jsonp转成传统的ajax请求
``` javascript
  var app = express
  var apiRoutes = express.Router()
  apiRoutes.get('/api', (req, res) => {
    var url = '抓取地址'
    axios.get(url,{
      header:{//可以重写header
        referer: '抓取地址referer',
        host: '抓取地址的host'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
  })
  app.use('/api',apiRoutes)
```
### 3. 监听窗口改变事假的方法
`window.addEventListener('resize', () => {})`

### 4. created和mounted的区别
- created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
- mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
