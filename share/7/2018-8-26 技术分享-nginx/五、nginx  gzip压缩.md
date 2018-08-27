#五、nginx  gzip压缩
>https://www.cnblogs.com/mitang/p/4477220.html
>
>gzip on;
>gzip_min_length 1k;
>gzip_buffers 4 16k;
>#gzip_http_version 1.0;
>gzip_comp_level 2;
>gzip_types text/plain application/x-javascript text/css application/xml text/javascript >application/x-httpd-php image/jpeg image/gif image/png;
>gzip_vary off;
>gzip_disable "MSIE [1-6]\.";