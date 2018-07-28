// pages/music/index.js
import { getRandomColor, wxChooseVideo } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: '',
    list: []
  },
  danmu: '',
  videoContext: null,
  currentTime: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let list = Array.from({ length: Math.ceil(Math.random() * 20 + 10) }).map(() => {
      let color = getRandomColor()
      return {
        text: color,
        color,
        time: Math.random() * 20
      }
    })
    list.sort((a, b) => {
      return a.time - b.time
    })
    this.setData({
      list
    })
  },

  chooseVideo () {
    wxChooseVideo({
      camera: 'front'
    }).then(({ tempFilePath: video }) => {
      console.log(video)
      this.setData({ video })
    })
  },

  timeUpdate (event) {
    let { currentTime } = event.detail
    this.currentTime = currentTime
  },

  onInput (event) {
    this.danmu = event.detail.value
  },

  sendDanmu () {
    let danmu = {
      text: this.danmu,
      color: getRandomColor(),
      time: this.currentTime
    }
    this.setData({
      [`list[${this.data.list.length}]`]: danmu
    })
    this.videoContext.sendDanmu(danmu)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo', this)
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