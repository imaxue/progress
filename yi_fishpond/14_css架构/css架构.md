# css架构

## 几种css组织方式

### 1.OOCSS 面向对象 CSS

![Image text](http://img.mp.itc.cn/upload/20170731/2c5d88cfa7c4418aae0286d02818e987.jpg)

- 结构和设计分离

- 容器和内容分离

基于面向对象创建和模块化可重用的对象，并在页面中任何需要的地方重用。提高了他的`灵活性`和`可复用性`。

把样式和结构独立出来，分别来写对应的类名。

```html
<div class="size1of4 bgBlue solidGray mts mlm mrm mbm"></div>
<style>
    .size1of4 {width: 25%;}
    .bgBlue {background:blue}
    .solidGray {border: 1px solid #ccc}
    .mts {margin-top: 5px}
    .mrm {margin-right: 10px}
    .mbm {margin-bottom: 10px}
    .mlm {margin-left: 10px}
</style>
```

### 2.Atomic CSS 原子 CSS

![Image text](http://img.mp.itc.cn/upload/20170731/1233075dceda47239690adafb64a8b0a.jpg)

Atomic CSS是CSS架构的一种方法, 它的好处是写出基于视觉功能的小的, 单用途CSS类.

使用Atomic CSS, 为每个可重用的属性创建单独的CSS类. 例如, margin-top: 1px; 就可以创建一个类似于mt-1的CSS类, 或者width: 200px; 对应的CSS类为w-200.

这种样式允许您通过重用声明来最大程度地减少您的CSS代码数量, 并且也能很轻松的更改模块, 例如, 更改以技术任务时.


### 3.SMACSS 可扩展和模块化结构的 CSS

![Image text](http://img.mp.itc.cn/upload/20170731/733af779372d43c8b5ff99a4ea683001.jpg)

+ 基础：默认的 CSS 样式,作为其他样式的基础。

    如body, input, button, ul, ol等.主要使用HTML标签和属性选择器.

+ 布局：页面布局相关的 CSS 样式，用来进行模块的排列。

    主要是些全局元素, 顶部, 页脚, 边栏等模块的大小。

+ 模块：可复用的模块的 CSS 样式。

    在页面中多次出现的重复使用的模块。

+ 状态：描述布局和模块在不同状态下的外观。

    比如在不同的屏幕尺寸下，布局会发生变化。标签式模块的每个标签页可以有显示或隐藏的状态。

+ 主题：该类别和状态类似，用来改变布局和模块的视觉效果。

### 4. [ITCSS](https://github.com/csswizardry/frcss)

![Image text](http://jbcdn1.b0.upaiyun.com/2016/01/b27e7918037e552d253eb784cda767ef.jpg)

此方案更像是 CSS 整体架构方案，与 SMACSS 横向分类不同，它综合了以上各种方法，提出了一个纵向分层模型：

1. 设置层：该层包含了项目中的所有全局设置（如基本字体大小、颜色调色板、配置等）。
2. 工具层：该层包含了全局可用的工具–即混入和函数。全局工具的例子有梯度混入、字体大小混入等。
3. 通用层：该层是第一个实际产生CSS的层。它很少改动，并且通常在不同项目中保持不变。它包括像Normalize. css、全局盒子大小规则、CSS重置等。
4. 元素层：该层只包含没有样式的html元素选择器。
5. 对象层：该层是第一个包含了基于类的选择器的层。
6. 组件层：该层开始设计有可识别性的DOM元素。
7. 核心层：该层是具有最高特异性的层，可以覆盖之前的样式。该层大部分声明都带有         !important 。

 