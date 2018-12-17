> 需求：页面路由跳转，需要带参数给页面做展示判断


解决：两种
第一种：link  
正常不带参数的：
```html
<router-link to="taskDetail">
<div class="right" >详情</div>
</router-link>
```

带参数声明式
```html
<router-link :to=“{ name: 'TaskDetail',params: {id: 123}}">
</router-link>
```

带参数编程式
```react
<div class="right" @click="targetTo">详情</div>
targetTo() {
    // console.log(this.$router)
    this.$router.push({
        name: 'TaskDetail',
        params: {
        id: 123
        }
    })
// console.log(this.$route)
},
```

this.route是router的实例，router像是动词
注意：push里面不能用path ，要用name里面添加跳转的路径
