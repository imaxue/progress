<template>
  <div class="Hostlist">
    <el-button @click="adddata.addHost=true">添加主机</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑">
            <i class="el-icon-setting" @click="showPerform(scope.row)"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="运行">
            <i class="el-icon-caret-right" @click="showpop(scope.row)"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="停止">
            <i class="el-icon-error"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除">
            <i class="el-icon-delete"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="result" label="结果">
        <el-tooltip class="item" effect="dark" content="查看结果">
          <i class="el-icon-search"></i>
        </el-tooltip>
      </el-table-column>
    </el-table>

    <ViewDetails :rundata="rundata"></ViewDetails>

    <InfoPop :infodata="infodata"></InfoPop>

    <AddHost :adddata="adddata"></AddHost>
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
  data() {
    return {
      tableData: [
        {
          id: "1",
          name: "王小虎"
        },
        {
          id: "2",
          name: "王小虎王小虎"
        },
        {
          id: "3",
          name: "王小虎王小"
        },
        {
          id: "4",
          name: "王小虎王小虎王小虎"
        }
      ],
      rundata: {
        dialogVisible: false,
        info: "112233"
      },
      infodata: {
        dialogPerform: false,
        id:0
      },
      adddata:{
        addHost: false,
      },
    };
  },
  methods: {
    init() {},
    showpop() {
      this.rundata.dialogVisible = !this.rundata.dialogVisible;
    },
    showPerform(row) {
      this.infodata.id = row.id
      this.infodata.dialogPerform = !this.infodata.dialogPerform;
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