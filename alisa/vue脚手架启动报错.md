### vue踩坑-Error: listen EADDRNOTAVAIL 192.168.1.122:8081
每天上班，重启电脑，按照下面的步骤，打开vue的项目，开始编写代码，但是，今天一如往常一般操作：
 * 1：cd /项目名称
 * 下面就是运行项目了，cd /项目名称，我的文件放在D盘，所以先进入d盘，再进入项目。
 * cd D:\code\imsNew\ims1-front

####2：npm run dev

##### 但是，却出现了以下的报错，一开始很郁闷，仔细看了一下错误提示，应该是IP地址出错了。
      
      之前为了能在手机上访问vue的项目，找到config文件夹下的index.js文件，打开后，将host的值改为我本地的ip。
      如何在手机上查看测试vue-cli构建的项目：
<https://www.jianshu.com/p/a15be31cab12>
     
     
## 解决办法：

   * 因为机器重启，DHCP重新分配了IP。重新配置工程绑定当前分配的IP就可以了，或者修改本机的IP为静态IP，问题就解决了。
   
   * 1：打开cmd,命令行运行 ipconfig，得到本机的ip地址：
   * 2：找到config文件夹下的index.js文件，打开后，将host的值改为我上一步所得到的ipv4即可