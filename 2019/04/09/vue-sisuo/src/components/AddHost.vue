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
        <el-button type="primary" @click="adddata.addHost=false">确认</el-button>
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
    }
  }
};
</script>

<style>
</style>
