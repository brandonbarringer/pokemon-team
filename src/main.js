import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import VueFuse from 'vue-fuse'

Vue.config.productionTip = false

Vue.use(VueFuse)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
