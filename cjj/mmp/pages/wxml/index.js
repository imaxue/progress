// pages/wxml/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "just do IT",
    list: [{
      name: '阿雪',
      message: '我去，我又变强了。娇娇才是最胖的.原来这病是你传染给我的！这不科学。小姐姐有莹莹漂亮吗，我不就是偷了你一点能量'
    }, {
      name: '廖神',
      message: 'XXX专场，有没有去的？就你戏多,测试环境挂了,我的梦想是包养女大学生'
    }, {
      name: '浩南',
      message: '汤不热被毁了,我要退群!'
    }, {
      name: '老郭',
      message: '又给女票买了个包.廖神  大腿上还有位置吗？给我腾个地  我要抱'
    }, {
        name: '老白',
        message: 'npm run debug.这个耐操不是你想的那种。666'
    }, {
      name: '老黄',
      message: '妈蛋、菜鸡，那个小姐姐好漂亮!劳资信了你的邪!'
    }, {
      name: '娇娇',
      message: '那个什么... 我擦，你们都这个水平了啊'
    }, {
      name: '老王',
      messgae: '廖神说的对！此人为何口出狂言。清清的湖水，啊呀要....胸透以后一年不能怀孕'
    }, {
      name: '田杨',
      message: '薛婷做饭好吃啊。嫩，小姐姐，长的不错 我看到她的抖音了。别怂 就是干'
    }],
    isRed: false,
    buttonText: '点击切换样式类',
    visible: true
  },
  // 组件属性绑定
  changeClass ({ target }) {
    let { isRed } = this.data
    let { msg } = target.dataset
    this.setData({
      buttonText: isRed ? '点击切换样式类' : msg,
      isRed: !isRed
    })
  },
  // 条件渲染
  toggle () {
    this.setData({
      visible: !this.data.visible
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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