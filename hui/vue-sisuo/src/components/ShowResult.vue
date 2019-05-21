<template>
  <div class="Result">
    <!-- <div>{{resultdata}}</div> -->
    <el-table :data="isShow.rowlist" stripe style="width: 100%">
      <el-table-column prop="time" :formatter="formatDate" label="时间"></el-table-column>
      <el-table-column prop="result" label="结果">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查看结果">
            <i class="el-icon-notebook-1" @click="queryresult(scope.row)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="log" label="日志">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查看日志">
            <i class="el-icon-document-checked" @click="querylog(scope.row)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="DL" label="下载">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="下载">
            <a :href="someurl+isShow.infodata+'_'+scope.row.time+'.log'" download title="下载">
              <i class="el-icon-download"></i>
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="titletext" v-if="dialogVisible" :visible.sync="dialogVisible">
      <div id="term_demo" v-terminal></div>
    </el-dialog>
  </div>
</template>
<script>
import terminal from "jquery.terminal";
import "jquery.terminal/css/jquery.terminal.min.css";
export default {
  name: "Result",
  data() {
    return {
      resultlist: [],
      dialogVisible: false,
      titletext: "",
      someurl: "/applications/download?fileName="
    };
  },
  created() {
    if (process.env.NODE_ENV !== "production") {
      this.someurl = "/api/applications/download?fileName=";
    }
  },
  props: ["resultdata"],
  watch: {
    isShow: {
      handler(val, oldval) {
        console.log(val, oldval, "---val");
        // if (val.ip != "") {
        //   this.init();
        // }
      },
      deep: true //对象内部的属性监听，也叫深度监听
    }
  },
  computed: {
    isShow() {
      return this.resultdata;
    }
  },
  methods: {
    formatDate(row, column) {
      let date = new Date(parseInt(row.time));
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      let h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    querylog(row) {
      this.dialogVisible = !this.dialogVisible;
      this.titletext = "查看日志";
      this.axios
        .get(`/log/${this.isShow.infodata}/query`, { time: row.time })
        .then(data => {
          if (data.data.code == 200 && data.data.data != "") {
            for (let i = 0; i < data.data.data.length; i++) {
              $(".cursor-line").append(`<div>${data.data.data[i]}</div>`);
            }
          }
        });
    },
    queryresult(row) {
      this.dialogVisible = !this.dialogVisible;
      this.titletext = "查看结果";
      this.axios
        .get(`/result/${this.isShow.infodata}/query`, { time: row.time })
        .then(data => {
          if (data.data.code == 200 && data.data.data != "") {
            for (let i = 0; i < data.data.data.length; i++) {
              $(".cursor-line").append(`<div>${data.data.data[i]}</div>`);
            }
          }
        });
    }
  },
  directives: {
    terminal: {
      inserted(el) {
        $(el).terminal(
          function(command) {
            if (command !== "") {
              try {
                var result = window.eval(command);
                if (result !== undefined) {
                  this.echo(new String(result));
                }
              } catch (e) {
                this.error(new String(e));
              }
            } else {
              this.echo("");
            }
          },
          {
            greetings: "The results",
            name: "js_demo",
            height: 400,
            prompt: "$ >",
            keydown: function() {
              return false;
            }
          }
        );
      }
    }
  }
};
</script>
