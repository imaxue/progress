### 创建Buffer对象

> Buffer类是一个可以在任何模块中被利用的全局类，有三种形式的构造函数，第一种是只需将缓存区大小（字节
）指定为构造函数的参数。

	buf = new Buffer(size)
	buf.fill(value, [offset], [end])
	
> 第二种形式的构造函数是直接使用一个数组来初始化缓存区

	buf = new Buffer(array)
	
> 第三种是直接使用一个字符创来初始化缓存区

	new Buffer(str, utf-8)
	
##### Buffer转换方法

* buf.toString([encoding], [start], [end])
* buf.write(string,[offset],[length],[encoding])
* buf.copy(targetBuffer,[targetStart],[sourceStart],[sourceEnd])
* Buffer.isBuffer(obj)
* Buffer.byteLength(a,'utf8')  计算字符串a的字节数
* Buffer.concat(list,[totalLength])
* Buffer.isEncoding(str) 检测str是否为有效编码格式


#### 操作文件系统

> fs模块实现所有有关文件及目录的创建、写入及删除操作。

	var fs = require('fs')
	var data = fs.readFileSync('./index.html','utf8', (err, date) => {})
	
	fs.writeFile(filename,data,[option], callback)
	
	fs.appendFile(filename,data,[options],callback)
	fs.open(filename,flags,[mode],callback)
	
	fs.openSync(filename,flags, [mode])
	fs.read(fd, buffer, offset, length, position, callback)
	fs.write(fd, buffer, offset, length, position, callback)
	fs.close(fd, [callback])
	fs.closeSync(fd, [callback])
	
	//创建目录
	fs.readdir(path, (err, files) = > {
		// files 为一个数组，读取到的所有文件名
	})
	fs.exists(path, (isExists) => {
		// 存在则isExosts是true
	})
	
	fs.realpath(path,[cache],(err, resolvePath) => {
		// 获取文件或目录的绝对路径
	})
	
