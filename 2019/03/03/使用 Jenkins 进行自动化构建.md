[TOC]

# 使用 Jenkins 进行自动化构建

## 准备工作：
* CentOS 7.6 的主机一台，并需安装以下软件：
    * Jdk 8
    * Jenkins 2
    * git
    * node.js
* gitlab

## Jenkins 是什么?
Jenkins是一款开源 **CI&CD** 软件，用于自动化各种任务，包括构建、测试和部署软件.

## CI&CD 是什么
### 持续集成

* 持续集成（Continuous Integration）简称CI，持续集成强调开发人员提交了新代码之后，立刻自动的进行构建、（单元）测试。根据测试结果，我们可以确定新代码和原有代码能否正确地集成在一起。
* 持续集成过程中很重视自动化测试验证结果，对可能出现的一些问题进行预警，以保障最终合并的代码没有问题。

### 持续交付

* 持续交付CD（Continuous Delivery）基本概念持续交付在持续集成的基础上，将集成后的代码部署到更贴近真实运行环境的「类生产环境」（production-like environments）中。交付给质量团队或者用户，以供评审。如果评审通过，代码就进入生产阶段。
* 持续交付并不是指软件每一个改动都要尽快部署到产品环境中，它指的是任何的代码修改都可以在任何时候实施部署。

### 持续部署

* 持续部署（Continuous Deployment）是指当交付的代码通过评审之后，自动部署到生产环境中。持续部署是持续交付的最高阶段。
* 持续部署是自动的持续部署是持续交付的最高阶段。
* 持续交付与持续部署的关系有时候会混淆。持续部署意味着所有的变更都会被自动部署到生产环境中。持续交付意味着所有的变更都可以被部署到生产环境中，但是出于业务考虑，可以选择不部署。如果要实施持续部署，必须先实施持续交付。持续交付表示的是一种能力，而持续部署则是一种方式。


## 安装 Jenkins 
略，参考另一篇笔记：
[CentOS 安装 Jenkins](https://github.com/imaxue/progress/blob/master/axue/jenkins/CentOS%20%E5%AE%89%E8%A3%85%20Jenkins.md)

## 安装 git
```shell
# yum install git
```

## 配置 Jenkins
### 安装插件
* Build Authorization Token Root
* GitLab Plugin

插件安装完成后，重启 Jenkins



### 配置 gitlab 触发 Jenkins 构建
1. 在 Web 中打开 Jenkins 的配置页面
2. 选择“新建任务”
![新建任务](http://cdn.imaxue.com/WX20190331-173247.png)
3. 填写任务名称，选择“构建一个自由风格的软件项目”
![新建任务](http://cdn.imaxue.com/WX20190331-173435.png)
4. 添加 git 仓库，输入仓库地址并点击添加凭证
![添加仓库](http://cdn.imaxue.com/WX20190331-175724.png)
5. 添加凭证，这里的凭证就是可以访问到 git 仓库的账号密码
![](http://cdn.imaxue.com/WX20190331-175812.png)
6. 配置触发器，选择 **“Build when a change is pushed to GitLab. ”** 选项，并记录**GitLab webhook URL**的内容
![](http://cdn.imaxue.com/WX20190331-195546.png)
7. 点击高级按钮
![](http://cdn.imaxue.com/WX20190331-200345.png)
8. 生成 **Secret token**
![](http://cdn.imaxue.com/WX20190331-200428.png)
9. 在gitlab 的项目中，打开“Integrations”菜单
![](http://cdn.imaxue.com/WX20190331-200720.png)
10. 将 Jenkins中的**GitLab webhook URL** 和 **Secret token** 填入
![](http://cdn.imaxue.com/WX20190331-201040.png)
11. 进行测试
打开 **Test** 菜单，选择 Push events，即表示进行一次推送事件测试。
![](http://cdn.imaxue.com/WX20190331-201437.png)
当看到顶部出现下面的图片时，表示配置成功。
![](http://cdn.imaxue.com/WX20190331-201726.png)
同时会在 Jenkins 的项目中，看到如下信息，表示刚刚完成了一次构建。
![](http://cdn.imaxue.com/WX20190331-202024.png)
13. 但是刚只是完成了一次空白构建，还需要配置构建时要执行的操作。
点击“增加构建步骤”选择“执行 shell”
![](http://cdn.imaxue.com/WX20190331-202308.png)
14. 添加构建时要执行的操作
![](http://cdn.imaxue.com/WX20190331-202340.png)

## 结束总结
通过上面的步骤，完成了通过推送代码到 gitlab 时，由 gitlab 触发 Jenkins 完成自动构建的操作流程。
这样可以节省我们每次提交完代码，还要手动部署