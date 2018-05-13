import Vue from 'vue'
import App from './App'

// Store
import store from '@/store/index'

// Router
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
