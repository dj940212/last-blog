import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/common/less/index.less'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
