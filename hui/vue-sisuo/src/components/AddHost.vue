<template>
  <div class="AddHost">
    <el-dialog title="添加主机" :visible.sync="adddata.addHost">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item label="远程主机" :label-width="formLabelWidth" prop="addHostIp">
          <el-input autocomplete="off" v-model="ruleForm.addHostIp"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="addHostName">
          <el-input autocomplete="off" v-model="ruleForm.addHostName"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="addHostPw">
          <el-input autocomplete="off" type="password" v-model="ruleForm.addHostPw"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetForm('ruleForm')">取消</el-button>
        <el-button type="primary" @click="addhost">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddHost",
  props: {
    adddata: {
      type: Object,
      default: {
        addHost: false
      }
    }
  },
  data() {
    return {
      formLabelWidth: "100px",
      ruleForm: {
        addHostName: "",
        addHostPw: "",
        addHostIp: ""
      }
    };
  },
  methods: {
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.adddata.addHost = false;
    },
    addhost() {
      if (this.ruleForm.addHostIp == "") {
        this.$message({
          type: "info",
          message: "IP地址不能为空"
        });
        return;
      }
      if (this.ruleForm.addHostPw == "") {
        this.$message({
          type: "info",
          message: "密码不能为空"
        });
        return;
      }
      if (this.ruleForm.addHostName == "") {
        this.$message({
          type: "info",
          message: "用户名不能为空"
        });
        return;
      }
      let form = new FormData();
      form.append("ip", this.ruleForm.addHostIp);
      form.append("userName", this.ruleForm.addHostName);
      form.append("password", this.ruleForm.addHostPw);
      this.$http
        .post("/host/auth", form, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(data => {
          if (data.data.code == 200) {
            this.$emit("addonehost", true);
            this.adddata.addHost = false;
            this.resetForm('ruleForm')
          } else {
            this.$message({
              type: "info",
              message: data.data.resultMsg
            });
          }
        });
    }
  }
};
</script>

<style>
</style>
