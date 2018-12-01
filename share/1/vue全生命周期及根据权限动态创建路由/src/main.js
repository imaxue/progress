// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './vuex/store'

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.token){
    let token = sessionStorage.getItem('token') || '';
    if(token === ''){
      next({path: '/login'})
    }else{
      next()
    }
  }else{
    next()
  }
})
let paths = router.options.routes
store.dispatch('setRoutes', {routes: paths})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
