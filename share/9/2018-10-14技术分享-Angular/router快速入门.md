#### 1、导入路由模块
```
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, RouterModule],
  declarations: [AppComponent, UserComponent, MembersComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
#### 2、配置路由信息

```
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

export const ROUTES: Routes = [
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  // ...
})
export class AppModule {}
```
#### 3、routerLink 指令
- 为了让我们链接到已设置的路由，我们需要使用 routerLink 指令，具体示例如下：
    ```
    <div class="app">	
    	<div class="top">
    		<nav>
    			<h3><a routerLink="/pages/index">首页</a></h3>
    			<h3><a routerLink="/pages/user">我的</a></h3>  
    			<h3><a routerLink="/pages/parent">父页面</a></h3>  
    			<!-- <h3><a routerLink="/pages/child">子页面</a></h3>   -->
    		</nav>
    	</div>
    	<div class="content">
    		<!-- <button nz-button nzType="primary">Button</button> -->
    		<router-outlet></router-outlet>
    	</div>
    </div>
    ```
- 当我们点击以上的任意链接时，页面不会被重新加载。反之，我们的路径将在 URL 地址栏中显示，随后进行后续视图更新，以匹配 routerLink 中设置的值。

#### 4、router-outlet 指令
- 该指令用于告诉 Angular 在哪里加载组件
- 当 Angular 路由匹配到响应路径，并成功找到需要加载的组件时，它将动态创建对应的组件，并将其作为兄弟元素，插入到 router-outlet 元素中；
- 具体示例如下：
    ```
    <div class="app">	
    	<div class="top">
    		<nav>
    			<h3><a routerLink="/pages/index">首页</a></h3>
    			<h3><a routerLink="/pages/user">我的</a></h3>  
    			<h3><a routerLink="/pages/parent">父页面</a></h3>  
    			<!-- <h3><a routerLink="/pages/child">子页面</a></h3>   -->
    		</nav>
    	</div>
    	<div class="content">
    		<!-- <button nz-button nzType="primary">Button</button> -->
    		<router-outlet></router-outlet>
    	</div>
    </div>
    ```
#### 相关链接：
- https://segmentfault.com/a/1190000009733649
- https://segmentfault.com/a/1190000008754631