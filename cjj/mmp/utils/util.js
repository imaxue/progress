export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function wxPromisify(fn) {
  return function (obj = {}) {
    let instance = obj.instance || function () { }
    return new Promise((resolve, reject) => {
      Object.assign(obj, {
        success: resolve,
        fail: reject
      })
      instance(fn(obj))
    })
  }
}

export function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
}

// 判断数据类型的方法
const _typeof = (function () {
  let result = {}
  let dataMap = ['Array', 'String', 'Object', 'Number', 'Function', 'Date', 'Undefined', 'Null', 'RegExp', 'Error']
  dataMap.forEach(name => {
    result['is' + name] = function (data) {
      return Object.prototype.toString.call(data) === `[object ${name}]`
    }
  })
  return result
})()

export const { isArray, isString, isObject, isNumber, isFunction, isDate, isUndefined, isNull } = _typeof

export function getQueryString(url) {
  var ret = {};
  (typeof url === 'string' && url || location.search).replace(/\??([a-zA-Z0-9_]+)=([^&#]+)(&|#|$)/ig, function (e, key, value) {
    ret[key] = decodeURIComponent(value)
  })
  return ret
}

// 分割数组
export function splitArray(list, len) {
  let extraList = list.slice(len)
  return extraList.length ? [list.slice(0, len), ...splitArray(extraList, len)] : [list]
}

// 获取设备信息
export function getDeviceInfo() {
  let sysInfo = wx.getSystemInfoSync()
  if (sysInfo) {
    let width = sysInfo.windowWidth
    let height = sysInfo.windowHeight
    return {
      sysInfo,
      width,
      height,
      px2rpx: 750 / width,
      rpx2px: width / 750
    }
  }
}

/**
 * 更多菜单设置方法
 */
export function setMultMenu ({ data, options = { key: 'name', event: null } }, index = 0, flag = true) {
  if (!isArray(data)) return
  if (flag) {
    data = splitArray(data, 5)
    flag = false
  }
  let items = data[index]
  let { key, event } = options
  let itemList = items.map(function (item) {
    return item && typeof item === 'object' ? JSON.stringify(item[key]) : item
  })
  itemList.push('下一页')
  wx.showActionSheet({
    itemList,
    success: ({ tapIndex }) => {
      if (tapIndex > -1) {
        let item = items[tapIndex]
        if (item) {
          event && event(item)
        } else {
          if (index < data.length - 1) {
            setMultMenu({ data, options }, index + 1, false)
          } else {
            setMultMenu({ data, options }, 0, false)
          }
        }
      }
    }
  })
}


// 显示繁忙提示
export const showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
export const showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 获取一个随机十六进制颜色值
export function getRandomColor() {
  let rgb = '#'
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb += color
  }
  return rgb
}

/**
 *兼容requestAnimationFrame方法 
 *
 */

let lastTime = 0

export function requestAnimation(fn) {
  if (typeof requestAnimationFrame === 'function') {
    return requestAnimationFrame(fn)
  } else {
    let currTime = new Date().getTime()
    let timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
    let id = setTimeout(function () {
      fn(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }
}

/**
 * 兼容cancelAnimationFrame方法
 */

export function cancelAnimation(id) {
  if (typeof cancelAnimationFrame === 'function') {
    cancelAnimationFrame(id)
  } else {
    clearTimeout(id)
  }
}


export const checkSession = wxPromisify(wx.checkSession)

export const wxLogin = wxPromisify(wx.login)

export const wxRequest = wxPromisify(wx.request)

export const wxModal = wxPromisify(wx.showModal)

export const getUserInfo = wxPromisify(wx.getUserInfo)

export const wxChooseVideo = wxPromisify(wx.chooseVideo)