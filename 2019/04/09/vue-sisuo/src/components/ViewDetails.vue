<template>
  <div class="ViewDetails">
    <el-dialog title="查看详情" :visible.sync="rundata.dialogVisible">
      <div id="term_demo" v-terminal></div>
    </el-dialog>
  </div>
</template>

<script>
import terminal from "jquery.terminal";
import "jquery.terminal/css/jquery.terminal.min.css";
export default {
  name: "ViewDetails",
  props: {
    rundata: {
      type: Object,
      default: {
        dialogVisible: false,
        info: "",
      }
    }
  },
  computed: {
    tabdata() {
      return this.rundata;
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {

  },
  mounted(){
      console.log(this.tabdata)
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
            greetings: "JavaScript Interpreter",
            name: "js_demo",
            height: 200,
            prompt: "js> "
          }
        );
      }
    }
  }
};
</script>

<style>
</style>

