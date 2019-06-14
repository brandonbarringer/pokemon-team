import Vue from 'vue'
import Vuex from 'vuex'
import PokemonList from './modules/PokemonList'
import PokemonDetail from './modules/PokemonDetail'
import {fb} from '@/vendor/firebase'
// import config from '../config'

// firebase.initializeApp(config.config)

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const db = fb.firestore();

const pokemon = db.collection('pokemon').doc('bulbasaur')

const state = {
	list: []
}

const mutations = {
	setList(state, payload) {
		state.list = payload
	}
}

const actions = {
	getNamesAndStats({commit}) {
		pokemon.get()
		.then(item => {
			console.log(item)
		})
	}
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    PokemonList,
    PokemonDetail
  },
  strict: debug
})