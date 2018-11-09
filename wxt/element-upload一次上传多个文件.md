# element-ui upload组件多文件上传
```html
      <el-upload
      class="upload-demo fileType"
      ref="upload"
      action="${pageContext.request.contextPath}/lookup/editEvidence/123"上传文件接口
      :data="fileParams"
      :multiple="false"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-error="handleError"
      :on-success="handleSuccess"
      :before-upload="handleBefore"
      list-type="text"
      accept=".xlsx,.xls"
      :show-file-list="false"
      :file-list="fileList"
      :disabled="is_click"
      :auto-upload="true">
      <el-button  class="fileUp" :disabled="is_click">上传文件</el-button>
    </el-upload>
```

```js
data () {
  return {
    formDate: ""
  }
},
methods: {
    uploadFile(file) {
      this.formDate.append("file[]", file.file);//需要加个[],他是一个数组
    },
    saveInfo() {
      this.formDate = new FormData()
      this.loading = true;
      this.$refs.upload.submit();

      var id = this.$route.params.id;
      if (parseInt(this.$route.params.id) < 0) {
        id = "";
      }
      this.formDate.append("name", this.fileParams.name);//其他表单参数
      this.formDate.append("project_name", this.fileParams.project_name);
      this.formDate.append("describe", this.fileParams.describe);
      this.formDate.append("id", this.fileParams.id);

      this.$http.post("/task/add", this.formDate).then(({ data }) => {
        this.loading = false;
        if (data.success) {
          this.$message({
            type: "success",
            message: "提交成功"
          });
        } else {
          this.$message({
            type: "info",
            message: data.results.msg
          });
        }
      }).cac;
    },
}
```