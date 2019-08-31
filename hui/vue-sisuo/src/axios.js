import axios from 'axios'
// import store from '../store'
import router from './router'
import { Message } from 'element-ui'
// import { SET_LOADING } from '../store/mutation-types'


const CancelToken = axios.CancelToken
const requests = {}
const httpErrorMessage = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
  }
// 通过判断请求参数中有无cancelToken字段，去取消重复的请求
const cancelTokenHandler = ({ data, url, method }) => {
  if (data && data.cancelToken) {
    let k = `${method}_${url}`
    requests[k] && requests[k]()
    return new CancelToken(c => {
      requests[k] = c
    })
  }
}

axios.install = (Vue) => {
  // const setLoading = ({ _loading } = {}, value) => {
  //   if (typeof _loading === 'string') {
  //     store.commit(SET_LOADING, { [_loading]: value })
  //   }
  // }
  axios.interceptors.request.use(config => {
    config.cancelToken = cancelTokenHandler(config)
    // 请求统一添加token参数
    // config.headers['X-CSRF-TOKEN'] = store.getters.token
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    // let data = config.data || config.params
    // setLoading(data, true)
    return config
  })

  axios.interceptors.response.use(response => {
    // let data = response.config.data || response.config.params
    // if (data) {
    //   if (typeof data === 'string') {
    //     try {
    //       data = JSON.parse(data)
    //     } catch (error) {
    //       console.error(error)
    //     }
    //   }
    //   setLoading(data, false)
    // }
    // 所有接口返回数据的success字段为false时，直接reject
    const { success } = response.data
    if (success === false) {
      return Promise.reject(response.data)
    }
    return response
  }, error => {
    if (error) {
      if (error.response) {
        const { status, config } = error.response
        const message = httpErrorMessage[status]
        error.message = status === 404 ? `${message}:${config.url}` : message
        /**
         * 419状态表示登录已失效，需要返回登录页面重新登录
         * 同时清除掉storage中已过期的token
         */
        const { path, params } = router.currentRoute
        if (/^4\d{2}/.test(status) && status !== 404 ) {
          // localStorage.removeItem('token')
          // localStorage.removeItem('token-admin')
          // router.push({ path: `/${params.lang}/login`, query: { redirect: path } })
          // window.location.href='/login.html'
          Message({
            type: 'error',
            message: error.message
          })
        } else {
          if (error.message) {
            Message({
              type: 'error',
              message: error.message
            })
          }
        }
      }
      // if (error.config) {
      //   let { data } = error.config
      //   if (typeof data === 'string') {
      //     try {
      //       data = JSON.parse(data)
      //     } catch (error) {
      //       console.error(error)
      //     }
      //   }
      //   setLoading(data, false)
      // }
    }
    return Promise.reject(error)
  })

  // 开发环境地址
  if (process.env.NODE_ENV !== 'production') {
    axios.defaults.baseURL = '/api'
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  axios.defaults.withCredentials = true

  const axiosGet = axios.get

  // 包装get方法，使其参数传递方式与post请求一致
  axios.get = (url, params, options = {}) =>
    axiosGet(url, { params, ...options })

  Vue.prototype.$http = Vue.prototype.axios = axios
}
export default axios
