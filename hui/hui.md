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
简单的获取页面数据 数据处理逻辑 自己想要什么就去改