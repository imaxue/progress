# CSS Color

css颜色可以使用以下方式来描述：
- 使用关键字。
  + 关键字与RGB十六进制颜色对照   
    | 关键字 | RGB十六进制数 |
    | :------: | :------: |
    | black(黑) | #000000 |
    | silver(银) | #c0c0c0 |
    | gray/grey(灰) | #808080 |
    | white(白) | #ffffff |
    | maroon(褐) | #800000 |
    | red(红) | #ff0000 |
    | purple(紫) | #800080 |
  + transparent关键字。此关键字是rgba(0,0,0,0)的简写
  + currentColor关键字。代表原始的 color 属性的计算值。它允许让继承自属性或子元素的属性颜色属性以默认值不再继承。
    
- 使用``RGB立体坐标（RGB cubic-coordinate）``系统。如：#fff（以#加上十六进制形式）、 rgb(255,255,255)和rgba(255,255,255,1)（函数表达式形式）

- 使用``HSL圆柱坐标（HSL cylindrical-coordinate）``系统。如：hsl()、hsla()
  + H表示色相（色环上的一个无单位角度值， red0=360,green=120,blue=240）
  + S表示饱和度（百分比数值，100%满饱和，0%灰度）
  + L表示亮度 （百分比数值，100%白色，0%黑色）

  # 粘性固定（position: sticky）
    position:sticky它是相对定位（position:relative）和固定定位（position:fixed）的混合。元素在可见区域时是相对定位，但是元素一旦要超出可见区域时，则会变为固定定位。我们可以用top来设定一个阀值，也就是说如果设置top: 10px;那么在元素离顶端还有10px距离的时候固定。使用这个属性值可以达到之前需要用js来监听scroll事件设定元素吸顶的效果

# @supports

判断css是否支持某个属性
```css
@supports (mix-blend-mode: difference) {
  h1 {
    color: #fff;
    mix-blend-mode: difference;
  }
}
```