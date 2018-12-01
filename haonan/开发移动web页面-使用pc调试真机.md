# VIDE
想要PC端调试真机网页，需要给大家安利一款软件[VIDE](https://www.debuggap.com/zh-cn/)。其实这货原名叫DeBugGap IDE，这个应该很多人都听过，不知道作者后来为什么改名了。

# PC准备工作
1. 首先需要先[下载软件](https://www.debuggap.com/download/1.0.2/windows)
![启动软件](http://upload-images.jianshu.io/upload_images/10506000-9ae7183db666ab19..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 修改语言
**Preferences->IDE Setting->Language->简体中文**
3. 安装vide-plugin-debug-webview插件
想要增加调试功能，需要往这个IDE中添加调试插件：
![打开插件管理](http://upload-images.jianshu.io/upload_images/10506000-ce2cb5c0984554e8..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![搜索插件](http://upload-images.jianshu.io/upload_images/10506000-618f1f72239771b5..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![安装完成](http://upload-images.jianshu.io/upload_images/10506000-cf21b2a9097ce579..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 开启服务
点击蓝色的小图标后，编辑器会为你开启一个服务，IP是本机IP，端口为11111
![建立连接](http://upload-images.jianshu.io/upload_images/10506000-c449a04cf5341fd4..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 项目准备工作
+ 引用debuggap.js
要想调试，还需要在项目中引入一个js文件，这个文件需要在项目文件夹的**node_modules/vide-plugin-debug-webview**路径中获取。将文件放入需要调试的网页文件中并引用

# 手机准备工作
1. 连接服务
开启php服务（IDE提供的只是调试的服务，php的服务也要开启哦，不然无法访问网页）。打开手机，输入本机IP地址链接网页，我们会看到网页上面有一个蓝色的图标，点击蓝色图标
![点击图标](http://upload-images.jianshu.io/upload_images/10506000-1c7f40ca7ae84a44..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![打开设置](http://upload-images.jianshu.io/upload_images/10506000-d9eb5e389b87964f..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![与PC端连接](http://upload-images.jianshu.io/upload_images/10506000-f273ae3854955ede..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 大功告成
手机点击按钮与PC建立连接后，我们回到IDE，此时IDE会给我们提示手机的连接请求
![连接请求](http://upload-images.jianshu.io/upload_images/10506000-88012c5fc7c43734..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
连接成功！尽情的调试吧！
![成功效果](http://upload-images.jianshu.io/upload_images/10506000-f1d6e00ca6e0d8c1..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 注意点
如果你的电脑开启了防火墙，那么要记得将vide这个软件设为允许连接，不然的话会出现无法连接的情况。具体开启路径在**控制面板\系统和安全\Windows 防火墙\允许的应用**，找到vide，在最前面挑上勾就可以了
