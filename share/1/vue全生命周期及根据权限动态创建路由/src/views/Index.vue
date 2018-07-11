<template>
  <div class="hello">
    <div >
      <h1>{{ msg }}</h1>
      <p>欢迎使用vue</p>
      <div class="box">
        <span>测试</span>
      </div>

      <router-link :to="item.path" v-for="(item,index) in paths" :key="index">
        <p>{{item.path}}</p>
      </router-link>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Demo1',
  data () {
    return {
      msg: 'Welcome demo1',
      // paths:[{
      //   meta:{title:''}
      // }],
      menu:false
    }
  },
  methods:{

  },
  created(){
    
    // this.paths = this.$router.options.routes
    
  },
  computed:{
    paths(){
      return this.$store.state.routes
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
p{
  font-size: 0.34rem;
}
h1{
  font-size: 0.34rem;
}
.box{
  background-color: #333;
  width: 7.5rem;
  height:2rem;
  span{
    color:#fff;
  }
}
</style>
