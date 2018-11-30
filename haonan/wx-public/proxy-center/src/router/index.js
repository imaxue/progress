import Vue from 'vue'
import Router from 'vue-router'
import Home from 'src/components/Home'
import Withdraw from 'src/components/Withdraw'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: Withdraw
    }
  ]
})
