- 自定义组件，绑定style和class只能在标签上写，不能绑定对象或者数组的方式
```html
<!-- 错误示例 -->
<template>
    <view :style="computedStyle" :class="computedClass" ></view>
</template>
<script>
  export default {
    data () {
      return {
        computedStyle: {
          width: '100%'
        },
        computedClass: ['font-size-1']
      }
    }
  }
</script>
<!-- 正确示例 -->
<template>
    <view :style="{ width: width }" :class="{ 'is-active': isActive }" ></view>
</template>
<script>
  export default {
    data () {
      return {
        width: '100%',
        isActive: true
      }
    }
  }
</script>
```

- 不能在模板里面做一些js原生api的操作，比如Array.slice之类的