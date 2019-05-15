<template>
  <div class="Tabinfo">
    <!-- <div>{{tabname}}entityId!=''||entityId!=undefined</div> -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{tabname}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="entityId!=undefined">{{entityId}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="主机总览" name="overview"></el-tab-pane>
      <el-tab-pane label="下载" name="download"></el-tab-pane>
    </el-tabs>
    <!-- <div>{{infodata}}</div> -->
    <Hostlist v-if="tabname=='主机列表'&&entityId==undefined" :hostdata="tabdata"></Hostlist>
    <Downloadlist v-if="tabname=='下载列表'&&entityId==undefined" :DLdata="tabdata"></Downloadlist>
    <ShowResult v-if="entityId!=undefined" :resultdata="resultdata"></ShowResult>
  </div>
</template>
<script>
import Hostlist from "@/components/Hostlist.vue";
import Downloadlist from "@/components/Downloadlist.vue";
import ShowResult from "@/components/ShowResult.vue";
export default {
  name: "Tabinfo",
  components: {
    Hostlist,
    Downloadlist,
    ShowResult
  },
  props: ['infodata']
  ,
  computed: {
    tabdata() {
      return this.infodata;
    },
    entityId() {
      return this.$route.query.entityId;
    }
  },
  data() {
    return {
      activeName: "overview",
      tabname: "主机列表",
      resultdata:{
        rowlist:[],
        infodata:this.tabdata
      }
    };
  },
  created() {
    if (this.$route.query.entityId != undefined) {
      this.resultdata.infodata = this.tabdata;
       this.querylog();
    }
   
  },
  watch: {
    entityId(val) {
      console.log(val, "-----entityId");
      if (val == undefined) {
        this.resultdata.rowlist = [];
         this.resultdata.infodata = this.tabdata;
      } else {
        this.resultdata.infodata = this.tabdata;
        this.querylog();
      }
    },
  },
  
  methods: {
    handleClick(tab, event) {
      this.$router.push("/");
      // console.log(tab, event);
      if (tab.label == "主机总览") {
        this.tabname = "主机列表";
      } else {
        this.tabname = "下载列表";
      }
    },
    querylog() {
      this.axios
        .get(`/apps/listFiles`, { type: this.tabdata })
        .then(data => {
          if (data.data.code == 200) {
           this.resultdata.rowlist = data.data.data;
          }
        });
    },
  }
};
</script>
<style lang="stylus">
.Tabinfo {
  .el-breadcrumb__item{
        font-size: 16px;
    margin-top: 10px;
  }
}
</style>