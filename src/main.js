import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import VueFuse from 'vue-fuse'
import VueClazyload from 'vue-clazy-load'
import firebase from '@/vendor/firebase'

Vue.config.productionTip = false

Vue.prototype.$pokemon = {
	imagePath: '/assets/images/pokemon/pngs/',
	addToTeam: (id) => {
		console.log(id)
	}
};

Vue.use(VueFuse)
Vue.use(VueClazyload)

let app = null;

// Initialize app only when firebase is initialized
// if the user is remembered, set the user
firebase.fb.auth().onAuthStateChanged((user) => {
	if(!app) {
		app = new Vue({
		  router,
		  store,
		  render: h => h(App)
		}).$mount('#app')
	}
	if(user) app.$store.dispatch('setUser', user.uid)
})