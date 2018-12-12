import Vue from 'vue'
import Router from 'vue-router'
import Home from 'src/containers/Home'
import Withdraw from 'src/containers/Withdraw'
import WithdrawHistory from 'src/containers/WithdrawHistory'
import DirectPush  from 'src/containers/DirectPush'
import CopyDemo  from 'src/containers/CopyDemo'

Vue.use(Router)

export default new Router({
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
