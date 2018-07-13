#nginx 基础
1.安装nginx
http://www.jianshu.com/p/026d67cc6cb1

2.  转发配置

server {
                listen       8081;
                #server_name  localhost;

                #access_log   logs/localhost.access.log  main;

                location ~ \.json {
                    proxy_pass 转发接口地址;
                }

                location / {
                    root  本地文件地址;
                    index  login.html index.html;
                }

}

3.
brew services start nginx 启动命令 或者配置完全局变量后 直接 nginx

ps aux|grep ‘nginx' 看进程命令

nginx -s reload  重启命令

nginx -s stop  停止命令

4.遇到的问题就是
当nginx.conf 读取失败时会读取nginx.conf.default


