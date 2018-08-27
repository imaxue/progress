# 图片懒加载vue-lazyload
> 引入v-lazyload插件  使用v-lazy指令放在想要渲染图片元素上即可[更多配置请查看文档]
```javascript
  import VueLazyLoad from 'vue-lazyload'
  Vue.use(VueLazyLoad,{
    error:'./static/error.png',
    loading:'./static/loading.png'
  })
```
`<img v-lazy="imgUrl">`