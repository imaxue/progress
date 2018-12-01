
#一、安装nginx
>http://www.jianshu.com/p/026d67cc6cb1

>1、先安装homebrew。官网。终端执行以下命令：
>ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
>出现以下log表示安装完成了。
>
>
>Installation successful!
>
>2、安装Nginx，终端下执行：
>
>brew install nginx
>安装过程中会自己安装依赖：
>
>
>$ brew install nginx
>Warning: You have Xcode 8 installed without the CLT;
>this causes certain builds to fail on OS X El Capitan (10.11).
>Please install the CLT via:
>  sudo xcode-select --install
>==> Installing dependencies for nginx: openssl, pcre
>==> Installing nginx dependency: openssl
>安装完成后会有以下log：
>
>
>The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
>nginx can run without sudo.
>
>nginx will load all files in /usr/local/etc/nginx/servers/.
>
>To have launchd start nginx now and restart at login:
>  brew services start nginx
>Or, if you don't want/need a background service you can just run:
>  nginx
>==> Summary
>🍺  /usr/local/Cellar/nginx/1.10.1: 7 files, 972.3K
>
>3.鉴于安装过程中出现的Warning，为避免将来掉坑，运行
>sudo xcode-select --install
>终端会出现提示
>
>
>xcode-select: note: install requested for command line developer tools
>并会询问安装工具
>
>
>xcode-select
>点击安装，等待软件安装完成即可。
>
>4.启动nginx服务
>
>
>brew services start nginx
>
>$ brew services start nginx
>==> Tapping homebrew/services
>Cloning into '/usr/local/Homebrew/Library/Taps/homebrew/homebrew-services'...
>remote: Counting objects: 10, done.
>remote: Compressing objects: 100% (7/7), done.
>remote: Total 10 (delta 0), reused 6 (delta 0), pack-reused 0
>Unpacking objects: 100% (10/10), done.
>Checking connectivity... done.
>Tapped 0 formulae (36 files, 46.1K)
>==> Successfully started `nginx` (label: homebrew.mxcl.nginx)
>成功后，使用浏览器打开http://localhost:8080 。
>
>如果打开页面如下，证明安装完成，可以使用了。
>
>
>screenshot200.png
>5.nginx文件目录
>
>5.1 nginx安装文件目录
>/usr/local/Cellar/nginx
>5.2 nginx配置文件目录
>/usr/local/etc/nginx
>5.3 config文件目录
>/usr/local/etc/nginx/nginx.conf
>5.4 系统hosts位置
>/private/etc/hosts
>
>6.nginx常用命令
>
>nginx  #启动nginx
>nginx -s quit  #快速停止nginx
>nginx -V #查看版本，以及配置文件地址
>nginx -v #查看版本
>nginx -s reload|reopen|stop|quit   #重新加载配置|重启|快速停止|安全关闭nginx
>nginx -h #帮助
>ps -ef | grep nginx 查看进程
>
>$ nginx -h #帮助 nginx version: nginx/1.10.1 Usage: nginx [-?hvVtTq] [-s signal] [-c filename] >[-p prefix] [-g directives] Options: -?,-h : this help -v : show version and exit -V : show >version and configure options then exit -t : test configuration and exit -T : test >configuration, dump it and exit -q : suppress non-error messages during configuration testing >-s signal : send signal to a master process: stop, quit, reopen, reload -p prefix : set prefix >path (default: /usr/local/Cellar/nginx/1.10.1/) -c filename : set configuration file (default: >/usr/local/etc/nginx/nginx.conf) -g directives : set global directives out of configuration >file
>7.卸载nginx
>
>
>brew uninstall nginx
>
>
>作者：sxtra
>链接：http://www.jianshu.com/p/026d67cc6cb1
>來源：简书
>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
>
>
>
>
>
>3.  转发配置
>
>server {
>                listen       8081;
>                #server_name  localhost;
>
>                #access_log   logs/localhost.access.log  main;
>
>                location ~ \.json {
>                    proxy_pass 转发接口地址;
>                }
>
>                location / {
>                    root  本地文件地址;
>                    index  login.html index.html;
>                }
>
>}
>
>
>4.
>brew services start nginx 启动命令
>
>ps aux|grep ‘nginx' 看进程命令
>
>nginx -s reload  重启命令
>
>nginx -s stop  停止命令
>
>
>5.遇到的问题就是
>server配置的时候注意{}配对
>当nginx.conf 读取失败时会读取nginx.conf.default
>
>页面访问的接口要改成http://127.0.0.1:8081/
>页面访问时要改成127.0.0.1：8081


