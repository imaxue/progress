<<<<<<< HEAD
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
=======
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
Vue.prototype.$http.defaults.headers['open-id'] = '1'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // 用户存放全局共享数据
  data() {
    return {
      globalData: {}
    }
  }
})
>>>>>>> bf82cf837b3d74b050eda89122eee04de634d7fe
