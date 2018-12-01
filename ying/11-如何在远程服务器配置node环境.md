1.先到目标服务器查看一下服务器的版本
uname -a

Linux iZ2zei3f3aqcugt55xjawxZ 2.6.32-573.22.1.el6.x86_64 #1 SMP Wed Mar 23 03:35:39 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux

2.将node官网上对应的版本下载到本地

3.传输到远程目录的/home目录下，也就是远程电脑的根目录

4.在远程电脑上将下载下来的...tar.xz解压
先 xz -d xxx.tar.xz 将 xxx.tar.xz解压成 xxx.tar 然后，再用 tar xvf node-v8.11.4-linux-x64.tar 来解包

5.然后进入解压包目录 ./node就可以启动

6.在/bin目录下建立全局关系 cd /bin
ln -s /home/node-v8.11.4-linux-x64/bin/node node

7.node中 node-v8.11.4-linux-x64/bin/ 下一般是含有npm的软连接
就直接可以ln -s /home/node-v8.11.4-linux-x64/bin/npm npm

备注： 一般linux电脑上面会集成 yum或者apt 等包管理工具 ，但是用yum 和apt安装的包可能比较老