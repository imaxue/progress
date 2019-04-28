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
  <el-menu-item index="unixbench">unixbench</el-menu-item>
  <el-menu-item index="fio">fio</el-menu-item>
  <el-menu-item index="netperf" >netperf</el-menu-item>
  <el-menu-item index="stream" >stream</el-menu-item>
  <el-menu-item index="pressure"><a href="https://www.baidu.com" target="_blank">压测系统</a></el-menu-item>
    <el-menu-item index="Monitoring"><a href="https://www.baidu.com" target="_blank">监控系统</a></el-menu-item>
</el-menu>
    <Tabinfo :data="data"/>
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
        this.data=key
      },
  }
};
</script>
