#### anrular4项目中NG-ZORRO的使用方式

#### 方式一：npm下载node依赖包
- 安装NG-ZORRO
    ```
    npm install ng-zorro-antd --save
    npm install ng-zorro-antd@0.5 --save

    ```
- 引入模块
  - 修改app.module.ts，将NgZorroAntdModule给import进来，只需要添加两行即可。
    ```
    [root@angular app]# cat app.module.ts 
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { NgZorroAntdModule } from 'ng-zorro-antd';
    import { AppComponent } from './app.component';
    
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        NgZorroAntdModule.forRoot()
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule 
    ```
- 引入样式
  - 0.5x版本无需此操作；
  - 修改 .angular-cli.json 文件的 styles 列表
    ```
    ...
      "styles": [
        "../node_modules/ng-zorro-antd/src/ng-zorro-antd.less"
      ]
    ...
    ```
- HTML模板中直接使用即可
  - 修改app.component.html
    ```
    <button nz-button [nzType]="'primary'">primary</button>
    <button nz-button [nzType]="'dashed'">dashed</button>
    ```

- 官网链接：
  - https://ng.ant.design/version/0.7.x/docs/getting-started/zh

#### 方式二：手动下载ng-zorro文件
- 1、从github上下载源码；
- 2、把源码文件放在项目目录中，如src/app/ngdesign
- 3、源码就是一个大的module模块，把它看做一个自定义模块在根模块中引入即可；
- 4、根模块中引入配置
    ```
    import { NgZorroAntdModule } from './ngdesign/ng-zorro-antd.module';
    
    @NgModule({
      bootstrap: [App],
      declarations: [
        App
      ],
      imports: [ // import Angular's modules
        BrowserAnimationsModule,
        BrowserModule,
        NgZorroAntdModule.forRoot({extraFontName:'anticon',extraFontUrl:'../assets/iconfont/iconfont'}),
      ],
      providers: [ 
        APP_PROVIDERS
      ]
    })
    ```

#### 两种方式的比较
- 方式一使用简单规范
- UI库不能满足需求需要修改源码时不好处理；