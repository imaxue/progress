### 本地存储storage的封装

#####： storage.js

```

import storage from '@system.storage'

function getJSON (key) {
  return new Promise((resolve, reject) => {
    storage.get({
      key,
      success: function (data) {
        try {
          const value = JSON.parse(data)
          resolve(value)
        } catch (e) {
          resolve(data)
        }
      },
      fail: function (data, code) {
        console.log(`handling fail, code = ${code}`)
        reject(new Error(data))
      }
    })
  })
}

function get (key) {
  return new Promise((resolve, reject) => {
    storage.get({
      key,
      success: function (data) {
        resolve(data)
      },
      fail: function (data, code) {
        console.log(`handling fail, code = ${code}`)
        reject(new Error(data))
      }
    })
  })
}

function set (key, value) {
  return new Promise((resolve, reject) => {
    storage.set({
      key,
      value,
      success: function (data) {
        resolve(data)
      },
      fail: function (data, code) {
        console.log(`handling fail, code = ${code}`)
        reject(new Error(data))
      }
    })
  })
}

function deleteKey (key) {
  return new Promise((resolve, reject) => {
    storage.delete({
      key,
      // value,
      success: function (data) {
        resolve()
      },
      fail: function (data, code) {
        console.log(`handling fail, code = ${code}`)
        reject(new Error(data))
      }
    })
  })
}

export default {
  getJSON,
  get,
  set,
  delete: deleteKey
}

````

### 用法：Example

```
import request from './request';
import storage from './storage';
import prompt from '@system.prompt'

/**
 * @desc 用户注册，并将用户信息保存到storage
 */
async register(phone, pass, valiCode) {
   const res = await request.post("loginV2", { wechatId: phone, flag: 1, pass, valiCode });
   if (res.body.err) { return prompt.showToast({ message: JSON.stringify(res.body.err)}) }
   if (typeof storage === "object") { await storage.set("user", JSON.stringify(res.body)); }
     console.log("注册并登录成功，保存用户信息", res.body);
     return res.body;
}

```
