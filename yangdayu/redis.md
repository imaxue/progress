> 是一个高性能的key-value数据库
		
* 支持数据持久化   
* 不仅仅是key-value类型的数据，同时还提供list,set,zset,hash等数据结构的存储
* 支持数据备份

安装
	
	sudo apt-get update
	sudo apt-get install redis-server
	
启动

	redis-server
	
查看是否启动

	redis-cli
	
#### 数据类型

String

	 SET name 'redis hello'
	 GET name      // redis hello

> 困困困。。。明天再继续