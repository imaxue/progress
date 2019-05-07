菜单用elementui的NavMenu 导航菜单组件,使用router(启用该模式会在激活导航时以 index 作为 path 进行路由跳转 ),但是之前的一种写法,会导致选中的路由会跳转,但是不高亮

之前的写法:

```
:default-active="onRoutes"
computed:{
      onRoutes(){
        return this.$route.path.replace('/','');
      },
    },
```

解决办法

1. `:default-active="$route.path"`



