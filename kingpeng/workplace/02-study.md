### Mac系统查看端口占用和杀死进程

1、查看进程占用
```
lsof -i tcp:8080 
```
该命令会显示占用8080端口的进程，有其 pid ,可以通过pid关掉该进程

2、杀死进程 
```
kill pid
`````

### 修改项目端口号
1、全局安装 http-server
```
npm i http-server -g

sudo http-server -p 80
```
