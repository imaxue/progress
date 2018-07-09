# 老黄的笔记

#### 简单的爬虫页面

```
import http from 'http'
import zlib from 'zlib'


var url = 'http://www.bilibili.com/video/game.html';
http.get(url,function(res){
    const chunks = [];
    const size = 0;
    res.on('data',function(data){
        chunks.push(data);
        size += data.lenght;
    });
    res.on('end',function(){
        const buf = Buffer.concat(chunks,size);
        const newbuf = zlib.gunzipSyunc(buf);
        console.log(newbuf.toString())
    })
}).on('error',function(){
    console.log('error')
})
```
> 简单的获取页面数据  数据处理逻辑 自己想要什么就去改

#### 补充 内容 链接服务器 两种方式（ssh和sftp） 获取和上传 

> 如果是用图形界面的就不用看了 我这里介绍的是用命令行的方式 主要是出于锻炼自己的目的才使用的（个人建议还是使用图形界面）


> ssh

```
//链接服务器
ssh root@serverip 

//输入你的服务器密码
root@serverip password:

//找到你需要下载的文件或者目录  这里介绍一下ssh的find方法
find ./ -name router  
//find（查找） ./（从根目录开始查） -name（已名字为查找项） router（你所找的文件名 可以不全）

//找到文件后 获取一下它的路径
pwd

//ssh 的拉取文件到本地 这里你需要再开一个进程 此进程要在你本地运行 
scp root@serverip:你pwd获取到的地址 ./
//scp 拷贝 root@serverip:你pwd获取到的地址 服务器上你想获取文件的地址 ./这是你想拷贝到本机的位置

//ssh 推送本地文件到服务器 （与拉取相反就行了）
scp 要推送的文件 root@ip地址:/路径


```

> sftp

```
//链接服务器
sftp root@serverip

//输入你的服务器密码
root@serverip password:

//移动到文件所在地 获取你所需要的文件
get router.js
// 注意 你get获取的文件  文件位置 会在你此进程所在的位置  比如我在./进入的服务器 那么get的文件就会在本机./下 如果在Downloads目录下 那么get文件就会在Downloads文件下

//推送文件
put router.js
//put 提交文件 提交文件的时候 他会搜索你本机所在文件目录有没有这个文件 例如我在./下 他就会搜索本机./目录下router.js 

//最后 exit 退出
exit


```

> 刚刚看到有人分享kill进程方法  这里推荐一个懒人方法


```
//杀死所有node进程 你起的其他node进程也会被杀死 起多个进程的项目 不推荐使用 单个进程少量进程的可以 免去查找进程这一步骤
pkill -9 node 

```
