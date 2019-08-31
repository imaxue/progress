### 发起网络请求的封装

#####: request.js

```

import fetch from '@system.fetch'
import prompt from '@system.prompt'
const devBaseUrl = '***'
const prodBaseUrl = '***'

function request(method = 'GET') {
  return (url, data = {}) => {
    return new Promise(async (resolve, reject) => {
      const baseUrl = devBaseUrl + '/'
      const body = {
        header: {},
        body: data
      }
      // console.log(JSON.stringify(body))
      const options = {
        url: baseUrl + url,
        method,
        header: { 'content-type': 'application/json' },
        data: JSON.stringify(body),
        success: function (data) {
          if (data && data.code !== 200) {
            prompt.showToast({ message: typeof data.data === 'string' ? data.data : JSON.stringify(data.data), duration: 1 })
            reject(data)
            return
          }
          const contentType = data.headers['content-type'] || data.headers['Content-Type']
          if (contentType.includes('application/json')) data.data = JSON.parse(data.data)
          resolve(data.data)
        },
        fail: function (data, code) {
          prompt.showToast({ message: typeof data === 'string' ? data : JSON.stringify(data) })
          reject({ data, code })
        }
      }
      fetch.fetch(options)
    })
  }
}

export default {
  get: request('GET'),
  post: request('POST'),
  delete: request('DELETE')
}

```
