import Vue from 'vue'
import Vuex from 'vuex'
import PokemonList from './modules/PokemonList'
import PokemonDetail from './modules/PokemonDetail'
import UserTeam from './modules/UserTeam'
import {fb} from '@/vendor/firebase'
// import config from '../config'

// firebase.initializeApp(config.config)

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const db = fb.firestore();

export default new Vuex.Store({
  modules: {
    PokemonList,
    PokemonDetail,
    UserTeam
  },
  strict: debug
})