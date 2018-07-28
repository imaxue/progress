function defineReactive(data, key, value, sourceKey, callback) {
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get () {
      return value
    },
    set (newVal) {
      let newValue = getValue(sourceKey, newVal)
      let oldValue = getValue(sourceKey, value)
      value = newVal
      if (newValue === oldValue) return
      callback && callback(newValue, oldValue)
    }
  })
}
export function watch (source) {
  if (!source) return
  Object.keys(source).forEach(key => {
    let target = source[key]

    let callback = (newValue, value) => {
      if (typeof target === 'function') {
        target.call(this, newValue, value)
      } else if (target && typeof target.handler === 'function') {
        target.handler.call(this, newValue, value)
      }
    }

    let segments = /\w+\./.test(key) ? key.split('.') : []
    let newKey = this.data.hasOwnProperty(key) ? key : segments.splice(0, 1)
    let value = getValue(key, this.data)

    if (target.immediate === true) {
      callback.call(this, value)
    }
    defineReactive(this.data, newKey, this.data[newKey], segments, callback.bind(this))
  })
}

function getValue (key, obj) {
  if (typeof obj !== 'object') return obj[key]
  if (typeof key === 'string') {
    if (obj.hasOwnProperty(key)) return obj[key]
    key = key.split('.')
  }
  return key.reduce((ret, key) => {
    return ret.hasOwnProperty(key) ? ret[key] : undefined
  }, obj)
}