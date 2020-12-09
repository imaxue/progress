# 一.v-once指令的使用.不想要变量响应式
	变量值发生改变的时候,指令的值还是之前的值,不会改变
	
![](/Users/mac/Documents/study/progress/alisa/img/v-once.png)
	
	
# v-html指令和v-text类似
![](/Users/mac/Documents/study/progress/alisa/img/v-html.png)

# v-pre,不会解析变量的实际值,变量是什么就会展示什么
![](/Users/mac/Documents/study/progress/alisa/img/v-pre.png)
效果如下
![](/Users/mac/Documents/study/progress/alisa/img/v-pre1.png)

# v-cloak指令
![](/Users/mac/Documents/study/progress/alisa/img/v-cloak.png)
可以解决页面加载慢,页面闪烁出现{{}}的情况
# v-bind:class="{类名1,true,类名2,boolean}"
![](/Users/mac/Documents/study/progress/alisa/img/v-bind-class.png)
![](/Users/mac/Documents/study/progress/alisa/img/v-bindclass.png)
# v-bind:class="[类名1,类名2]"数组语法,可以和多个类名同时使用
```
<div id="app">
	<h2 class="title" :class="['active','line']">{{ message }} </h2>
</div>
```
这样页面会展示三个类名,但是如果'active'不加双引号的话会当变量解析
# :style={}也是包含对象语法和数组语法
```
<div id="app">
	<h2 class="title" :style="{fontSize:finalSize + px}">{{ message }} </h2>
</div>
<script src='../js/vue.js'></script>
<script>
	const app = new Vue({
		el: '#app',
		data: {
			finalSize: 100
		}
	})
</script>
```
finalSize加引号会当字符串处理,不加引号会解析成变量
![](/Users/mac/Documents/study/progress/alisa/img/v-bindstyle.png)
# :style="函数"可以直接写函数调用里面的方法
```
<div id="app">
	<h2 class="title" :style="getStyles()">{{ message }} </h2>
</div>
<script src='../js/vue.js'></script>
<script>
	const app = new Vue({
		el: '#app',
		data: {
			finalSize: 100,
			finalColor: 'red'
		},
		methods: {
			getStyles:function () {
				return {
					fontSize:this.finalSize + 'px',
					backgroundColor: this.finalColor
				}
			}
		}
	})
</script>
```
![](/Users/mac/Documents/study/progress/alisa/img/v-bindstyle.png)
# 计算属性
## 三种写法
![](/Users/mac/Documents/study/progress/alisa/img/computed-1.png)
![](/Users/mac/Documents/study/progress/alisa/img/computed-2.png)
三种写法对比,还是用计算属性的会更好,写法上简单,性能上,如果变量值不变会利用缓存不会每次都重新计算,性能更高,如果变量值改了,则会计算一次
![](/Users/mac/Documents/study/progress/alisa/img/computed-3.png)
所以为了节省性能的时候多使用计算属性,少写methods



