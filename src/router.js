import Vue from 'vue'
import Router from 'vue-router'
import PokemonList from './components/PokemonList.vue'
import PokemonDetail from './components/PokemonDetail.vue'
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'
import UserTeam from './components/UserTeam.vue'
import firebase from 'firebase'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/pokemon/:name',
      name: 'pokemon-detail',
      component: PokemonDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dex',
      name: 'pokemon-list',
      component: PokemonList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/team',
      name: 'user-team',
      component: UserTeam,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

/*
Tutorial: https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c
*/

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next('login');
  } else if (!requiresAuth && currentUser) {
    next('team')
  } else {
    next();
  }
})

export default router;
