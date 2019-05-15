<template>
  <div class="home">
    <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="unixbench">UnixBench</el-menu-item>
  <el-menu-item index="fio">Fio</el-menu-item>
  <el-menu-item index="netperf" >NetPerf</el-menu-item>
  <el-menu-item index="stream" >Stream</el-menu-item>
  <el-menu-item index="pressure"><a href="https://www.baidu.com" target="_blank">压测系统</a></el-menu-item>
    <el-menu-item index="Monitoring"><a href="https://www.baidu.com" target="_blank">监控系统</a></el-menu-item>
</el-menu>
    <Tabinfo :infodata="data"/>
  </div>
</template>

<script>
import Tabinfo from '@/components/Tabinfo.vue'
export default {
  name: "home",
  components: {
    Tabinfo
  },
  data() {
    return {
      activeIndex: 'unixbench',
      data:"unixbench",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.$router.push("/");
        this.data=key
      },
  }
};
</script>
<style lang="stylus" >
  .home{
    a {
    text-decoration: none;
    color:#409EFF;
  }
  }
</style>

