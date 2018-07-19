## nginx基础使用


安装好后
找到Nginx配置文件: /usr/local/etc/nginx/nginx.conf
修改如下
如果电脑文件隐藏，可以按cmd+shift+.显示隐藏文件


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
        server 127.0.0.1:8080; # 项目的实际启动IP和端口，一般vue的项目使用8080
        keepalive 64;
    }
    server{
      listen 80; # 监听端口，如果是webpack项目这里可以写任何端口，例如8090，地址栏的地址就是127.0.0.1:8090/api/
      server_name localhost; # 域名
      # index index.html index.htm index.php; # 若果是通过webpack启动的项目，不需要配置此项
      # root /usr/local/webserver/nginx/html; # 站点目录
      location / {
            # 也可以代理到相应的目录
            # root   /Users/www;
            # index index.htm;
            
            # 代理到相应的网站
            proxy_pass          https://www.baidu.com; # 如果上边使用upstream，这里的地址需要和upstream保持一致
            # 转发的时候携带cookies
            proxy_set_header    Cookie $http_cookie;
            # 手动添加特殊的cokkies
            # add_header Set-Cookie 'token=xxxxxxxxxxxxx';
            # 可以设置跨域请求头
            add_header          'Access-Control-Allow-Origin' '*';
            add_header          'Access-Control-Allow-Credentials' 'true';
            add_header          'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header          'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-                                   Modified-Since,Cache-Control,Content-Type';
        }
       # 可以根据相应的接口，进行代理
       location ~ ^/api {
            proxy_pass          https://www.baidu.com;
       }
       # 可以写正则，
       location ~ ^/(products|manage)/ {
            proxy_pass          https://www.baidu.com;
       }
       
       # 错误页面
        error_page   500 502 503 504  /50x/50x.html;
        location = /50x/50x.html {
            root   html;
        }
    }
    include servers/*;
}
```


切换到nginx目录，在命令行里输入
```shell
sudo nginx
# 这样，nginx服务就启动了
# 如果修改相应的配置，需要重启
sudo nginx -s reload
# 关闭服务
nginx -s stop
# 看进程命令
ps aux|grep ‘nginx' 
```
