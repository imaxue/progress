// components/getUserInfo/index.js
import { wxPromisify, wxModal, getUserInfo } from '../../utils/util.js'
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    userInfoError () {
      this.setData({
        visible: false
      })
      wxModal({
        title: '提示',
        content: '授权被禁止，如需重新开启请点击左上角菜单-系统设置',
        showCancel: false
      })
    },
    getUserInfo ({ detail }) {
      console.log(detail)
      if (detail.errMsg.indexOf('fail') > -1) return this.userInfoError()
      app.globalData.userInfo = detail
      app.init().then(() => {
        this.setData({
          visible: false
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  attached () {
    console.log('component Attached')
    app.init().then(() => {
      this.setData({
        visible: false
      })
    }).catch(() => {
      this.setData({
        visible: true
      })
    })
  }
})
