//app.js
import { wxPromisify, showBusy, showSuccess, checkSession, wxLogin, wxRequest, wxModal, getUserInfo } from './utils/util.js'
import init, { watch, computed } from './utils/watch.js'
let loginInstance = null 
App({
  onLaunch: function (options) {
    console.log(options)
    console.log('App onlaunch')
  },
  dev: true,
  init (callback) {
    let { loggedIn } = this.globalData
    // 检查session是否过期，如果过期则重新登录
    let page = getCurrentPages()
    if (page && page.length > 0) {
      let curPage = page[0]
      if (!curPage.__init__) {
        curPage.__init__ = true
        init(curPage.data)
        watch.call(curPage, curPage.watch)
        computed.call(curPage, curPage.computed)
      }
    }
    if (loggedIn) {
      return checkSession().then(() => {
        callback && callback()
      }).catch(() => {
        this.globalData.loggedIn = false
        return this.login(callback)
      })
    }
    return this.login(callback)
  },
  getUserInfo () {
    let { userInfo } = this.globalData
    if (userInfo) return Promise.resolve(userInfo)
    return getUserInfo()
  },
  // 登录方法
  login(callback) {
    // 登录
    if (loginInstance) return loginInstance
    showBusy('Now Loading...')
    return (loginInstance = wxLogin().then(({ code }) => {
        return this.getUserInfo().then(res => {
          let { encryptedData, iv } = res
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
          callback && callback()
          let { userinfo } = data.data
          this.globalData.loggedIn = true
          this.globalData.userInfo = userinfo
          this.globalData.openid = userinfo.openId
        } else {
          wx.hideToast()
          return Promise.reject(data)
        }
      }).catch(err => {
        let { errMsg, error } = err
        wx.hideToast()
        loginInstance = null
        if (errMsg && errMsg.indexOf('fail') > -1) return Promise.reject(new Error(errMsg))
        wxModal({
          title: '登录错误',
          content: `错误信息： ${JSON.stringify(errMsg || error)}`,
          confirmText: '重新登录'
        }).then(({ confirm }) => {
          if (confirm) {
            this.login(callback)
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