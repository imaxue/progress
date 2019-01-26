<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <h2>Essential Links</h2>
    <button @click="change">父亲的click</button>
    <button @click="hide1">隐藏儿子1</button>
    <button @click="children1Ref">children1Ref</button>
    <children1 v-if="children1" ref="children1"/>
    <!-- <children2 /> -->
  </div>
</template>

<script>
import children1 from './children1'
import children2 from './children2'
export default {
  name: "life",
  components:{children1, children2},
  data() {
    return {
      message: "Welcome to Your Vue.js App",
      children1:true,
      children2:true,
    };
  },
  beforeCreate: function() {
    console.group("beforeCreate 父亲的创建前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
    console.log("%c%s", "color:red", "data   : " + this.$data); //undefined
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  created: function() {
    console.group("created 父亲的创建完毕状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
  },
  beforeMount: function() {
    console.group("beforeMount 父亲的挂载前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
  },
  mounted: function() {
    console.group("mounted 父亲的挂载结束状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
  },
  beforeUpdate: function() {
    console.group("beforeUpdate 父亲的更新前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  updated: function() {
    console.group("updated 父亲的更新完成状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  beforeDestroy: function() {
    console.group("beforeDestroy 父亲的销毁前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  destroyed: function() {
    console.group("destroyed 父亲的销毁完成状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  methods: {
    change() {
      this.message = "父亲的我变化了";
      // setTimeout(() => {
        console.log("父亲的变化了consoleeeeeeeeeeeeeeeeee");
      // });
      // this.$nextTick(() => {
      //   console.log("nnn");
      // });
      // this.msg = "ee";
    },
    hide1(){
      this.children1 = false
    },
    children1Ref(){
      this.children1 = true
      // this.$nextTick(() => {
      //   console.log('next')
      //   this.$refs.children1.yoyo()
      // });
      // this.$refs.children1.yoyo()
      // setTimeout(()=>{
      //   console.log('set')
      //    this.$refs.children1.yoyo()
      // },0)
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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


