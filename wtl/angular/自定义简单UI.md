​	之前用angular开发用的ng ant  UI图来开发的，虽然angular 有树摇来实现按需加载，但是css 文件也是特别大的，后来再开发新项目的时候决定不适用UI 自己来写UI 一些简单的视图UI。

​	拿其中的一个简单的例子来说。

	##### 需求

`buttton`按钮再点击的时候实现 loading 状态。

```html
<button mbtn [loading]="loading"> 点击 </button>
```



##### 解决路程

1. 再第一次解决的时候想用**指令**来解决。

angular 中的指令分为 **属性指令** 和 **结构指令**

- 属性指令  用于改变一个 DOM 元素的外观或行为。
- 结构指令 操纵 DOM 树。

属性指令可以改变button的一些class ，但是不能再button 内添加子节点 。

结构指令虽然可以操作DOM，但是创建DOM的时候，创建成为了宿主元素的兄弟节点(这句话是什么意思呢？我想创建成`<button><svg>loading</svg>点击</button>` 这样的结构，但是用结构指令创建成了

 `<button>点击</button> <svg>loading</svg>` 这样的结构，显然不是我想要的) 。当然可以借用这个特点在`<button><span [mbtn]></span> </button> `内部使用指令但是这样写出来对以后写代码来说就多写了一层span这是非常不好看的，也不是我想要的效果

2. 后来看了看 ng ant 的源码发现要实现这个功能非常的简单，那就是使用组件，angular 中的component 起始就是directives，下面是最简单的用法，

```typescript
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[mbtn]',
  // templateUrl: './mybtn.component.html',
  template: `
  <i *ngIf="loading" class="anticon anticon-loading"><svg viewBox="0 0 1024 1024" fill="currentColor" width="1em" height="1em" data-icon="loading" aria-hidden="true" class="anticon-spin"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg></i>
  <span>
    <ng-content></ng-content>
  </span>
  `,
  styleUrls: ['./mybtn.component.css']
})
export class MybtnComponent implements OnInit {

  @Input() loading: boolean;
  constructor() { }
  ngOnInit() {
  }

}

```



#### 使用指令改变button的一些样式变化

```typescript
import { HostListener, Renderer2, ElementRef, Directive, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[myClassButton]'
})
export class BsButtonDirective implements OnInit {

  @Input() myClassButton;
  @Input() mouseDownClass;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    this.myClassButton = this.myClassButton || 'primary';
    this.mouseDownClass = this.mouseDownClass || 'danger';
    this.renderer.addClass(this.el.nativeElement, 'btn');
    this.renderer.addClass(this.el.nativeElement, `btn-${this.myClassButton}`);
  }

  @HostListener('mousedown') onMouseDown() {
    this.renderer.removeClass(this.el.nativeElement, `btn-${this.myClassButton}`);
    this.renderer.addClass(this.el.nativeElement, `btn-${this.mouseDownClass}`);
  }

  @HostListener('mouseup') onMouseUp() {
    this.renderer.removeClass(this.el.nativeElement, `btn-${this.mouseDownClass}`);
    this.renderer.addClass(this.el.nativeElement, `btn-${this.myClassButton}`);
  }
}
```





