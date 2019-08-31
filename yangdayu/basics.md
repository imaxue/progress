#### 常用网络命令

* ping IP/域名

	用来测试两个主机之间的连通性。
	
* ipconfig / ifconfig

	查看当前计算机系统的ip配置协议情况。

* arp 查看本机的地址映射表
* netstat 查看正在访问的某个服务器ip和端口信息


	
	
##### 网络

* 物理层

	主要功能： 提供透明的比特流传输<br/>
	注意：1. 封装好的数据以‘0，1’比特流的形式进行传递，从一个地方搬到另一个地方；<br/>
	2.物理层上的传输，从不关心比特流里面携带的信息，只关心比特流的正确搬运。<br/>
	数据传输：信号（模拟信号、数字信号）<br/>
	物理带宽：传输过程中振幅不会明显衰减的频率范围（单位：赫兹），取决于介质材料的构成、厚度、长度。<br/>
	数字带宽：单位时间内流经的信息总量（单位：赫兹）

* 数据链路层

	主要功能：提供有效的、可靠地帧传输。<br/>
	成帧方法：字符计数法、字节填充的标记字节法、比特填充的标记比特法、物理层编码违例法

* 网络层

	主要功能：将源端数据包（分组）-> 传送到目的机<br/>
	主要内容：IP协议：IP地址、IP分组、IPv6；路由选择协议：距离适量路由（选择协议）、链路状态路由（选择协议）；ARP....<br/>
	IP: internet Protocal 互联网协议是协议栈核心之一；其提供一种尽力而为地把数据从源传输到接收方的方法。
	

* 传输层

	主要功能：负责把数据送达到具体的应用进程。

* 应用层

	主要应用：为模型外的用户服务、提供各式各样、丰富、变化无穷的应用。<br/>
	DNS：Domain Name System，域名系统，主要作用是将域名映射到资源记录上；<br/>
	web: 由三部分构成：1.资源 2.统一资源定位符（协议、服务器域名或IP地址、资源文件）3.通信协议HTTP；


> 用户点击链接后所发生的事件

	1 浏览器分析超链接指向页面的URL。
	2 浏览器向本地DNS服务器发送 DNS请求 解析 www.bjtu.edu.cn 的IP地址
	3 域名系统DNS解析出服务器的ip地址
	4 浏览器与此ip的 web服务器建立 TCP 连接。
	5 浏览器（发送HTTP请求）发出取文件命令： GET /xnld/index.html
	6 服务器给出响应，把文件index.htm 发给浏览器。
	7 TCP 连接释放。
	8 浏览器显示文件 index.html 中的所有文本。

> 非对称秘钥加密（公钥加密）

	明文 --加密算法（公开密钥）--> 密文（网络通信） --揭秘算法（私有秘钥）--> 明文
	哈希算法：MD5、SHA-1、SHA-256、SHA-384（检测数据是否被篡改）

> HTTPS协议

	HTTP + SSL/TLS 即HTTP下加入SSL层，HTTPS的安全基础是SSL。
	SSL（安全套接字层），为数据通讯提供安全支持。
	SSL的工作原理：对称加密、非对称加密、数字签名、哈希函数、数字证书
	
	
	
### 数据结构与算法

+ 数据结构

> 带 **结构** 的数据元素的集合,简言之，数据元素和其相互关系称为数据结构。<br/>
其包括四部分： 数据元素data、数据元素之间的逻辑关系logic、逻辑关系在计算机中的存储表示storage、所规定的操作operation（查找、插入、删除、遍历、排序）

+ 逻辑结构

> 1. 线性结构<br/>
2. 树形结构<br/>
3. 图形结构（关系结构）<br/>
4. 集合结构（分散结构）
	
- 存储结构

> 1 逻辑结构（算法分析与设计）<br/>
> 2 存储结构（算法实现）

	a.顺序存储 （数组）
	b.链式存储 （借助地址元素的指针存放数据元素）
	
	
	
+ 算法复杂性分析

> 算法复杂性是算法运行所需的计算机资源的量：需要的时间资源的量称为时间复杂度；需要空间资源的量称为空间复杂度。（这两者取决于问题的规模N、算法的输入I、算法本身的函数）
	
	时间复杂度： T = T(N,I)  与算法语句执行次数成正比T(n)
							f(n) = O(g(n))   O 表示 f(n) <= g(n)
									o		 o 表示 f(n) < g(n)
									
							复杂度比较：log n < n < n * log n < n**2 < 2**n
										对数 = 对数 < 指数
	空间复杂度： S = S(N,I)
	
+ 线性表：n个同类型数据元素对的有限序列（L = (a1,a2,a3...,an)）
	
		例：两个非递减序列表，合并为一个非递减序列
		list_merge(La,Lb,Lc) {
			int i=1,j=1,k=1;
			int n = la.size, m = lb.size
			while(i<=n && j<=m) {
				if(la[i] < lb[j]){lc[k] = la[i]; i++}
				else{lc[k]= lb[j]; j++}
				k++
			}
			// 当遗留a未处理完时
			while(i <= n){
				lc[k] = la[i]; i++; k++
			}
			// 当遗留b未处理完
			while(j <= m) {
				lc[k] = la[j]; j++; k++
			}
		}
		
> 栈与队列是限定插入和删除只能在表的‘端点’进行的线性表。<br/>
> 栈：插入、删除限定在一端进行的线性表。（先进后出）<br/>
> 队列：插入限定在一端，删除在另一端进行的线性表。（先进先出）

+ 递归

	子程序（或函数）直接调用自己或通过一系列调用语句间接调用自己，称为递归
	
		int fact(int n){
		 if (n == 0) return 1;
		 else return n * fact(n - 1);
		}
		
		n! = n*(n - 1) * (n-2) *...* 1;
		非递归算法
		尾递归
		int fact(int n){
			int f = n;
			while(--n >= 1) f*= n;
			return f;
		}


	
+ 结构化查询语言 sql（Structure Query Language）

	SQL支持的关系数据库的三级模式结构：外模式（视图、基本表）、模式（基本表）、内模式（储存文件）
	
		无条件查询
		SELECT SN (AS) Name, Age FROM S
		条件查询
		SELECT SNo,Score FROM SC WHERE CNo='C1'
		SELECT SNo,CNo,Score FROM SC WHERE (CNo='C1' OR CNo='C2') AND (Score >= 85)
		SELECT SNo,CNo,Score FROM SC WHERE Sal BETWEEN 1000 AND 1500
		SELECT SNo,CNo,Score FROM SC WHERE Sal NOT BETWEEN 1000 AND 1500
		SELECT SNo,CNo,Score FROM SC WHERE CNo IN(C1,C2) CNo为C1或C2
		SELECT SNo,CNo,Score FROM SC WHERE CNo=C1 OR CNo= C2 CNo为C1或C2
		SELECT SNo,CNo,Score FROM SC WHERE CNo NOT IN(C1,C2)
		模糊查询
		SELECT SNo,CNo,Score FROM SC WHERE TN LIKE '张%'    % 代表0个或多个字符
		SELECT SNo,CNo,Score FROM SC WHERE TN LIKE '_力%'   _ 表示一个字符
		函数及统计查询
		AVG 按列计算平均值
		SUM 按列计算值得总和
		MAX	求一列中的最大
		MIN 
		COUNT 按列值计个数
		SELECT SUM(Score) AS TotalScore,AVG(Score) AS AvgScore FROM SC WHERE SNo='S1'	
		分组查询 ...GROUP BY... / ...GROUP BY...HAVING... 
		SELECT TNo,CONUT(*) AS C_Num FROM TC GROUP BY TNo
	    SELECT TNo,CONUT(*) AS C_Num FROM TC GROUP BY TNo HAVING (COUNT(*)>=2)
	    降序排列 ...WHERE...ORDER BY...默认升序(...DESC 降序)
	    连接查询结构 利用JOIN进行连接，应有ON与之对应(ON 条件)
	    外连接查询：符合条件的直接返回到结果中，不符合的列直接填上NULL返回到结果中
	    	SELECT S.No,SN,CN,Score 
	    	FROM S 
	    	LEFT OUTER JOIN C 
	    	ON C.CNo=SC.CNo
	    	LEFT OUTER JOIN SC 
	    	ON S.SNo = SC.SNo
	    
		多表查询
		SELECT T.TNo,TN,CNo FROM T,TC WHERE (T.TNo=TC.TNo) AND (TN='刘伟')
		合并查询 UNION 会自动将重复的数据删除
		SELECT SNo,SUM(Score) FROM SC WHERE (SNo='S1') GROUP BY SNo UNION SELECT SNo FROM SC WHERE (SNo = 'S5') GROUP BY SNo
		查询结果存到表中 SELECT...INTO...FROM...
		SELLECT SNo INTO Cal_Table FROM SC GROUP BY SNo

	
