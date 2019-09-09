## Redis安装
> 需要gcc环境支持

### 下载压缩包、解压并安装
```bash
#下载
weget http://download.redis.io/releases/redis-5.0.5.tar.gz
# 解压
tar -zxvf redis-5.0.5.tar.gz
# 进入解压后的目录进行编译
cd ./redis-5.0.5
make PREFIX=/usr/local/redis/ install

#安装完成之后进入安装目录
cd /usr/local/redis/

#复制解压目录下的redis.conf配置文件
cp xxx/redis-5.0.5/redis.conf ./redis.conf

#运行
./bin/redis-server

# 后台运行redis服务
# 编辑redis.conf文件 将 daemonize no 改为 daemonize yes 并保存
./bin/redis-server ./redis.conf
# 查看是否启动成功
ps -ef | grep redis

# 启动redis-cli
./bin/redis-cli

# 停止redis服务
./bin/redis-cli shutdown
ps -ef | grep redis
```