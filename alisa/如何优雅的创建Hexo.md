---
title: 如何优雅的创建Hexo
copyright: true
date: 2018-09-10 16:42:38
tags: ["Hexo"]
categories: ["Hexo"]

---


## 什么是Hexo

官方的解释是:

Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

## 为什么使用Hexo

先看效果: [我的博客](https://williamlovealisa.cn/) 点击 人图标

> 学习

在搭建的过程中,能够明显感觉到Hexo组件化的架构,高度自由定制化的操作,可以在搭建的过程中学习

> 简单

对于程序员来说,复杂的问题简单化是一个基本技能,也是基本需求

> 多平台,准入低

可以自由的在Mac,Linux,Windows 搭建

托管平台可以选择github, Coding 等很多托管平台

> Markdown 友好型

对于经常编写markdown的人来说,使用一个原生支持markdown的博客框架是一个很Cool的事.

## 准备工作

* 电脑一台 [必须]
* 注册一个代码托管平台(Github,Coding等) [必须]
* 最好拥有一个自己的域名 [可选]

## 环境搭建

### 安装Git环境

* Linux环境

Ubuntu, Debian

`$ sudo apt-get install git-core`

Fedora, Red Hat, CentOS

`$ sudo yum install git-core`

* Mac环境

`$ brew install git`

* Windows(谨慎)

[下载安装,官方](https://git-scm.com/download/win)

[下载并安装,百度云收录](https://github.com/waylau/git-for-win)

### 安装node环境

mac已经安装好node环境

Linux 和 Windows 遵循以下2步:

* 第一步

`$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh`

或者

`$ wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh`

* 第二步

`$ nvm install stable`

如果失败,访问<http://nodejs.org/>下载安装

> Tips:

node一般使用RVM(Node Version Manager) 安装和升级

node的包管理使用的npm(node package Manager) 下载安装package的

### 安装Hexo博客框架

`$ npm install hexo-cli -g`

框架安装成功!

> Hexo需要放到哪里?目录名称叫什么?

mac为例,我需要放到文稿下,创建Hexo目录

`$ cd ~/Documents/ && hexo init Hexo && cd Hexo`

> 开始安装依赖

`$ npm install`

> 查看目录结构

```
.
├── _config.yml --> 配置文件,整体配置
├── package.json  --> 依赖
├── scaffolds   --> 模板,默认3个,可以自己定义
├── source  --> 所有的资源文件
|   ├── _drafts  --> 根据drafts创建的草稿文件
|   └── _posts  --> 根据post模板创建的文件
└── themes --> 主题,重点修改,内部每个主题的_config.yml是具体配置
```

## Hexo 的 Hello World

### 简单配置
Hexo配置文件: `_config.yml`

```
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: WilliamJi's Blog # 站点名称
subtitle: Coder can change world! # 副标题,有些主题不展示...比如Next
description: One minute on the stage needs ten years practice off stage! #自我介绍
keywords: 个人博客 iOS # 关键词
author: William Ji # 作者
email: jxjmdx2009@163.com #你的联系邮箱
language: zh_CN # 语言,支持的语言到主题 themes/landscope/language下找
timezone: Asia/Shanghai # 时区,可不填

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://yoursite.com # 先不修改
root: /
permalink: :year/:month/:day/:title/ # 文章永久的链接格式,可添加.html结尾
permalink_defaults:

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render: # 跳过渲染的文件
  - README.md
  - CNAME

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace:
  
# Home page setting
# path: Root path for your blogs index page. (default = '')
# per_page: Posts displayed per page. (0 = disable pagination)
# order_by: Posts order. (Order by date descending by default)
index_generator:
  path: ''
  per_page: 10
  order_by: -date
  
# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
# 时间格式化类型
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page

# Extensions 主题
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: landscape # 模式人landscape

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
    type: git
    repo:

```

[查看更多设置](https://hexo.io/zh-cn/docs/configuration)

### 查看效果

`$ hexo g && hexo server -p 4000`

> tips:

> hexo g 是generate的意思,将.md文件根据配置文件生成预期的网页

> hexo server 简写为hexo s也可以

> -p 4000是指定端口,默认就是4000,可以直接 `hexo s`


#### 注意命令行里面的提示语:
`Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.`

解释: 如果是远程服务器, localhost必须是具体的远程IP, 注意一定要使用ctrl+C 停止服务器,要不然端口4000就被占用!

解决端口占用的办法有3个:

* 重启终端
* hexo server -p 换个端口
* 查看谁占用: lsof -i :4000 找到占用进程的PID填到后面的命令中 kill -9 PID 结束进程

### 可以不断修改配置`_config.yml`并且查看改动了

启动服务器步骤:

* ctrl + c 关闭进程
* hexo g && hexo s

> tips : 关于命令
> A && B意思是A成功的情况下执行B, A || B 是A失败的情况下执行B, A | B 是将A的输出当做B的输入,(A,B,C)是无论有没有切换上下文(目录),A,B,C都是在同一个上下文(目录)执行


## Hexo 托管

托管就是不仅仅在本地运行,上传到免费的托管平台,其他人也可以访问到

如果拥有远程服务器, `hexo s` 可以直接访问 `ip:4000` 访问


[_config 部署介绍](https://hexo.io/zh-cn/docs/deployment)

### Hexo 托管到Github

大部分人的选择,代码是开源的

#### 安装package

`$ npm install hexo-deployer-git --save`


#### 配置用户名和昵称

将Github的用户名和昵称配上

`$ git config --global user.name "Your user.name"`

`$ git config --global user.email "You user.email"`

#### 配置SSH 秘钥

在Hexo运行的环境上输入命令

`user.email` 输入Github的邮箱地址

`ssh-keygen -t rsa -C user.email`

保存的地址选择 `/root/.ssh/id_rsa` 然后回车

查看id_rsa.pub 的公钥信息

到[Github公钥](https://github.com/settings/keys)中 点击`new ssh key` 添加进去


#### 创建托管仓库

创建名称格式为(user.name).github.io的仓库,
`user.name` 为Github的昵称

#### 修改Hexo配置

在 `_config` 中最后修改

```
deploy:
    type: git
    repo: git@github.com:(name)/(name).github.io.git #括号里面换成自己的用户名和仓库名,去掉括号
    branch: master

```

#### 部署

生成文件并且部署: `hexo g -d`

然后访问 `userName.github.io`,比如我的 <http://JXWilliamJi.github.io>

#### HTTPS

到Github的Setting中 勾选 `Enforce HTTPS`

以后访问 <https://JXWilliamJi.github.io>


### 托管到Coding.net

Github免费账户不支持私有库,如果需要私有仓库必须付费,但是Coding.net免费用户支持私有库!

先去注册账号,<https://coding.net/login>

#### 创建仓库,名称随意

比如创建一个名称为`william`的项目

#### 开启Pages服务

找到`代码->Pages` 然后 点击 `一键开启Pages`

稍后看到如下信息

```
访问地址Fastlane.coding.me/william
部署时间2017-07-12 17:00:40
部署版本b488bfa7b3

```

#### 修改Hexo配置

在 `_config` 中最后修改

```
deploy:
  type: git
  repo: git@git.coding.net:Fastlane/william.git
  branch: master

```

#### 这里有个问题

如果直接`hexo g -d` 看到的是没有样式的网页

一般的解决办法是推荐你买个域名,但是不用这么麻烦

在站点目录下 找到root,将域名后的文本添加上去

```
url: http://yoursite.com
root: /william # 修改这里
permalink: :year/:month/:day/:title/
permalink_defaults:

```

#### 部署公钥

在项目的设置里面找到 `部署公钥`

点击 `新建部署公钥`

将 `id_rsa.pub` 的公钥信息复制进去

#### 重新部署

`hexo g -d`  <https://Fastlane.coding.me/william> 就能访问啦!


### 同时托管两个平台

吃饱了撑的,但是可以做到

修改_config.xml

```
url: http://yoursite.com
root: /william # 修改这里
```

```
# 修改这个
deploy:
- type: git
  repo: git@github.com:(name)/(name).github.io.git #括号里面换成自己的用户名和仓库名,去掉括号
  branch: master
- type: git
  repo: git@github.com:(name)/(name).github.io.git #括号里面换成自己的用户名和仓库名,去掉括号
  branch: master

```

或者换个语法

```
deploy:
	type: git
	repo: github: git@github.com:(name)/(name).github.io.git,master
		  coding: git@github.com:(name)/(name).github.io.git,master

```

#### 配置

和单独配置相同

#### 访问

直接访问 `(name).github.io/william`

或者访问 `Fastlane.coding.me/william`


## 域名

有了博客,最好买个域名,绑定域名更加高大上

### Github:

#### 去自己的域名下添加解析

记录类型为 CNAME 主机记录为 www/@ 线路选择默认，TTL 选择 600，记录值为 github 的仓库名 (name).github.io

主机记录可以选择www/@, www 访问的是`https://www.domain.com`  @ 访问的是 `https://domain.com`

#### 配置Hexo

`cd hexo && touch /source/CNAME`

添加域名`zhangsan.com` 到 `CNAME` 中

重新部署 `hexo g -d`


### Coding.net

方法和上面一样,选一个绑吧…没办法两个都绑


### 结语

现在我们的博客可以使用了… 但是默认的主题不好看!

虽然能用,但是我们需要更加漂亮的外观和炫酷的视觉效果!

后面介绍如何优化以及使用主题


## 参考文档

官方网站 <https://hexo.io/zh-cn/>

部署Coding <https://www.cnblogs.com/tengj/p/5352572.html>