//app.js
import { wxPromisify, showBusy, showSuccess, checkSession, wxLogin, wxRequest, wxModal, getUserInfo } from './utils/util.js'

let loginInstance = null 
App({
  onLaunch: function () {
    console.log('App onlaunch')
  },
  dev: true,
  init () {
    let { loggedIn } = this.globalData
    // 检查session是否过期，如果过期则重新登录
    if (loggedIn) {
      return checkSession().catch(() => {
        this.globalData.loggedIn = false
        return this.login()
      })
    }
    return this.login()
  },
  getUserInfo () {
    let { userInfo } = this.globalData
    if (userInfo) return Promise.resolve(userInfo)
    return getUserInfo()
  },
  // 登录方法
  login() {
    // 登录
    if (loginInstance) return loginInstance
    showBusy('Now Loading...')
    return (loginInstance = wxLogin().then(({ code }) => {
      return this.getUserInfo().then(res => {
        let { encryptedData, iv, signature } = res
        this.globalData.userInfo = res
        showBusy('登录中')
        return wxRequest({
          url: 'https://ovwkkrnj.qcloud.la/weapp/login',
          method: 'get',
          header: {
            'X-WX-Code': code,
            'X-WX-Encrypted-Data': encryptedData,
            'X-WX-IV': iv
          }
        })
      })
    }).then(({ data }) => {
      loginInstance = null
      if (data.code === 0) {
        showSuccess('登录成功')
        let { userinfo } = data.data
        this.globalData.loggedIn = true
        this.globalData.userInfo = userinfo
        this.globalData.openid = userinfo.openId
      } else {
        wx.hideToast()
        return Promise.reject(data)
      }
    }).catch(({ errMsg, error }) => {
      wx.hideToast()
      loginInstance = null
      if (errMsg && errMsg.indexOf('fail') > -1) return Promise.reject(new Error(errMsg))
      wxModal({
        title: '登录错误',
        content: `错误信息： ${JSON.stringify(errMsg || error)}`,
        confirmText: '重新登录'
      }).then(({ confirm }) => {
        if (confirm) {
          this.login()
        }
      })

    }))
  },
  globalData: {
    userInfo: null,
    loggedIn: false,
    openid: ''
  }
})