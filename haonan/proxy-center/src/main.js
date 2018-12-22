// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from 'src/App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'
import VueCookies from 'vue-cookies'
import Loading from 'src/components/Loading'
import toast from 'src/functions/toast'

Vue.use(VueClipboard)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

Vue.component('Loading', Loading)

Vue.prototype.$toast = toast
// 如果有openId，则设置到请求头上
const openId = Vue.prototype.$cookies.get('openId')
Vue.prototype.$http.defaults.headers['open-id'] = openId ? openId : ''

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
