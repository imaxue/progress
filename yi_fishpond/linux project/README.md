# Linux

## Linux简介

### 1.linux发展史

- 内核版本

- 发布版本

![Image text](
https://raw.githubusercontent.com/imaxue/progress/master/yi_fishpond/linux%20project/images/linux%E5%8F%91%E5%B8%83%E7%89%88%E6%9C%AC.png
)
    
### 2.开源原件 

![Image text](
https://raw.githubusercontent.com/imaxue/progress/master/yi_fishpond/linux%20project/images/%E5%BC%80%E6%BA%90%E8%BD%AF%E4%BB%B6.png
)

- 使用的自由

- 研究的自由

- 散步及改良的自由

### 3.Linux应用领域

- 基于Linux的企业服务器

- 在嵌入式额软件的应用

### 4.学习方法

### 5.Linux与Windows的不同

- Linux严格区分大小写

- Linux中所有内容以文件形式保存，包括硬件

- Linux没有扩展名区分文件类型**(靠权限区分)**

    - 压缩包：``"*.gz"``、``"*.bz2"``、``"*.tar.bz2"``、``"*.tgz"``等

    - 二进制软件包：``"*.rpm"``等

    - 网页文件：``"*.html"``、``"*.php"``等

    - 脚本文件：``"*.sh"``等

    - 配置文件：``"*.conf"``等

- Windows下的程序不能直接在Linux中安装和运行

### 6.字符界面的优势

- 占用的系统资源更少

- 减少出错、被攻击的可能性

## 如何在Linux中进行软件安装？

1. 软件包管理简介

+ 源码包

    + 开源

    + 可以自由选择所选功能

    + 软件是编译安装，更适合自己的操作系统，执行效率更高

    + 卸载方便

缺点1安装步骤过多 缺点2编译时间过长 缺点3报错较难解决

+ 二进制包(RPM包、默认系统包)

    + 包管理系统简单，只通过命令就可以实现包的安装、升级、查询和卸载

    + 安装速度比源码包安装快的多

缺点1不可以看到源代码 缺点2功能选择不如源码包灵活 缺点3依赖性

2. rpm命令管理

+ RPM包的来源

+ RPM包命名原则

+ RPM包依赖性

解决模块依赖，查询网站：www.rpmfind.net

+ RPM安装

```
    rpm -ivh 包全名
```

+ RPM升级与卸载

```
    rpm -Uvh 包全名
```

+ RPM包查询与效验

yum中没有rpm包的查询与效验

效验：文件有所修改，验证文件信息内容，文件权限、所有者等是否修改

```
    rpm -q 包全名   //查询
    
    rpm -qa 包全名   //查询所有

    rpm -qi 包名  //查询软件包详细信息

    rpm -ql 包名  //查询包中文件安装位置

    rpm -qf 系统文件名  //查询系统文件属于那个RPM

    rpm -qR 查询依赖性  //查询软件包的依赖性
```

3. yum在线管理

4. 源码包管理

5. 脚本安装包




