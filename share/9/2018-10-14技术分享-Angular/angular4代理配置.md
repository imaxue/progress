#### 1、适用的环境
- 1、 后端代码部署到开发环境
- 2、 前端本地启服务
- 3、 本地前端代码请求开发环境的后端api接口存在跨域的问题，此时需要配置代理；

#### 2、具体配置流程
1. 配置proxy.conf.json文件：

```
{
    "/boss-product": {
        "target": "http://boss-gateway.bdn_boss-dev.irootechapp.com",
        "secure": false,
        "changeOrigin": true,
        "pathRewrite": {
            "^/boss-product": "/boss-product"
        }
    },
    "/boss-device": {
        "target": "http://boss-gateway.bdn_boss-dev.irootechapp.com",
        "secure": false,
        "changeOrigin": true,
        "pathRewrite": {
            "^/boss-device": "/boss-device"
        }
    }
}
```
- 注意：
  - 1、/boss-produc是api接口的服务名字；

2. 配置package.json文件：

```
"start": "ng serve --proxy-config proxy.conf.json --port 4201 --disable-host-check true",
```

3. 配置本地host文件：

```
127.0.0.1       xx.xxx.com
```
- 注意：
  - 1、此配置实质设置的是angular本地服务的域名；
  - 2、在浏览器url中输入xx.xxx.com，实质访问的是本地服务器127.0.0.1
  - 3、域名xx.xxx.com是后端提供的，后端应该是做了权限设置；
    - 顶级域名相同则可共享cookie

#### 3、接口数据流向
1. 浏览器中输入xx.xxx.com-->浏览器访问本地服务器(代理服务器)-->本地服务器向开发环境服务器要数据-->开发环境服务器把接口数据返回浏览器

#### 4、对比直接访问开发环境数据流向
1. 前后端代码都已部署到了开发环境，前后端代码同源故不存在跨域的问题；
2. 浏览器访问开发环境地址-->前端代码ajax接口从后端要数据

