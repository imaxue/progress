# 一.构建项目前的准备工作

## 1.安装node.js环境

Node.js官网：<https://nodejs.org/en/>

进入Node.js官网，选择下载并安装Node.js。安装过程只需要点击“下一步”即可，

如下图，非常简单。

### 检验是否安装成功  

```
node -v  
```

npm包管理器是集成在Node.js中了，所以在安装Node.js的时候就已经自带了npm。 输入npm -v可得到npm的版本 


```
npm -v
```

**注意npm的版本需要在3.0.0以上版本，所以，如果npm的版本小于3.0.0,输入以下命令更新npm至最新版本。**

**npm -g install npm**

## 2，安装cnpm

建议使用npm的国内淘宝镜像cnpm 命令行工具代替默认的npm。

在命令行中输入以下内容等待安装

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```



## 3，cpnm全局安装vue-cli

在命令行中运行以下命令然后等待安装

```
cnpm install -g vue-cli
```



# 二.项目构建

1.新建项目,在想要创建目录的地址下命令行输入下面的命令

```
vue init webpack my-vue-project
```

vue  init  webpack  后面是项目名称my-vue-project,可更改

## 三.安装依赖

1. 相关三方插件的引入（vuex、axios、element-ui、sass）

2. 项目的基本配置文件配置

3. 路由管理模块vue-router及菜单权限的配置

4. 状态管理模块vuex的配置

5. 请求模块axios的配置

   

```
# 安装element-ui（基于vue的UI框架）
npm i element-ui -S
# 安装axios(AJAX与后台交互数据)
npm install axios -s
# 安装vuex（基于vue的状态管理模式）
npm install vuex -S
# 安装echarts（图表显示）
npm install echarts --save
```

