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
		state.activePokemon = state.data[payload]
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
	getDex: state => {
		return state.data
	}

};

const actions = {
	setActivePokemon: ({commit}, identifier) => {
		commit('setActivePokemon', identifier)
	},
	setUser: ({commit}, userData) => {
		commit('setUser', userData);
	},
	signIn: ({commit}, method) => {
		// commit('signIn', data)
	},
	signOut: ({commit}, data) => {
		fb.auth().signOut()
		.then(response => {
			commit('removeUser');
			this.$router.replace('/');
		})
		.catch(err => {
			console.log(err.message)
		})
		// commit('signOut', data)
	},
	signUpWithEmail: ({commit, dispatch}, credentials) => {
		fb.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
		.then(response => {
			dispatch('setUser', response.user.uid);
			this.$router.replace('team');
		})
		.catch(err => {
			console.error(err.message);
		})
	},
	signInWithGoogle: ({commit, dispatch}, credentials) => {
		const provider = new fb.auth.GoogleAuthProvider();

		fb.auth().signInWithPopup(provider)
		.then(response => {
			dispatch('setUser', response.user.uid);
			this.$router.replace('team');
		})
		.catch(err => {
			console.log('error: ', err.message)
		})
	},
};

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  strict: debug
})