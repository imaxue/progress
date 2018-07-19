## 

```shell
worker_processes  4; # 最好保持和自己电脑的cpu核心数相同

events {
    worker_connections  2048; # 是每个worker进程的最大连接数
}

# Nginx配置文件: /usr/local/etc/nginx/nginx.conf
# Nginx每一条配置语句后面都必须要加 ';'
# 注释用'#'

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    # 负载均衡
    upstream test.mijia.mi.srv {
        server 127.0.0.1:8080;
        keepalive 64;
    }
    server{
      listen 80; # 监听端口
      server_name localhost; # 域名
      # index index.html index.htm index.php; # 若果是通过webpack启动的项目，不需要配置此项
      root /usr/local/webserver/nginx/html; # 站点目录
       
    

    }
    
}
```
