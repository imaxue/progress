<template>
  <div class="Tabinfo">
   <div>{{tabname}}</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="主机总览" name="overview"></el-tab-pane>
      <el-tab-pane label="下载" name="download"></el-tab-pane>
    </el-tabs>
    <div>{{tabdata}}</div>
    <Hostlist v-if="tabname=='主机列表'"></Hostlist>
    <Downloadlist v-else></Downloadlist>
  </div>
</template>
<script>
import Hostlist from '@/components/Hostlist.vue'
import Downloadlist from '@/components/Downloadlist.vue'
export default {
  name: "Tabinfo",
  components: {
    Hostlist,
    Downloadlist
  },
  props: {
    data: {
      type: String,
      default: ""
    }
  },
  computed:{
    tabdata () {
        return this.data
    }
  },
  data() {
    return {
      activeName: "overview",
      tabname:'主机列表'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if(tab.label=='主机总览'){
          this.tabname = '主机列表'
      }else{
           this.tabname = '下载列表'
      }
    }
  }
};
</script>