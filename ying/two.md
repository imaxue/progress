# nginx vue项目的部署 gzip压缩代码
server {
        listen       端口;
        server_name localhost;

        #gzip nginx gzip压缩代码
        gzip on;
        gzip_comp_level 9;
        gzip_types text/plain application/javascript application/x-javascript text/html text/css application/xml text/javascript;

        root 目录路径;

        location / {
             try_files $uri $uri/ @router;
             index index.html;
         }

        location @router {
            rewrite ^.*$ /index.html last;
        }
        location ~ \.json {
            proxy_pass 转发地址
        }
    }

#几个知识点
>1.深度拷贝

>Object.assign({}, row);

>2.
>nextTick 是$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM;
>clearValidate 是清理校验
>因为dom是异步渲染，只能等渲染完才能调用ref上的方法
>this.$nextTick(()=>{
>this.$refs["editForm"].clearValidate();
>});
