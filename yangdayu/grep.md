grep命令
	
**grep** 是一种强大的文本搜索工具，使用正则可匹配一或多的文件内容（单词、字符、句子等），并打印出来。对调试非常方便
	
*这次只记录些会经常用到的~*

##### 在文件中查找单词
	
* 在一个文件中匹配
	
	> grep [somewords] ./src/xxx.js
	
* 在多个文件中匹配

	> grep [somewords] ./src/xxx.js ./src/yyy.js
	
* 列出匹配内容的文件

	> grep -l [somewords] ./src/xxx.js yyy.js zzz.js
	
* 显示匹配内容的文件相应的行号

	> grep -n [somewords] ./src/xxx.js ./src/yyy.js

* 匹配内容可为正则,如以namewords开头的部分

	> grep ^somewords ./src/xxx.js
	
* 使用递归查找在某以文件夹下

	> grep -r [somewords] ./src/
	
* 在查找中忽略大小写

	> grep -i [somewords] ./src/xxx.js
	
* 使用参数匹配出内容的前后x行内容

	_-A 4:后4行； -B 4:前四行 -C 4:前后各4行_

	> grep -B 4 [somewords] ./src/xxx.js
	
----------------------------------------
