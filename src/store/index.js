import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/vendor/firebase'
import PokeApi from '@/services/api/pokemon'
import data from '@/data/pokemon.min.json'

/* @TODO
Combine modules into this file. They are not needed
https://medium.com/javascript-in-plain-english/how-to-implement-a-showcase-web-app-in-vue-js-with-firebase-and-register-functionality-part-1-992089d17828
*/

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
	dex: data,
	activePokemon: null,
	teams: null,
	user: null,
};

const mutations = {
	setActivePokemon: (state, payload) => {
		state.activePokemon = state.dex[payload];
	},
	setUser: (state, payload) => {
		state.user = payload;
	},
	removeUser: state => {
		state.user = null;
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
		return state.user;
	},
	getDex: state => {
		return state.dex;
	}

};

const actions = {
	setActivePokemon: ({commit}, identifier) => {
		commit('setActivePokemon', identifier);
	},
	setUser: ({commit}, userData) => {
		commit('setUser', userData);
	},
	signInWithEmail: ({dispatch}, payload) => {
		firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
		.then(response => {
			dispatch('setUser', response.user.uid);
			payload.router.replace('team');
		})
		.catch(err => {
			console.error(err.message);
		});
	},
	signOut: ({commit}, payload) => {
		firebase.fb.auth().signOut()
		.then(response => {
			commit('removeUser');
			payload.router.replace('/');
		})
		.catch(err => {
			console.log(err.message);
		});
	},
	signUpWithEmail: ({dispatch}, payload) => {
		firebase.firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
		.then(response => {
			dispatch('setUser', response.user.uid);
			payload.router.replace('team');
		})
		.catch(err => {
			console.error(err.message);
		});
	},
	signInWithGoogle: ({dispatch}, payload) => {
		const provider = new firebase.firebase.auth.GoogleAuthProvider();

		firebase.firebase.auth().signInWithPopup(provider)
		.then(response => {
			dispatch('setUser', response.user.uid);
			payload.router.replace('team');
		})
		.catch(err => {
			console.error(err.message);
		});
	},
};

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  strict: debug
})