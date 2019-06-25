import Vue from 'vue'
import Vuex from 'vuex'
import {fb} from '@/vendor/firebase'
import PokeApi from '@/services/api/pokemon'
import data from '@/data/pokemon.min.json'

/* @TODO
Combine modules into this file. They are not needed
https://medium.com/javascript-in-plain-english/how-to-implement-a-showcase-web-app-in-vue-js-with-firebase-and-register-functionality-part-1-992089d17828
*/

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const db = fb.firestore();

const state = {
	data: data,
	activePokemon: null,
	teams: null,
	user: null,
};

const mutations = {
	setActivePokemon: (state, payload) => {
		state.activePokemon = payload
	},
	setUser: (state, payload) => { 
		state.user = payload; 
	},
	removeUser: state => {
		state.user = null
	}
};

const getters = {
	getUser: state => {
		return state.user;
	},
	getActivePokemon: state => {
		return state.activePokemon;
	},
	getTeams: state => {
		return state.teams;
	},
	getUser: state => {
		return state.user
	},

};

const actions = {
	setActivePokemon: ({commit}, identifier) => {
		return PokeApi.getPokemon(identifier)
			.then(pokemon => {
				commit('setActivePokemon', pokemon[0].data)
			})
	},
	setUser: ({commit}, userData) => {
		commit('setUser', userData);
	},
	signIn: ({commit}, method) => {		
		// commit('signIn', data)
	},
	signOut: ({commit}, data) => {
		// commit('signOut', data)
	},
	signUp: ({commit}, method) => {
		// commit('signUp', data)
	},
};

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  strict: debug
})