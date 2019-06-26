//UserTeam Store Module
import firebase from '@/vendor/firebase'

export default {
	namespaced: true,
	strict: true,

	state: {
		teams: null,
		user: null,
	},

	getters: {
		getUser: state => {
			return state.user
		}
	},

	mutations: {
		setUser: (state, payload) => { 
			state.user = payload; 
		},
		removeUser: state => {
			state.user = null;
		}
	},

	actions: {
		setUser: ({commit}, userData) => {
			commit('setUser', userData);
		}
	}
}