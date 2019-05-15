<template>
  <div class="ViewDetails">
    <el-dialog title="查看详情" :visible.sync="rundata.dialogVisible">
      <!-- <div>{{tabdata}}</div> -->
      <div id="term_demo" v-terminal></div>
    </el-dialog>
  </div>
</template>

<script>
import terminal from "jquery.terminal";
import "jquery.terminal/css/jquery.terminal.min.css";
import { setTimeout } from "timers";
export default {
  name: "ViewDetails",
  props: ["rundata"],
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
  watch: {
    tabdata: {
      deep: true,
      handler: function(newVal, oldVal) {
        console.log("newValue", newVal);
        console.log("oldValue", oldVal.text);
      }
    }
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      const wsuri = `ws://localhost:8090/websocket/${this.tabdata.ip}/${
        this.tabdata.hostname
      }`; //ws地址
      // let Hwebsock = new WebSocket(wsuri);
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },

    websocketonopen() {
      console.log("WebSocket连接成功");
    },
    websocketonerror(e) {
      //错误
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      //数据接收
      const redata = e.data; //注意：长连接我们是后台直接1秒推送一条数据，
      //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
      //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
      console.log(redata, "redata.value");
      // $(".cursor-line").append(m`<div>${redata}</div>`);
      //  $('#term_demo').terminal().insert(redata);
      //    console.log(redata, "11111");
      $(".cursor-line").append(redata);
    },

    websocketsend(agentData) {
      //数据发送
      this.websock.send(agentData);
    },

    websocketclose(evt,e) {
      //关闭
      console.log("connection closed (" + e + ")",evt);
    }
  },
  mounted() {
    console.log(this.tabdata);
  },
  created() {
    //页面刚进入时开启长连接
    this.initWebSocket();
    if (this.tabdata.stop) {
      this.websocketclose();
    }
  },
  destroyed: function() {
    //页面销毁时关闭长连接
    this.websocketclose();
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
            prompt: "",
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

<style>
</style>

