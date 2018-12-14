# axios封装
```javascript
import axios from 'axios'
import { jsonp } from './jsonp'
import store from 'store'
import { isString } from '../utils'
import {
  HTTP_ERROR_STATUS
} from '../constant'

const CancelToken = axios.CancelToken
const requests = {}
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
  axios.interceptors.request.use(config => {
    config.cancelToken = cancelTokenHandler(config)
    // 给post请求统一添加token参数
    if (config.method === 'post') {
      let { data = {} } = config
      try {
        if (data && (isString(data))) {
          data = JSON.parse(data)
        }
      } catch (error) {
        console.error(error)
      }
      config.data = {
        ...data,
        _token: store.getters.token
      }
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  })

  axios.interceptors.response.use(response => {
    // 所有接口返回数据的success字段为false时，直接reject
    if (response.data.success === false) {
      return Promise.reject(response.data)
    }
    return response
  }, error => {
    if (error && error.response) {
      const { status, config } = error.response
      const message = HTTP_ERROR_STATUS[status]
      error.message = status === 404 ? `${message}:${config.url}` : message
    }
    return Promise.reject(error)
  })

  axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/mock' : ''

  axios.defaults.withCredentials = true

  axios.jsonp = jsonp

  Vue.prototype.$http = Vue.prototype.axios = axios
}

export default axios

```