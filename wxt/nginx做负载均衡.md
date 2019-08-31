# nginx做负载均衡
> 在 /etc/nginx/conf.d 下面的服务器配置文件里的server的上面添加：
```javascript
upstream ice {
  ip_hash;
  server xx.xx.xx.xx:3007
  server 127.0.0.1:3000
}
```