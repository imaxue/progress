- 添加repository
```bash
sudo yum install epel-release
```
- 安装
```bash
sudo yum install nginx
```

- 启动
```bash
sudo systemctl start nginx
# 或者 service nginx start
```

- 修改配置
```bash
# /etc/nginx
vi nginx.conf
```
- 重启服务
```bash
# 先验证一下配置是否正确
nginx -t
# 重启命令
nginx -s reload
```