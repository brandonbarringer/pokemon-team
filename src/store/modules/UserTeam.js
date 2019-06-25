//UserTeam Store Module
import {fb} from '@/vendor/firebase'

export default {
	namespaced: true,
	strict: true,

	state: {
		teams: null,
		user() {
			return fb.auth().onAuthStateChanged((user) => {
				return user.uid
			}
		}
	},

	mutations: {
		setActivePokemon(state, payload) {
			state.activePokemon = payload
		}
	},

	actions: {
		addPokemonToTeam({commit}, id) {},
		getUserTeam({commit}, uid) {},
	}
}