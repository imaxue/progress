import Qs from 'qs'
import { on, off, randomStr } from '@/utils'
const VueJsonp = {}
/**
 * Jsonp
 * @param {string} url url地址
 * @param {object} params 参数
 * @param {object} options 配置
 * @param {string} options.callbackQuery jsonp函数名参数查询字段
 * @param {string} options.jsonpCallback jsonp函数名
 * @param {number} options.timeout 超时时间设置
 */
export function jsonp (url = '', params = {}, options = {}) {
  const { timeout, jsonpCallback, callbackQuery } = Object.assign({
    callbackQuery: 'callback',
    jsonpCallback: `jsonp_${randomStr()}`,
    timeout: 0
  }, options)

  return new Promise((resolve, reject) => {
    const headNode = document.querySelector('head')
    const scriptNode = document.createElement('script')

    on(scriptNode, 'error', onError)

    scriptNode.src = `${url}?${Qs.stringify({ ...params, [callbackQuery]: jsonpCallback })}`

    headNode.appendChild(scriptNode)
    let timer = null
    if (timeout > 0) {
      timer = setTimeout(() => {
        // 超时处理
      }, timeout)
    }
    // 添加获取数据的全局方法
    window[jsonpCallback] = res => {
      destroy()
      resolve(res)
    }

    // 错误处理
    function onError (event) {
      const error = {
        status: 400,
        statusText: 'Bad Request'
      }
      destroy()
      reject(error)
    }
    // 销毁
    function destroy () {
      clearTimeout(timer)
      off(scriptNode, 'error', onError)
      if (scriptNode.parentNode) {
        scriptNode.parentNode.removeChild(scriptNode)
      }
      delete window[jsonpCallback]
    }
  })
}

VueJsonp.install = (Vue) => {
  Vue.jsonp = Vue.prototype.$jsonp = jsonp
}

export default VueJsonp
