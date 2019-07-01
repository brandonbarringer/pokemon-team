import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/vendor/firebase'
import data from '@/data/pokemon.min.json'

export default {
	namespaced: true,
	strict: process.env.NODE_ENV !== 'production',

	state: {},

	getters: {},

	mutations: {
		setActiveUser: (state, payload) => {
			state.activeUser = payload
		}
	},

	actions: {
		onUserAuth: async ({commit}, config) => {
			const router = config.router;
			const uid = config.response.user.uid;
			commit('setActiveUser', uid);
			router.replace('team');
		},
		authenticate: async ({dispatch}, config) => {
			let auth;
			let provider;

			if (config.signIn) {
				auth = await firebase.firebase.auth().createUserWithEmailAndPassword(config.email, config.password)
			} else if (config.signUp) {
				auth = await firebase.firebase.auth().signInWithEmailAndPassword(config.email, config.password);
			} else {
				provider = new firebase.firebase.auth.GoogleAuthProvider();
				auth = await firebase.firebase.auth().signInWithPopup(provider);
			}

			const authInfo = {
				router: config.router,
				response: auth
			};
			dispatch('onUserAuth', authInfo);
		}
	}
}