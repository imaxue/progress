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


**String**
> 字符串是Redis的基础类型，值可以使任何类型的字符串（当key存在时，SET会失败）

	 SET name 'redis hello'
	 GET name      // redis hello

> 原子递增：

	set counter 100  // ok
	incr counter      // (integer) 101
	incr counter   	 // (integer)  102
	incrby counter 50  // (integer) 152 加50
	decr counter		// (integer) 151
	decrby counter 30 	// 121
	append counter 5 	// '1213' 表示在counter后面追加 ‘5’字符串
	
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

**Hash**

> hash是一个string类型的field和value的映射表，适合于存储对象，每个hash可以存储2的32次方 - 1键值对

	hset myhash username jack
	hget myhash username		// 'jack'
	hmset myhash2 username rose age 21  // 设置多个
	hmget myhash2 username age		// 'rose' '21'
	hgetall myhash2  // 'username'  'jack' 'age' '21' 获取所有的属性和值
	hdel myhash2 username age	// 删除多个属性
	del myhash2 	// 删除整个myhash2
	hincry myhash age 5  // age 加 5
	hexists myhash username		// 判断username 是否存在
	hlen myhash 	// 查看myhash有几个属性
	hkeys myhash 	// 得到所有的属性
	hvals myhash 	// 得到所有的值
	
	
**List**

> list是简单字符串列表，按照插入顺序排序，可插入头部或尾部，一个列表最多可包含2的32次-1个元素

存储list

* ArrayList使用数组方式
* LinkedList使用双向链接方式
* 双向链表中增加数据
* 双效链表中删除数据

> 常用命令
	
	lpush mylist a b c 		// 从左侧添加
	rpush mylist 1 2 3		// 从右侧添加
	lrange mylist <start> <end>		// 查看列表 lrange mylist 1 -2
	lpop mylist 			// 从左侧弹出（删除）一个元素
	rpop mylist 			// 从右侧弹出（删除）
	llen mylist				// 获取元素的个数
	lpushx mylist			// 从左侧插入一个元素
	rpushx mylist			// 从右侧插入一个元素
	rrem mylist 2 a			// 从右开始删除2个a
	rrem mylist -2 a		// 反方向删除2个a
	rrem mylist 0 a 		// 删除所有a
	lset mylist 3 mmm		// 插入第三个地方，插入mmm
	linsert mylist after b 22 	// 在b之后插入22
	linsert mylist before b 11 // 在b之前插入11
	rpoplpush mylist5 mylist6	// 把mylist5的一个弹出，压入到mylist6

**Set 集合**

> Set是string类型的无序集合。集合成员是唯一的，集合中不能出现重复的数据。

常用命令

* 添加删除元素
* 获得集合中的元素
* 集合中的差集运算
* 集合中的交集运算
* 集合中的并集运算

		sadd myset a b c	// 3
		sadd myset a 		// 0
		sadd myset 1 2 3	// 
		smembers myset		// a b c 1 2 3 查看所有成员
		srem myset 1 2 		// 删除 1 2 
		sismember myset a	// 1	查看是否存在a
		sadd mya1 a b c
		sadd myb1 a c 1 2 	
		sdiff mya1 myb1		// 'b' 	查看mya1与mya2的不同点（针对mya1）
		sinter mya1 myb1	// 'a' 'c' 取mya1、mya2的交集
		sunion mya1 myb1	// 'a' 'b' 'c' '1 ' '2' 取mya1 mya2的并集
		scard myset 		// 4 获得具体数量
		srandmember myset	// 'b' 随机返回一个成员
		sdiffstore my1 mya1 myb1	// 取mya1、mya2的diff，存到my1上
		smembers my1		// 'b'
		sinterstore my2 mya2 myb2	// 取mya2、myb2的交集，存到my2上
		sunionstore my3 mya3 myb3	// 取mya3 myb3的并集，存到my3上
		
	
**Sorted Set 有序集合**

> sorted Set 和 set 一样也是string类型元素的集合，且不允许重复的成员；不同的是：每个元素都会关联一个double类型的分数。redis正是通过分数来为集合的成员进行从小到大的排序；有序集合的成员是惟一的，但分数确实可以重复的。

常用命令

* 添加元素
* 获得元素
* 删除元素
* 范围查询
* 扩展命令

		zadd mysort 70 zs 80 ls 90 ww	// 3
		zadd mysort 100 zs				// 会用zs的100覆盖70
		zscore mysort zs				// '100' 查看zs的分数
		zcard mysort					// 3 查看mysort的元素个数
		zrem mysort ww					// 删除ww
		zcard mysort					// 2
		zadd mysort 85 jack 95 rose		//
		zrange mysort 0 -1				// ‘zs’ 'ls' 'jack' 'rose' 查看从0到-1的所有元素
		zrange mysort 0 -1 withscores	// 顺带显示分数和元素 （从小到大排序）
		zrevrange mysort 0 -1 withscores // 显示分数和元素 （从大到小排序）
		zrangebyscore mysort 0 100 		  // 显示score为0到100的元素
		zrangebyscore mysort 0 100 withscores limit 0 2  // 只显示score为0到100的元素2		个
		zscore mysort ls 					// 显示最大值
		zcount mysort 80 90					// 显示score为80到90之间的元素
		
		
###### keys的通用操作

		kyes *				// 展示所有的keys
		keys my?			// 展示以my开始的keys
		del my1 my2			// 删除keys
		exists mya1			// 查看是否存在
		get <string>		// 获取某字符串的key
		exists mya1			// 是否存在
		rename company new company	// 重命名
		get company			// nil	已经被重命名
		get newcompany		// 'lizai'
		expire newcompany 1000 // 设置过期时间
		ttl newcompany		// 获取剩余时间
		type mylist			// 'list' 显示类型
		
###### 数据库切换

> 最多有15个数据库，默认指向0

		select 1 			// 切换到数据库1
		keys *				// empty list or set
		select 0 			// 切回数据库0
		move myset 1		// 将myset移至数据库1
		select 1			
		keys * 				// 'myset'
		type myset			// set
		select 0
		
##### 事务

> 事务可以一次执行多个命令；分开始事务、命令入队、执行事务；

* 批量操作在发送EXEC命令前被放入队列缓存
* 收到EXEC命令后进入事务执行，事务中任意命令执行失败，其余命令依然被执行
* 在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中

> 以MULTI开始一个事务，然后将多个命令入队到事务中，最后由EXEC命令触发事务，一并执行事务中的所有命令

	set num 1
	multi					// 打开一个事务
	incr num				// 输入命令，放进要执行的队列中
	incr num
	exec					// 开始执行事务
	get num 				// '3'
	discard					// 撤销此次事务（回滚）