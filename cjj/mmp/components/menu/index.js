// components/menu/index.js
import { setMultMenu, openSetting } from '../../utils/util.js'
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
    showMenu(e) {
      let itemList = ['系统设置']
      let itemEvent = [() => {
        this.setData({
          visible: true
        })
      }]
      if (app.dev) {
        let data = Object.keys(Array.from({ length: 20 }))
        itemList.push('打印Data', '分页', '清除缓存')
        itemEvent.push(() => {
          console.log('globalData:', app.globalData)
          let page = getCurrentPages()
          page = page[page.length - 1]
          console.log('pageData:', page.data)
        }, function (index) {
          setMultMenu({
            data,
            options: {
              event(item) {
                console.log(item)
              }
            }
          }, index)
        }, wx.clearStorage)
      }
      wx.showActionSheet({
        itemList,
        success: res => {
          let handle = itemEvent[res.tapIndex]
          handle && handle()
        }
      })
    },
    openSetting (event) {
      this.setData({
        visible: false
      })
      console.log(event)
    }
  }
})
