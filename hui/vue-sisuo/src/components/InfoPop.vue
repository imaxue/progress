<template>
  <div class="InfoPop">
    <el-dialog title="执行名称"  v-loading="loading" :visible.sync="infodata.dialogPerform" @open="closeDialog">
      <el-form :model="form">
        <el-form-item label="安装路径" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="执行次数" :label-width="formLabelWidth">
          <el-input-number v-model="form.num"  :max="100" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <div>默认命令</div>
      <el-table ref="multipleTable" :data="infolist" height="250" @select="changeSelect">
        <el-table-column prop="isExcute" type="selection" class-name="check"></el-table-column>
        <el-table-column prop="orderName" label="命令"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑">
              <i class="el-icon-setting" @click="changeCommand(scope.row,scope.$index)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除">
              <i class="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-button size="small" type="primary" @click="changeCommand">{{Commandlabel}}</el-button>
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
  props: ["infodata"],
  data() {
    return {
      formLabelWidth: "100px",
      form: {
        path: "",
        num: ""
      },
      infolist: [],
      CommandValue: "",
      innerVisible: false,
      multipleSelection: "",
      Commandlabel: "添加命令",
      changeIndex: null,
      loading:true
    };
  },
  created() {
    this.init();
  },
  computed: {
    tabdata() {
      return this.infodata;
    }
  },
  watch: {
    tabdata: {
      handler(val, oldval) {
        if (val.ip != "") {
          this.init();
        }
      },
      deep: true //对象内部的属性监听，也叫深度监听
    }
  },
  methods: {
    init() {
      if (this.tabdata.ip && this.tabdata.ip != "") {
        this.getinfolist();
      }
    },
    closeDialog(){
      console.log("111")
      // 初始数据
      this.form= {
        path: "",
        num: ""
      };
      this.infolist=[];
      this.CommandValue= "";
      this.multipleSelection= "";
      this.Commandlabel= "添加命令";
      this.changeIndex= null;
    },
    getinfolist() {
      this.axios
        .get("/order/query", {
          ip: this.tabdata.ip,
          type: this.tabdata.hostname
        })
        .then(data => {
          if (data.data.code == 200) {
            if (data.data.data != "") {
              var Popdata = JSON.parse(data.data.data.command);
              this.form.path = Popdata.path;
              this.form.num = Popdata.num;
              this.infolist = Popdata.orders;
              if (this.infolist.length > 0) {
                for (var i = 0; i < this.infolist.length; i++) {
                  if (
                    this.infolist[i].isExcute == "true" ||
                    this.infolist[i].isExcute == true
                  ) {
                    this.multipleSelection = i;
                    this.$nextTick(() => {
                      this.$refs.multipleTable.toggleRowSelection(
                        this.infolist[this.multipleSelection],
                        true
                      );
                    });
                    return;
                  }
                }
              }
              this.loading = false;
            }
          }
        });
    },

    changeSelect(selection, row) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(row);
      for (var i = 0; i < this.infolist.length; i++) {
        if (this.infolist[i]["orderName"] == row.orderName) {
          this.infolist[i]["isExcute"] = true;
        } else {
          this.infolist[i]["isExcute"] = false;
        }
      }
    },
    changeCommand(row, index) {
      this.innerVisible = !this.innerVisible;

      if (row.orderName) {
        this.Commandlabel = "编辑命令";
        this.CommandValue = row.orderName;
        this.changeIndex = index;
      } else {
        this.Commandlabel = "添加命令";
      }
    },
    CloseBtn() {
      this.infodata.dialogPerform = false;
    },
    ConfirmBtn() {
      // console.log(this.form, this.multipleSelection);
      let canupdata = false;
      console.log(this.infolist);
      for (var i = 0; i < this.infolist.length; i++) {
        if (
          this.infolist[i]["isExcute"] == true ||
          this.infolist[i]["isExcute"] == "true"
        ) {
          canupdata = true;
          break;
        }
      }
      if(this.form.path==''||!this.form.path){
        this.$message("路径不能为空");
        return;
      }
       if(this.form.num==0||this.form.num==''){
        this.$message("执行次数不能为空或者为0");
        return;
      }
      if (!canupdata) {
        this.$message("请选择一个命令");
      } else{
        this.axios
          .post("/order/update", {
            ip: this.tabdata.ip,
            type: this.tabdata.hostname,
            command: {
              path: this.form.path,
              num: this.form.num,
              orders: this.infolist
            }
          })
          .then(data => {
            console.log(data);
            if (data.data.code == 200) {
              this.CloseBtn();
            } else {
              this.$message(data.data.data);
            }
          });
      }
    },
    handleDelete(index, row) {
      this.infolist.splice(index, 1);
      this.axios
        .post("/order/update", {
          ip: this.tabdata.ip,
          type: this.tabdata.hostname,
          command: {
            path: this.form.path,
            num: this.form.num,
            orders: this.infolist
          }
        })
        .then(data => {
          console.log(data);
          if (data.data.code == 200) {
            this.getinfolist();
            this.$message("删除成功");
          } else {
            this.$message(data.data.data);
          }
        });
    },
    addCommand() {
      if (this.Commandlabel == "添加命令") {
        this.infolist.push({ isExcute: false, orderName: this.CommandValue });
      } else {
        this.infolist[this.changeIndex].orderName = this.CommandValue;
      }

      // 请求接口 重新渲染列表
      this.axios
        .post("/order/update", {
          ip: this.tabdata.ip,
          type: this.tabdata.hostname,
          command: {
            path: this.form.path,
            num: this.form.num,
            orders: this.infolist
          }
        })
        .then(data => {
          console.log(data);
          if (data.data.code == 200) {
            this.getinfolist();
            this.$message("修改成功");
            this.innerVisible = !this.innerVisible;
          } else {
            this.$message(data.data.data);
            this.innerVisible = !this.innerVisible;
          }
        });
    }
  }
};
</script>

<style>
</style>
