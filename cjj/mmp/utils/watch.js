class Dep {
  constructor () {
    this.subs = []
  }
  push (target) {
    this.subs.push(target)
  }
  notify (newVal, oldVal) {
    for (const sub of this.subs) {
      sub.update(newVal, oldVal)
    }
  }
}

class Observer {

  constructor (data) {
    this.init(data)
  }

  init (data) {
    for (const key in data) {
      const value = data[key]
      this.defineReactive(data, key, value)
    }
  }

  defineReactive (data, key, value) {
    const dep = new Dep()
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get () {
        if (Dep.target) {
          dep.push(Dep.target)
        }
        return value
      },
      set (newValue) {
        if (newValue === value) return
        dep.notify(newValue, value)
        value = newValue
      }
    })
  }
}

class Watcher {

  constructor (ctx, key, callback) {
    Dep.target = this
    ctx.data[key]
    Dep.target = null
    this.callback = callback
  }

  update (newValue, oldValue) {
    this.callback && this.callback.call(this.ctx, newValue, oldValue)
  }
}

export function watch (obj) {
  if (!obj) return
  Object.keys(obj).forEach(key => {
    let target = obj[key]

    let callback = (newValue, value) => {
      if (typeof target === 'function') {
        target.call(this, newValue, value)
      } else if (target && typeof target.handler === 'function') {
        target.handler.call(this, newValue, value)
      }
    }

    if (target.immediate === true) {
      callback.call(this, this.data[key])
    }

    new Watcher(this, key, callback)
  })
}

export function computed (obj = {}) {
  let firstComputed = {}
  for (let key in obj) {
    let target = obj[key]
    let callback = () => {
      if (typeof target === 'function') {
        Dep.target = () => {
          let value = target.call(this)
          this.setData({
            [key]: value
          })
        }
      }
    }
    firstComputed[key] = target.call(this)
    Dep.target = null
  }
  this.setData(firstComputed)
}

export default function init (data) {
  new Observer(data)
}