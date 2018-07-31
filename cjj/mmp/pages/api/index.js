// pages/api/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canUseBtnGetUserInfo: wx.canIUse('button.open-type.getUserInfo'),
    obj: {
      a: {
        b: 1
      }
    }
  },
  
  getUserInfo (event) {
    console.log(event)
  },

  watch: {
    'obj.a': {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
      },
      immediate: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.init(function () {
      console.log('此处调接口获取页面数据')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})