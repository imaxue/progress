### 基础要求
- nodejs
- git
### Angular 开发环境配置方式
- 基于Angular Quickstart
- 基于Angular CLI

### 基于 Angular CLI
##### 下载nodejs
##### 安装Angular的cli命令行工具
- 命令：sudo npm install -g @angular/cli
- 输入ng -v，如出现以下画面即表示安装成功
##### 创建项目
- 命令：ng new XXX,XXX表示项目名称，如：ng new iAngular
##### 启动项目
- 在项目根目录下执行npm start命令

##### 目录结构解析
- 官方文档：https://www.angular.cn/guide/quickstart

### 基于Angular Quickstart（很少用）
- 使用 Git 克隆 quickstart 项目

```
git clone https://github.com/angular/quickstart ng4-quickstart
```

- 使用 IDE 打开已新建的项目 (本教程使用的 IDE 是 Visual Studio Code)

```
code ./ng4-quickstart
```

- 安装项目所需依赖

```
npm i
```

- 验证环境是否搭建成功

```
npm start
```
