// pages/lottery/index.js
import { requestAnimation, cancelAnimation, getDeviceInfo } from '../../utils/util'
const app = getApp()
const TWEEN = require('../../lib/tween.js')
// wheelOfFortune.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 540,
    height: 540,
    rotate: '', // 控制旋转的类名
    angle: 0,
    result: 0,
    timer: null,
    luckyUsers: [],
    lottery: [],
    isLotteried: !1,
    timer: null,
    t: null,
    w: 0,
    h: 0,
    x: 0,
    y: 0,
    deg: 0,
    allWidth: 0
  },

  // 绘制指针
  drawPointer() {
    let ctx = this.data.pointer || wx.createCanvasContext('pointer')
    let { rpx2px } = getDeviceInfo()
    if (!this.data.pointer) {
      this.setData({
        pointer: ctx
      })
    }
    ctx.drawImage('../../assets/images/pointer_01.png', 0, 0, 186 * rpx2px, 220 * rpx2px)
    ctx.draw()
  },

  // 绘制转盘
  drawWheel(d, flag) {
    let { rpx2px } = getDeviceInfo()
    let PI = Math.PI
    let n = this.data.lottery.length
    let radian = PI / 180 // 角度转弧度
    let arc1 = 360 / (n * n + n) * radian // 间隔区域的弧度
    let arc2 = arc1 * n // 奖品区域的弧度
    let c = this.data.width * rpx2px / 2 // 圆心坐标

    let ctx = this.data.wheel || wx.createCanvasContext('wheel')
    if (!this.data.wheel) {
      this.setData({
        wheel: ctx
      })
    }

    // 绘制转盘背景
    ctx.beginPath()
    ctx.arc(c, c, c, 0, PI * 2)
    ctx.setFillStyle('#F0D8C0')
    ctx.closePath()
    ctx.fill()

    // 绘制奖品扇区
    for (let i = 0; i < n; i++) {
      let arc = (arc1 + arc2) * i + d // 每一个奖品扇区的起始位置
      ctx.beginPath()
      ctx.setFillStyle('#FFF7F0')
      ctx.arc(c, c, c, arc, arc + arc2, false)
      ctx.arc(c, c, 1, arc, arc + arc2, true)
      ctx.closePath()
      ctx.fill()
      ctx.save()
      ctx.translate(c + Math.cos(arc2 / 2 + arc) * (c * 0.8), c + Math.sin(arc2 / 2 + arc) * (c * 0.8))
      ctx.rotate(arc2 / 2 + arc + PI / 2)
      ctx.setFillStyle('#23183F')
      ctx.setFontSize(16)
      ctx.setTextAlign('center')
      let arr = this.data.lottery[i].name.split('')
      let texts = []
      while (arr.length) {
        texts.push(arr.splice(0, 5).join(''))
      }
      for (let j = 0; j < texts.length; j++) {
        ctx.fillText(texts[j], 0, 17 * j + 10)
      }
      ctx.restore()
    }
    ctx.draw()
  },


  // 转盘旋转动画
  startRotate(time) {
    if (this.data.run) {
      this.setData({
        timer: requestAnimation(this.startRotate)
      })
    } else {
      cancelAnimation(this.data.timer)
    }
    TWEEN.update()
  },

  defaultRotate() {
    if (!this.data.isLotteried) {
      let deg = this.data.deg + 1
      this.drawWheel(Math.PI / 180 * deg)
      this.setData({
        t: requestAnimation(this.defaultRotate),
        deg
      })
    } else {
      cancelAnimation(this.data.t)
    }
  },

  // 转盘事件
  rotate(e) {
    let that = this
    if (this.data.run) return
    if (this.data.timer) return
    if (this.data.isLotteried) {
      wx.showModal({
        title: '提示',
        content: '您已抽过奖，谢谢参与',
        showCancel: false
      })
      return
    }
    let index = Math.floor(Math.random() * this.data.lottery.length)
    let res = {
      data: {
        rows: +this.data.lottery[index].id
      }
    }
    cancelAnimation(this.data.t)
    this.setData({
      result: this.data.lottery.findIndex((item, index) => {
        return +item.id === +res.data.rows
      }),
      run: true,
      t: null,
    })
    let PI = Math.PI
    let n = this.data.lottery.length
    let arc1 = 360 / (n * n + n)  // 间隔区域的角度
    let arc2 = arc1 * n // 奖品区域的角度
    requestAnimation(this.startRotate)
    let coords = { deg: 0 }
    let deg = 360 * 10 - (arc1 + arc2) * (this.data.result) - 90 - arc2 / 2
    let tween = new TWEEN.Tween(coords).to({
      deg
    }, 6000).easing(TWEEN.Easing.Cubic.InOut).onUpdate(() => {
      this.drawWheel(Math.PI / 180 * coords.deg, coords.deg >= deg)
      if (coords.deg >= deg) {
        tween.stop()
        this.setData({
          run: false,
          timer: null
        })
        wx.showModal({
          title: '抽奖结果',
          content: `恭喜获得${this.data.lottery[this.data.result].name}`,
          showCancel: false
        })
      }
    }).start()
  },

  // 此处请求获取抽奖奖品列表
  getLotteryActive() {
    let lottery = [{
      name: '谢谢参与',
      id: 0
    }, {
      name: '大保健优惠',
      id: 1
    }, {
      name: '变性手术优惠券',
      id: 2
    }, {
      name: '整容手术优惠',
      id: 3
    }]
    this.setData({
      lottery
    })
    this.drawWheel(0)
  },
  // 中奖人列表
  getLottery() {
    let luckyUsers = [{
      phone: '137****6666',
      reward: '大保健优惠',
      lottery_time: '10天前'
    }]
    luckyUsers = luckyUsers.slice(0, 20)
    let len = luckyUsers.length - 20
    if (luckyUsers.length && len < 0) {
      len = Math.abs(len)
      for (let i = 0; i < len; i++) {
        luckyUsers.push(luckyUsers[i])
      }
    }
    this.setData({
      luckyUsers
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    app.init().then(() => {
      this.drawPointer()
      this.getLotteryActive()
      this.getLottery()
    })
    this.defaultRotate()
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
    cancelAnimation(this.data.t)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.getLottery()
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