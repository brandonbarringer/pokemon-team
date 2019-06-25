//PokemonDetail Store Module

import PokeApi from '@/services/api/pokemon'

export default {
	namespaced: true,
	strict: true,

	state: {
		activePokemon: null
	},

	mutations: {
		setActivePokemon: (state, payload) => {
			state.activePokemon = payload
		}
	},

	actions: {
		setActivePokemon: ({commit}, identifier) => {
			return PokeApi.getPokemon(identifier)
				.then(pokemon => {
					commit('setActivePokemon', pokemon[0].data)
				})
		}
	}
}