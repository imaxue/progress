<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <button @click="change">click</button>
  </div>
</template>

<script>
import {mixin} from '../utils/mixin.js'
export default {
  name: 'HelloWorld',
  mixins:[mixin],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data1:'ffff'
    }
  },
  methods:{
    handler(){
      console.log('自带的handler')
    },
    change(){
      // this.msg = 'www'
      // this.handler()
      // this.handler2()
      console.log(this.$data)
      
    }
  },
  created(){
    console.log('self created')
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
