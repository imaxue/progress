无参数：
```html
<router-link to="userDetail">
<div class="right" >详情</div>
</router-link>
```

有参数
```html
<router-link :to=“{ name: 'userDetail',params: {id: 123}}">
</router-link>
```

带参数
```html
<div class="right" @click="targetTo">详情</div>
targetTo() {
    // console.log(this.$router)
    this.$router.push({
        name: 'userDetail',
        params: {
        user: 123
        }
    })
// console.log(this.$route)
},
```