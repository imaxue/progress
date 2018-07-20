const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
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

module.exports = {
  formatTime,
  wxPromisify
}
