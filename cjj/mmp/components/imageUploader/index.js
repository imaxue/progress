// components/imageUploader/index.js
import { wxPromisify, wxModal } from '../../utils/util.js'
const chooseImage = wxPromisify(wx.chooseImage)
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    files: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    remove({ currentTarget }) {
      let { files } = this.data
      let { index } = currentTarget.dataset
      wxModal({
        title: '提示',
        content: '删除此图片',
        showCancel: true,
        cancelText: '取消',
        confirmText: '删除',
      }).then(({ confirm }) => {
        if (confirm) {
          files.splice(index, 1)
          this.setData({ files })
        }
      })
    },
    append () {
      let { count } = this.data
      chooseImage({ count }).then(({ tempFilePaths }) => {
        let files = [...this.data.files, ...tempFilePaths]
        this.setData({ files })
        this.triggerEvent('change', { files })
      })
    }
  }
})
