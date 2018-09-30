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
> 字符串是Redis的基础类型，值可以使任何类型的字符串（当key存在时，SET会失败）

	 SET name 'redis hello'
	 GET name      // redis hello

> 原子递增：

	set counter 100  // ok
	incr counter      // (integer) 101
	incr counter   	 // (integer)  102
	incrby counter 50  // (integer) 152
	
> INCR 命令将字符串值解析成整形，将其加1，最后将结果保存为新的字符串，类似的命令有 INCRBR，DECR和DECRBY。

> 为减少等待时间，也可以一次存储或获取多个key对应的值，使用MSET和MGET命令：

	mset a 10 b 20 c 30  // ok
	mget a b c  // ['10', '20', '30']
	
> EXISTS 命令返回1 或 0标识给定的key的值是否存在，使用DEL命令可以删除key对应的值，返回0或1标识被删除或没被删除

	set mykey hello
	exists mykey 	// 1
	del mykey 		// 1
	exists mykey	// 0
	
> TYPE 命令可以返回key对应的值得存储类型：

	set mykey x  	
	type mykey  	// string
	del mykey 		// 1
	type mykey		// none
	
> 超时：EXPIRE来设置超时时间，PERSIST命令去除超时时间,TTL命令查看key对应的值得剩余时间

	set key 100 ex 10
	ttl key			// 9