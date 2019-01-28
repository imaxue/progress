<template>
  <div>
    <el-upload
      :data="fileFrom"
      class="upload-demo fileType"
      ref="upload"
      :multiple="multiple"
      action="${pageContext.request.contextPath}/lookup/editEvidence/123"
      :auto-upload="false"
      :http-request="uploadFile"
      :on-remove="handleRemove"
      :on-change="handlechange"
      :before-remove="handleRemoveBefore"
      :on-error="handleError"
      :on-success="handleSuccess"
      :file-list="fileList"
    >
      <el-button
        slot="trigger"
        size="small"
        type="primary"
      >选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
      >上传文件</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
    <el-progress v-if="percentageShow" :stroke-width="18" :percentage="percentage"></el-progress>
  </div>

</template>
<script>
export default {
  name: 'fileUpload',
  props: {
    fileFrom: {
      type: Object,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      percentageShow: false,
      percentage: 0,
      formDate: ' ',
      fileList: [],
      fileNum: 0
    }
  },
  watch: {
    percentage (val) {
      console.log(val)
      // this.percentage = th
    }
  },
  methods: {
    handlechange (file, fileList) {
      // console.log(this.fileList)
      this.fileNum = this.fileNum + 1
      // console.log(this.fileNum)
    },
    uploadFile (file) {
      this.formDate.append('file[]', file.file)
    },
    handleRemoveBefore () {
      this.fileNum = this.fileNum - 1
    },
    handleRemove (file, fileList) {
      if (!file.id) {
        return
      }
      this.$http
        .post('/task/delete', {
          id: file.id
        })
        .then(({ data }) => {
          if (data.success) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
          } else {
            this.$message({
              type: 'info',
              message: data.results.msg
            })
          }
        })
    },
    handleError (response, file, fileList) {
      this.loading = false
      this.$message({
        type: 'info',
        message: '上传失败'
      })
    },
    handleSuccess (response, file, fileList) {
      this.loading = false
      this.$message({
        type: 'info',
        message: response.results.msg
      })
    },
    submitUpload () {
      this.percentageShow = true
      this.formDate = new FormData()
      this.$refs.upload.submit()
      let that = this
      Object.keys(this.fileFrom).forEach((key) => {
        that.formDate.append(key, this.fileFrom[key])
      })
      this.$http({
        method: 'post',
        url: '/admin/report/reportUpload',
        data: this.formDate,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress (progressEvent) {
          console.log(progressEvent)
          if (progressEvent.lengthComputable) {
            let val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0)
            that.percentage = parseInt(val)
            console.log(that.percentage)
          }
        }
      }).then(function (response) {
        console.log(response)
        if (response.data.success === true) {
          if (that.percentage === 100) {
            that.$message({
              type: 'success',
              message: '上传成功'
            })
            that.$emit('refresh')
            that.percentageShow = false
            that.fileList = []
          }
        } else {
        }
      })
        .catch(function (error) {
          that.percentageShow = false
          that.fileList = []
          console.log(error)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
/deep/
  .el-progress-bar
    width 99%
    margin-top 50px
</style>
