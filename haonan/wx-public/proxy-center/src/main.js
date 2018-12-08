// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from 'src/App'
import router from 'src/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'
import Loading from 'src/components/Loading'
import toast from 'src/functions/toast'

Vue.use(VueClipboard)
Vue.use(VueAxios, axios)

Vue.component('Loading', Loading)

Vue.prototype.$toast = toast

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})