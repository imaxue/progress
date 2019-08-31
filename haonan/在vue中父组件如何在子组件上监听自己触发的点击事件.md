# 前言
在vue中，我们自己写了一个公共组件，由于在不同的父组件中对其点击后要执行的逻辑不同，所以要在不同的父组件中监听不同的点击事件。但是我发现在父组件中无法监听到自己的点击事件
**注：由于公共组件可以当作子组件进行使用，所以我遇到的问题在子组件中也会遇到。在后文中我们子组件**

# 问题复现
先上代码：
```js
<!-- 父组件 -->
<template>
  <div>
    <common @click="showName"></common>
  </div>
</template>

<script>
export default {
  name: 'hello',
  methods: {
    showName () {
      console.log('Hello')
    }
  }
}
</script>

<!-- 子组件 -->
<template>
  <div class="content-box"></div>
</template>

<script>
export default {
  name: 'common'
}
</script>
```
1. 当我点击了子组件（粉色盒子）后本想着打印出来其父组件的名称‘Hello’，但是却并没有任何东西打印出来
![父组件名称未打印](http://upload-images.jianshu.io/upload_images/10506000-1fcf4ee9802bed8a..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
1. 随后我在子组件上注册了一个点击事件，再次对其进行点击，这回打印的结果是子组件自己的名字‘common’
![子组件名称被打印](http://upload-images.jianshu.io/upload_images/10506000-d8c14173c6895fc7..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
1. 通过上两步的测试，我发现如果想在子组件上直接监听父组件的点击事件无法成功

# 解决方法
解决方法很简单，其实在父组件中注册点击事件的时候加一个[.native](https://cn.vuejs.org/v2/guide/components.html#给组件绑定原生事件)修饰符就可以了。根据Vue2.0官方文档关于父子组件通讯的原则，父组件通过prop传递数据给子组件，子组件触发事件给父组件。但父组件想在子组件上监听自己的click的话，需要加上**.native**修饰符
```js
<!-- 父组件 -->
<template>
  <div>
  	<!-- 在父组件的点击事件上添加修饰符 -->
    <common @click.native="showName"></common>
  </div>
</template>

<script>
export default {
  name: 'hello',
  methods: {
    showName () {
      console.log('Hello')
    }
  }
}
</script>
```
再次执行代码：
![打印出父组件名称](http://upload-images.jianshu.io/upload_images/10506000-4165c6cfde188ddb..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 其他想法
之所以写这个是因为当我后来用到[element-ui](http://element.eleme.io/#/zh-CN "element-ui")后发现在element中点击事件可以通过监听change事件进行触发并且也没有添加任何的修饰符。由于没有查看element的源码，所以具体的实现不太清楚，但是稍微思考了下，我自己仿做了个：
想实现这个方法我们用到的是vue的[自定义事件](https://cn.vuejs.org/v2/guide/components.html#自定义事件 "vue自定义事件")。具体的思路就是当我们的子组件被点击的时候，使用**$emit**触发父组件监听的**change**事件就可以了
稍微改造下刚刚的代码：
```js
<!-- 父组件 -->
<template>
  <div>
    <common @change="showName"></common>
  </div>
</template>

<script>
export default {
  name: 'hello',
  methods: {
    showName () {
      console.log('Hello')
    }
  }
}
</script>

<!-- 子组件 -->
<template>
  <div class="content-box" @click="emitFn"></div>
</template>

<script>
export default {
  name: 'common',
  methods: {
  	showName () {
  		console.log('common')
  	},
    emitFn () {
      this.$emit('change')
    }
  }
}
</script>
```
1. 在上面的代码中，我将子组件的点击事件改成了emitFn,当子组件被点击后触发父组件监听的change事件
1. 在父组件中，监听子组件触发的change事件，当子组件触发后，执行showName函数，从而打印出名字

# 总结
1. 根据Vue2.0官方文档关于父子组件通讯的原则，父组件通过prop传递数据给子组件，子组件触发事件给父组件。但父组件想在子组件上监听自己的click的话，需要加上**.native**修饰符
1. 可以利用vue的自定义事件实现不添加.native修饰符即可监听父组件自身的事件，如果想要监听其他的事件，只要在子组件中添加相应的触发即可