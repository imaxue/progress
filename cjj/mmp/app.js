//app.js
const { wxPromisify } = require('./utils/util.js')
const checkSession = wxPromisify(wx.checkSession)
const wxLogin = wxPromisify(wx.login)
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    this.init()
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  init () {
    let { loggedIn } = this.globalData
    if (loggedIn) {
      // 检查session是否过期，如果过期则重新登录
      checkSession().catch(this.login)
    } else {
      this.login()
    }
  },
  // 登录方法
  login () {
    wxLogin().then(({ code }) => {
      console.log(code)
    }).catch(err => {
      console.log(err)
      this.globalData.loggedIn = false
    })
  },
  globalData: {
    userInfo: null,
    loggedIn: false,
    openid: ''
  }
})