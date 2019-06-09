import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import VueFuse from 'vue-fuse'
import VueClazyload from 'vue-clazy-load'

Vue.config.productionTip = false

Vue.prototype.$pokemon = {imagePath: 'assets/images/pokemon/pngs/'}

Vue.use(VueFuse)
Vue.use(VueClazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
