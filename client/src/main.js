import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import errors from './plugins/errors'
import Default from './layouts/Default'

Vue.component('DefaultLayout', Default)
Vue.use(errors)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
