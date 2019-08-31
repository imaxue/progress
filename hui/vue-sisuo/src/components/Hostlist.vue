<template>
  <div class="Hostlist">
    <el-button @click="adddata.addHost=true">添加主机</el-button>
    <el-table :data="hostlist" stripe style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="ip" label="名称"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑">
            <i class="el-icon-setting" @click="showPerform(scope.row)"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="运行">
            <i class="el-icon-caret-right" @click="showpop(scope.row)"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="停止">
            <i class="el-icon-error" @click="stopPop(scope.row)"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除">
            <i class="el-icon-delete" @click="deletebtn(scope.row)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="result" label="结果">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查看结果">
            <i class="el-icon-search" @click="showResult(scope.row)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
       
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
    <ViewDetails v-if="this.rundata.dialogVisible" :rundata="rundata"></ViewDetails>

    <InfoPop :infodata="infodata"></InfoPop>

    <AddHost :adddata="adddata" v-on:addonehost="addhostname"></AddHost>
  </div>
</template>

<script>
import ViewDetails from "@/components/ViewDetails.vue";
import InfoPop from "@/components/InfoPop.vue";
import AddHost from "@/components/AddHost.vue";

export default {
  name: "Hostlist",
  components: {
    ViewDetails,
    InfoPop,
    AddHost
  },
  props: {
    hostdata: {
      type: String
    }
  },
  computed: {
    hostname() {
      return this.hostdata;
    }
  },
  created() {
    this.init();
  },
  watch: {
    hostname(val) {
      this.init();
    }
  },
  data() {
    return {
      hostlist: [],
      rundata: {
        dialogVisible: false,
        ip: '',
        hostname:'',
        stop:false
      },
      infodata: {
        dialogPerform: false,
       
      },
      adddata: {
        addHost: false
      },
      currentPage:1,
      totalCount:1
    };
  },
  methods: {
    init() {
      this.getquery();
    },
    getquery(num) {
      let pagenum = {};
      if(num){
        pagenum = {
          start	:num
        }
      }
      this.axios.get("/host/query",pagenum).then(data => {
        if (data.data.code == 200) {
          if (data.data.data != "") {
            this.hostlist = data.data.data.data;
            this.currentPage = data.data.data.pager.page+1;
            this.totalCount = data.data.data.pager.totalPageCount*10
          }
        }
      });
    },
    addhostname(data) {
      if (data || data != "") {
        this.init();
      }
    },
    showpop(row) {
      this.rundata.dialogVisible = !this.rundata.dialogVisible;
      this.rundata.ip= row.ip;
      this.rundata.hostname = this.hostname;
      
    },
    stopPop(row){
        // this.rundata.stop = true;
        // console.log(row);
        this.axios.get('/tools/stop',{ip:row.ip,type:this.hostname}).then((data)=>{
            this.$message({
                type: "success",
                message: data.data.data
              });
        })
    },
    showPerform(row) {
      this.infodata.hostname=this.hostname;
      this.infodata.ip = row.ip;
      this.infodata.dialogPerform = !this.infodata.dialogPerform;
    },
    deletebtn(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .delete("/host/delete", { params: { ip: row.ip } })
            .then(data => {
              console.log(data, "-----data");
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.init();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    showResult(row) {
      console.log(row);
      this.$router.push("/?entityId=" + row.id);
    },
   
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      if(val>1){
       this.getquery(val-1)
      }
    }
  }
};
</script>

<style lang="stylus">
.Hostlist div i {
  margin: 0 5px;
  font-size: 1.2em;
  vertical-align: middle;
}

.Hostlist {
  .pagination {
    text-align: center;
    margin-top: 15px;
  }

  table {
    thead {
      .check {
        div {
          display: none;
        }
      }
    }
  }
}
</style>