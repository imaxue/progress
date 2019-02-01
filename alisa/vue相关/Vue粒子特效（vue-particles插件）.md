# Vue粒子特效（vue-particles插件）

![1547171183285](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1547171183285.png)

图上那些类似于星座图的点和线，是由vue-particles生成的，不仅自己动，而且能与用户鼠标事件产生互动。

## 使用教程:

```
npm install vue-particles --save-dev
```

main.js中加入以下代码

```
import VueParticles from 'vue-particles'//粒子动画插件
Vue.use(VueParticles);
```

在你想展示的页面中调用,我是在Login.vue文件中使用的.代码如下:

```js
 <div class="body">
 	<div style="position:absolute;z-index: 0;width:100%" v-if="partiShow">
        <vue-particles
          color="#dedede"
          :particleOpacity="0.7"
          :particlesNumber="80"
          shapeType="circle"
          :particleSize="4"
          linesColor="#dedede"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="3"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
        >
        </vue-particles>
      </div>
</div>
```

如果想添加背景图片,直接给div添加一个背景图片即可

```css
.bodys {
    font-family: "微软雅黑";
    position: relative;
    font-size: 14px;
    width: 100%;
    height: 100%;
    background: url(../../../../static/img/123.png) center center;
  }
  
```

属性:

* `color: String类型。`默认'#dedede'。粒子颜色。

*  `particleOpacity: Number类型。默认0.7。粒子透明度。`

* particlesNumber: Number类型。`默认80。粒子数量。

* shapeType: String类型。`默认'circle'。可用的粒子外观类型有："circle","edge","triangle", `"polygon","star"。

*  `particleSize: Number类型。`默认80。单个粒子大小。

*  `linesColor: String类型。`默认'#dedede'。线条颜色。

* linesWidth: Number类型。`默认1。线条宽度。

* lineLinked: 布尔类型。`默认true。连接线是否可用。

*  `lineOpacity: Number类型。`默认0.4。线条透明度。

* linesDistance: Number类型。`默认150。线条距离。

*  `moveSpeed: Number类型。`默认3。粒子运动速度。

*  `hoverEffect: 布尔类型。`默认true。是否有hover特效。

* hoverMode: String类型。`默认true。可用的hover模式有: "grab", "repulse", "bubble"。

*  `clickEffect: 布尔类型。`默认true。是否有click特效。

* clickMode: String类型。`默认true。可用的click模式有: "push", "remove", "repulse", "bubble"。
