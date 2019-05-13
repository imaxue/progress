# proxy_set_header设置Host为$proxy_host，$host与$local_host的区别

先来看下proxy_set_header的语法
```
语法:	proxy_set_header field value;
默认值:	
proxy_set_header Host $proxy_host;
proxy_set_header Connection close;
上下文:	http, server, location
```
允许重新定义或者添加发往后端服务器的请求头。value可以包含文本、变量或者它们的组合。 当且仅当当前配置级别中没有定义proxy_set_header指令时，会从上面的级别继承配置。 默认情况下，只有两个请求头会被重新定义：
```
 proxy_set_header Host       $proxy_host;
proxy_set_header Connection close;
```
nginx对于upstream默认使用的是基于IP的转发，因此对于以下配置：

 

```
upstream backend {  
    server 127.0.0.1:8080;  
}  
upstream crmtest {  
    server crmtest.aty.sohuno.com;  
}  
server {  
        listen       80;  
        server_name  chuan.aty.sohuno.com;  
        proxy_set_header Host $http_host;  
        proxy_set_header x-forwarded-for  $remote_addr;  
        proxy_buffer_size         64k;  
        proxy_buffers             32 64k;  
        charset utf-8;  
  
        access_log  logs/host.access.log  main;  
        location = /50x.html {  
            root   html;  
        }  
    location / {  
        proxy_pass backend ;  
    }  
          
    location = /customer/straightcustomer/download {  
        proxy_pass http://crmtest;  
        proxy_set_header Host $proxy_host;  
    }  
}  
```

当匹配到/customer/straightcustomer/download时，使用crmtest处理，到upstream就匹配到crmtest.aty.sohuno.com，这里直接转换成IP进行转发了。假如crmtest.aty.sohuno.com是在另一台nginx下配置的，ip为10.22.10.116，则$proxy_host则对应为10.22.10.116。此时相当于设置了Host为10.22.10.116。如果想让Host是crmtest.aty.sohuno.com，则进行如下设置：

 

proxy_set_header Host crmtest.aty.sohuno.com;
如果不想改变请求头“Host”的值，可以这样来设置：
```
 proxy_set_header Host       $http_host;
```
但是，如果客户端请求头中没有携带这个头部，那么传递到后端服务器的请求也不含这个头部。 这种情况下，更好的方式是使用$host变量——它的值在请求包含“Host”请求头时为“Host”字段的值，在请求未携带“Host”请求头时为虚拟主机的主域名：
```
 proxy_set_header Host       $host;
```
此外，服务器名可以和后端服务器的端口一起传送：
```
 proxy_set_header Host       $host:$proxy_port;
```
如果某个请求头的值为空，那么这个请求头将不会传送给后端服务器：
```
 proxy_set_header Accept-Encoding "";
```
