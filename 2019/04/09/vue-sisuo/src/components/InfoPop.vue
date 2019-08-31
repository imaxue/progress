<template>
  <div class="InfoPop">
    <el-dialog title="执行名称" :visible.sync="infodata.dialogPerform">
      <el-form :model="form">
        <el-form-item label="路径" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="执行次数" :label-width="formLabelWidth">
          <el-input v-model="form.num" autocomplete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div>默认命令</div>
      <el-table ref="multipleTable" :data="gridData" @select="changeSelect">
        <el-table-column property="id" type="selection" class-name="check"></el-table-column>
        <el-table-column property="names" label="命令"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑">
              <i class="el-icon-setting" @click="changeCommand(scope.row)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除">
              <i class="el-icon-delete"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-button size="small" type="primary" @click="changeCommand">添加命令</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CloseBtn">取消</el-button>
        <el-button type="primary" @click="ConfirmBtn">确认</el-button>
      </span>
      <el-dialog width="30%" title="编辑命令" :visible.sync="innerVisible" append-to-body>
        <el-form>
          <el-form-item label="命令" :label-width="formLabelWidth">
            <el-input autocomplete="off" v-model="CommandValue"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCommand">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "InfoPop",
  props: {
    infodata: {
      type: Object,
      default: {
        dialogPerform: false,
        id:null
      }
    }
  },
  data() {
    return {
         formLabelWidth: "100px",
          form: {
          name: "",
          num: ""
        },
          gridData: [
          {
            id: "1",
            names: "王小虎"
          },
          {
            id: "2",
            names: "王小虎王小虎"
          },
          {
            id: "3",
            names: "王小虎王小"
          },
          {
            id: "4",
            names: "王小虎王小虎王小虎"
          }
        ],
        CommandValue: "",
        innerVisible: false
    };
  },
  computed: {
    tabdata() {
      return this.infodata;
    }
  },
  mounted(){
    //   获取id 请求gridData数据
      console.log(this.tabdata.id)
  },
  methods: {
    changeSelect(selection, row) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(row);
      this.multipleSelection = row.id;

      console.log(this.multipleSelection);
    },
    changeCommand(row) {
      this.innerVisible = !this.innerVisible;
      if (row) {
        console.log(row.names);
        this.CommandValue = row.names;
      }
    },
    CloseBtn() {
      this.dialogPerform = false;
    },
    ConfirmBtn() {
      console.log(this.form, this.multipleSelection);
    },
     addCommand() {
      // 请求接口 重新渲染列表
      this.$message("修改成功");
    },
  }
};
</script>

<style>
</style>
