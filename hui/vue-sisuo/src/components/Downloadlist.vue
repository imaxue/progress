<template>
  <div class="DLlist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <span>{{DLname}}</span> -->
        <span>{{carname}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <a :href="someurl+cartagname" download title="下载">下载</a>
        </el-button>
      </div>
      <div class="text item">版本:{{cartag}}</div>
      <div class="text item">
        功能:
        <div class="text item">
          <div v-for="(value, o) in carlist" :key="o" class="list">{{o+1}}{{'、 ' + value }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "DLlist",
  props: ["DLdata"],
  computed: {
    DLname() {
      return this.DLdata;
    }
  },
  data() {
    return {
      carname: "",
      cartag: "",
      carlist: [],
      cartagname: "",
      someurl: "/applications/download?fileName="
    };
  },
  watch: {
    DLname(val) {
      this.getinfo(val);
    }
  },
  created() {
    if (process.env.NODE_ENV !== "production") {
      this.someurl = "/api/applications/download?fileName=";
    }
    this.getinfo(this.DLname);
  },
  methods: {
    getinfo(val) {
      const infodata = {
        unixbench: {
          names: "Unixbench",
          tagname: "unixbench-5.1.2.tar.gz",
          version: "v5.1.2",
          Flist: [
            "支持Unix、BSD、Linux系统下的性能测试",
            "支持系统和图形化测试，使用Run命令进行系统测试；使用Run graphics命令进行图形化测试；使用Run gindex可同时进行系统测试和图形化测试",
            "修复严重bug，当安装路径名存在空格时，也支持运行",
            "支持语言设置，可通过变量“$language”进行设置"
          ]
        },
        fio: {
          names: "Fio",
          tagname: "fio-2.1.10.tar.gz",
          version: "v2.1.10",
          Flist: [
            "支持sync，mmap， libaio， posixaio， SG v3， splice， network， syslet， guasi， solarisaio，I/O Priorities，rate I/O，forked or threaded jobs共13种I/O引擎的测试。",
            "支持磁盘/SSD、CPU、Nic等的IO性能测试。",
            "支持随机读写、顺序读写等测试场景，用户可自定义iodepth、numjobs等参数进行测试。"
          ]
        }
      };
      this.carname = infodata[val].names;
      this.cartag = infodata[val].version;
      this.carlist = infodata[val].Flist;
      this.cartagname = infodata[val].tagname;
    }
  }
};
</script>
<style lang="stylus">
.DLlist {
  a {
    text-decoration: none;
    color:#409EFF;
  }

  .box-card {
    width: 360px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .list {
    margin: 5px;
    margin-left: 12px;
    font-size: 13px;
  }

  ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  ul {
    font-size: 14px;
    padding: 10px;

    li {
      margin-bottom: 2px;
    }
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>
