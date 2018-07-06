<template>
  <div class="loading">
    <div class="loading-item" v-for="n in 10" :key="n"></div>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    data () {
      return {
      }
    }
  }
</script>
<style lang='stylus'>
  width = 6px
  .loading
    position fixed
    top 50%
    left 50%
    transform translate(-50%, -50%)
    &-item
      display inline-block
      margin-right 5px
      width width
      height width * 6
      background-color #0081cc
      animation loading1 1s infinite alternate
      opacity 0.5
      transform scaleY(0)
      for num in 2...11
        &:nth-child({ num })
          animation-delay num * 0.1s
  
  @keyframes loading1 {
    to {
      transform scaleY(1)
      opacity 1
    }
  }
</style>
