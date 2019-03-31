之前在项目落地页中引用外部js，需要调用远程js中的方法，发现在控制台中可以打印出该方法，但是项目却报错（找不到该方法），排查后发现是异步原因导致，所以整理了一下同步调用远程js的方法，写成全局组件的形式，方便项目中其他页面使用。

1.先给大家看下我异步调用远程js的写法：

```
    mounted() {
        this.statistics();
    },
    statistics(){
        var _hmt = _hmt || [];
        var hm = document.createElement("script");
        hm.src = "//xxx.js";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
        
        //调用上面js中的方法
        window.aaa();  //报错
    },
```
该方法存在两个问题：
- 异步，还没取到window.aaa()方法，提前调用
- 多次加载外部js文件

2.同步实现（组件）：

```
// 引用远程的js资源
import Vue from 'vue';
Vue.component('remote-js', {
  render(createElement) {
    return createElement('script', {
      attrs: {
        type: 'text/javascript',
        src: this.src,
        id: this.id
      }
    });
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    id: {
      type: String
    }
  },
  mounted() {
    if (this.$el.readyState) {
        //IE
        this.$el.onreadystatechange = ()=> {
          if (
            this.$el.readyState == "loaded" ||
            this.$el.readyState == "complete"
          ) {
            this.$el.onreadystatechange = null;
            this.scriptLoad();
          }
        };
      } else {
        //Others
        this.$el.onload =()=>{
            this.scriptLoad();
        }
      }
  },
  methods: {
    scriptLoad() {
        this.$emit('scriptLoad')
    }
  }
})
```

页面引用该组件：
```
<template>
    <div>
        <remote-js src="//xxx.js" @scriptLoad="callback"></remote-js>
    </div>
</template>

methods: {
    callback() {
      window.aaa();
    },
}
```
该方法可以规避上述两个问题。
