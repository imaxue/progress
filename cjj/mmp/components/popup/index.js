// components/popup/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: 2000
    },
    title: {
      type: String
    },
    visible: {
      type: Boolean,
      value: false,
      observer (newVal) {
        this.setData({
          show: newVal
        })
      }
    },
    closeOnClickModal: {
      type: Boolean,
      value: true
    }
  },

  // 其他配置
  options: {
    multipleSlots: true // 具名slot开启
  },
  // 组件样式
  externalClasses: [
    'popup-class',
    'popup-header',
    'popup-content'
  ],

  /**
   * 组件的初始数据
   */
  data: {
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onTap () {
      let visible = !this.data.visible
      this.data.closeOnClickModal && this.setData({ visible })
      this.triggerEvent(visible ? 'open' : 'close')
    },
    close () {
      this.setData({
        visible: false
      })
      this.triggerEvent('close')
    },
    open () {
      this.setData({
        visible: true
      })
      this.triggerEvent('open')
    }
  }
})
