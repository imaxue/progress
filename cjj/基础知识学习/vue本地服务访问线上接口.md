# vue-cli3 本地服务访问线上接口配置

- 在vue.config.js中配置如下：
```javascript
// vue.config.js
module.exports = {
  // ...
  // 假设线上的地址为: http://www.test.com/
  devServer: {
    public: 'local.test.com',
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://www.test.com',
        changeOrigin: true,
        pathRewrite: {
          '^/test': ''
        }
      }
    }
  }
}
```
- 配置``etc/hosts``文件
```shell
127.0.0.1 local.test.com
```

- 启动服务之后，通过``http://local.test.com:8080``访问项目即可。

注意：如有图片验证码之类的，需要通过xhr请求返回blob类型数据。然后调用window.URL.createObjectURL方法生成的数据放到img.src中显示。  
如果后台开启了防止csrf攻击，需要获取到token。可以由后台配置一个获取token的接口，或者可以通过xhr请求一个有token的页面地址，在返回的html文本中截取出token