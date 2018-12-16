import Vue from 'vue'
import Router from 'vue-router'
import Home from 'src/containers/Home'
import Withdraw from 'src/containers/Withdraw'
import WithdrawHistory from 'src/containers/WithdrawHistory'
import DirectPush from 'src/containers/DirectPush'
import CopyDemo from 'src/containers/CopyDemo'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'home',
      component: Home
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: Withdraw
    },
    {
      path: '/withdraw/history',
      name: 'withdraw_history',
      component: WithdrawHistory
    },
    {
      path: '/directPush',
      name: 'directPush',
      component: DirectPush
    },
    {
      path: '/copydemo',
      name: 'copydemo',
      component: CopyDemo
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})

function urlArgs() {
  const args = {}
  const query = location.search.substring(1)
  const pairs = query.split("&")
  for (let i = 0; i < pairs.length; i++) {
    const pos = pairs[i].indexOf("=")
    if (pos == -1) continue
    const name = pairs[i].substring(0, pos)
    let value = pairs[i].substring(pos + 1)
    value = decodeURIComponent(value)
    args[name] = value
  }
  return args
}

const hitErrorCode = code => [10003, 10004, 10005, 10006, 10009, 10010, 10011, 10012, 10013, 10015, 10016].findIndex(item => item === code) !== -1

router.beforeEach((to, from, next) => {
  // 用户在公众号授权中间页点击按钮同意授权
  // 中间页重定向到项目地址，前端获取url中的code值
  // 这里需要注意，使用hash模式的路由，如http://www.hash.com/#/index
  // 授权通过后，回调地址会变成http://www.hash.com/?code=CODE&state=STATE#/index这种形式
  // 这样的使用$route.query是获取不到参数的，需要使用window.location原生解析
  let code = urlArgs().code
  if (code) {
    code = Number(code)
    // 有可能是错误的code
    if (hitErrorCode(code)) {
      const $toast = Vue.prototype.$toast
      switch (code) {
        case 10004:
          $toast('此公众号被封禁!', 0)
          break
        case 10006:
          $toast('请先关注此公众号!', 0)
          break
        case 10009:
          $toast('您的操作太频繁了，请稍后再试!', 0)
          break
        default:
          $toast('系统问题，请您稍后再试!', 0)
      }
    } else {
      // 往cookie里存一个全局标识，标识用户已经进行了授权
      Vue.prototype.$cookies.set("authorizationCode", +code)
    }
  }

  // 判断是否授权过，有可能以前授权过，二次进入页面，不需要再次授权
  const authorizationCode = Vue.prototype.$cookies.get('authorizationCode')
  if (authorizationCode) {
    next()
  } else {
    // 没授权过，请求数据，获取公众号授权中间页地址并跳转
    Vue.prototype.$http
      .get(`/api/auth/url?url=${origin}/&state=${''}`)
      .then(({ data }) => {
        if (data.code === 200) {
          window.location.href = data.result
        }
      })
  }
})

export default router
