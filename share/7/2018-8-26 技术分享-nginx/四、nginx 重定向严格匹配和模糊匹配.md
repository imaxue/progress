#四、nginx 重定向严格匹配和模糊匹配
>严格匹配(只能有hello)
```javascript
location ~ /hello$ {
rewrite ^.*$ https://www.baidu.com/;
}
```
>模糊匹配(含有hello即可)
```javascript
location ~ /hello {
rewrite ^.*$ https://www.baidu.com/;
}
```