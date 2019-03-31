## ng-template

> <ng-template>是一个 Angular 元素，用来渲染 HTML。 它永远不会直接显示出来。Angular 会把 `<ng-template>` 及其内容*替换为*一个注释。



> ```js
> // 模板
> <div>
>   <div>  开始</div>
>   <ng-template >
>     这是 ng-template
>   </ng-template>
>   <div>  结束</div>
> </div>
> 
> // 浏览器渲染以后
> <div _ngcontent-c0="">
>     <div _ngcontent-c0=""> 开始</div>
> 		<!---->
> 	<div _ngcontent-c0=""> 结束</div>
> </div>
> ```
>
>

#### 怎么才能渲染 ng-template 呢？

- 使用 *ngIf

  ```html
  <!--模板-->
  <div *ngIf="false else test">
      真
    </div>
   <ng-template #test>
      <div>假</div>
   </ng-template>
   <!--渲染结果-->
  <!--bindings={
    "ng-reflect-ng-if": "false",
    "ng-reflect-ng-if-else": "[object Object]"
  }-->
  <div _ngcontent-c0="">假</div>
  <!---->
  ```


- 使用 `TemplateRef `得到`<ng-template>` 的内容， 并 通过  `ViewContainerRef` 视图容器 把 视图 插入的容器中**插入的是位置是兄弟节点，不是子节点**

  ```typescript
  import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
  
  @Component({
    selector: 'app-test',
    // templateUrl: './test.component.html',
    template: `
      <ng-template #testTem>
      这是 ng-template
      </ng-template>
    `,
    styleUrls: ['./test.component.css']
  })
  export class TestComponent implements OnInit {
    @ViewChild('testTem') tem: TemplateRef<any>;
    constructor(
      private viewContainer: ViewContainerRef
    ) { }
    ngOnInit() {
      this.viewContainer.createEmbeddedView(this.tem);
    }
  }
  
  // 浏览器渲染后,没有渲染到 app-test 里，渲染到到了外面，这个操作也是有点迷
  <app-test _nghost-c0="">
      <!---->
  </app-test>
   这是 ng-template 
  ```


- ngTemplateOutlet  根据一个提前备好的 `TemplateRef` 插入一个内嵌视图。  

  ```typescript
  import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
  
  @Component({
    selector: 'app-test',
    template: `
    <ng-container *ngTemplateOutlet="greet"></ng-container>
    <hr>
    <ng-container *ngTemplateOutlet="eng; context: myContext"></ng-container>
    <hr>
    <ng-container *ngTemplateOutlet="svk; context: myContext"></ng-container>
    <hr>
    <ng-template #greet><span>Hello</span></ng-template>
    <ng-template #eng let-name><span>Hello {{name}}!</span></ng-template>
    <ng-template #svk let-person="localSk"><span>Ahoj {{person}}!</span></ng-template>
  `,
    styleUrls: ['./test.component.css']
  })
  export class TestComponent implements OnInit {
    myContext = {$implicit: 'World', localSk: 'Svet'};
    constructor(
    ) { }
    ngOnInit() {
    }
  }
  ```



## ng-content

> `<ng-content>` 标签是外来内容的*占位符*。 它告诉 Angular 在哪里插入这些外来内容。 在这里，被投影进去的内容就是来自父组件的 `<app-child>` 标签。
>
> angular 提供两个生命周期钩子来检测 占位符的加载 情况 
>
> **AfterContentInit** 和  **AfterContentChecked**

- 基本用法

```typescript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-content',
  template: `
  <div>
    <ng-content>
    </ng-content>
  </div>
  `,
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}

// 使用
<app-content>
    <div>这是 ng-content</div>
</app-content>

```

- 使用select

  ```typescript
  // 如果设置了 select="" 必须按照规则来渲染 否则渲染不出来
  <ng-content select="span">
  </ng-content>
  // 使用
  <app-content>
      <span>这是 ng-content</span>
  </app-content>
  
  
  // 规定必须加载这个组件
  <ng-content select="app-test">
  </ng-content>
  
  // 使用
  <app-content>
      <app-test></app-test>
  </app-content>
  ```





## ng-container

> Angular 的 `<ng-container>` 是一个分组元素，但它不会污染样式或元素布局，因为 Angular 不会把它放进 DOM中。

```html
<div>
  Pick your favorite hero
  (<label><input type="checkbox" checked (change)="showSad = !showSad">show sad</label>)
</div>
<select [(ngModel)]="hero">
  <ng-container *ngFor="let h of heroes">
    <ng-container *ngIf="showSad || h.emotion !== 'sad'">
      <option [ngValue]="h">{{h.name}} ({{h.emotion}})</option>
    </ng-container>
  </ng-container>
</select>
```

