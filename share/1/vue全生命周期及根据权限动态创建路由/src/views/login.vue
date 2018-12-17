<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <button @click="change">登录</button>
    <button @click="getRoutes">获取路由</button>
    <button @click="jump7">跳转到新增路由7</button>
  </div>
</template>

<script>
// import demo7 from '@/views/demo7.vue'
import axios from 'axios'
import {asyncRoutes} from '@/router/asyncRouter'
const componentObj = asyncRoutes()
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    change(){
      this.msg = 'www'
      axios.post('http://127.0.0.1:3000/login',{
        firstName:'Fred',
        lastName:'Flintstone'
      }).then(res=>{
        let {code} = res.data
        if(code === 0){
          sessionStorage.setItem('token', 'value');
          this.$router.push('/demo5')
        }
      })
      
      
      setTimeout(() => {
        console.log('登录')
      })
      //{ path: '/demo5', name: 'demo5', component: demo5 , meta: {token: true}},
      // setTimeout(()=>{
      //   this.$router.addRoutes([
      //     // { path: '/demo7', name: 'demo7', component: resolve => require(['@/views/demo7.vue'], resolve) , meta: {token: true}},
      //     { path: '/demo7', name: 'demo7', component: demo7 , meta: {token: true}},
      //   ])
      // },0)
      
      
      // setTimeout(()=>{
      //   console.log(this.$router.options.routes)
      // })
    },
    jump7(){
      this.$router.push('/demo7')
    },
    getRoutes(){
      axios.get('http://127.0.0.1:3000/getRoutes').then(res=>{
        // console.log(res)
        let {data} = res.data
        console.log(data)
        sessionStorage.setItem('addRoutes', JSON.stringify(data));
        // 把对应关系绑定到路由上
        data.forEach(e => {
          e.component = componentObj[e.component]
        })
        this.$store.dispatch('addRoutes', {routes: data})
        this.$router.addRoutes(data)
      })
    }
  },
  mounted(){
    sessionStorage.setItem('addRoutes', JSON.stringify([]));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
