#### 应用 Angular CLI初始化项目
- 1、安装Angular的cli命令行工具
  - 命令：sudo npm install -g @angular/cli
  - 输入ng -v，如出现以下画面即表示安装成功
- 2、创建项目
  - 命令：ng new XXX,XXX表示项目名称，如：ng new iAngular
  - ng new iAngular --skip-install
  - 默认为 false, 表示跳过 npm install
- 3、启动项目
  - 在项目根目录下执行npm start命令
  - 或者ng serve --port 4201 启动服务在指定的端口号；
- 4、目录结构解析
  - 官方文档：https://www.angular.cn/guide/quickstart

#### 开发过程中可继续使用angular-cli
- 1、通过angular-cli指令新建组件component，能提高效率；
- 2、常用命令：
    ```
    //创建Component 
    ng g component my-new-component
    
    //创建Directive 
    ng g directive my-new-directive
    
    //创建pipe
    ng g pipe my-new-pipe
    
    //创建Service
    ng g service my-new-service
    
    //创建class
    ng g class my-new-class
    
    //创建guard
    ng g guard my-new-guard
    
    //创建Interface
    ng g interface my-new-interface
    
    //创建Enum
    ng g enum my-new-enum
    
    //创建module
    ng g module my-module
    ```
#### 相关链接：
- https://github.com/angular/angular-cli
- https://segmentfault.com/a/1190000009771946