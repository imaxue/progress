## axios配置权重问题

先上结论
拦截器interceptors > 传入config > 全局defaults


- 通用配置，可以直接绑定在defaults上，只需要配置一次，不需要每次都配置，防止影响其他请求
```js
axios.defaults.timeout = 5000; //设置超时时间
axios.defaults.baseURL = 'http://localhost:4000/api/v1/'; //这是调用数据接口

// 下边可以这样配置，但是并不通用，也不太建议这样写
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

```
- 传入config，会覆盖掉当前请求的defaults配置，这样可以配置特殊的请求

```js
/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, config = {
 "headers": {
  'Content-Type': 'application/json', //设置跨域头部
  "Authorization": 'JWT ' + sessionStorage.getItem("authToken")
 }
}) {
 return new Promise((resolve, reject) => {
  axios.post(url, data, config)
   .then(response => {
    resolve(response.data);
   }, err => {
    reject(err.response);
   })
 })
}

```
- 拦截器interceptors，请求发出去前的最后一次配置，影响范围是全局，会覆盖defaults和config，请慎用

```js

axios.interceptors.request.use(
 config => {
  const token = sessionStorage.getItem("token"); //获取存储在本地的token
  config.data = JSON.stringify(config.data);
  config.headers = {
   'Content-Type':'application/json' //设置跨域头部,虽然很多浏览器默认都是使用json传数据，但咱要考虑IE浏览器。
  };
  if (token) {
   config.headers.Authorization = "Token " + token; //携带权限参数
  }
  return config;
 },
 err => {
  return Promise.reject(err);
 }
);
```
