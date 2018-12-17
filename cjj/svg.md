# SVG学习

## 样式
 - stroke可以写在css样式中，也可以在标签上直接书写。stroke的值可以是颜色或者是一个svg的图形
```css
.svg {
  stroke: #f40;
  stroke: url(#shape) /* 此处的#shape对应一个id为shape的图形*/
}
```
```xml
  <svg>
    <defs>
      <path id="shape" d="M105.417009,218.5791 C89.7964849,227.803032,87.33725080,229.255212,84.2903746,229.286233 L81.8020835,227.884425 C2.95260334,183.463645,2.327776400,183.111642,1.80907665,182.598128"></path>
    </defs>
  </svg>
```

## Rect

## Circle

## Path
- M   
  表示moveTo，移动到某个位置。比如：``M10 10``表示移动到x坐标10、y坐标10的位置
- L   
  表示lineTo，画直线到某个位置。比如：``M10 10L100 10``表示从坐标(10, 10)画一条到坐标(100, 10)的直线
- H   
  Horizontal。水平线
- V   
  vertical。垂直线
- C   
  三次贝赛尔曲线
- S   
  平滑的三次贝赛尔曲线
- Q   
  二次贝赛尔曲线
- T   
  更平滑的二次贝赛尔曲线

## Group

## Defs

## Animate
- attributeName   
  需要进行动画的属性名，例子中``attributeName="cx"``中的``cx``表示圆心x坐标按照values中设置的坐标进行运行

- values   
  动画的运行路径坐标

- from   
  属性的初始位置

- to   
  终止值

- dur   
  持续时间

- repeatCount   
  重复次数

- calcMode   
  动画的速度曲线。类似css动画中的animation-timing-function
```xml
  <animate attributeName="cx" values="113.89;65.13;0.03;180.62;111.67;153.64" dur="2s" calcMode="linear" repeatCount="indefinite"></animate>
  <animate attributeName="cy" from="0" to="100" dur="2s" calcMode="linear" repeatCount="indefinite"></animate>
```
  
## Patterns

### patternUnits


## Gradient

### gradientUnits