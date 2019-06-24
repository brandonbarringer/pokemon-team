//PokemonList Store Module

import PokeApi from '@/services/api/pokemon'
import data from '@/data/pokemon.min.json'

export default {
	namespaced: true,
	strict: true,

	state: {
		data: data,
		activePokemon: null
	},

	mutations: {
		setList(state, payload) {
			state.list = payload
		},
		setActivePokemon(state, payload) {
			state.activePokemon = payload
		}
	},

	actions: {
		getPokemon({commit}, identifier) {
			return PokeApi.getPokemon(identifier)
				.then(pokemon => {
					commit('addToList', pokemon)
				})
			.catch(error => console.log(error))
		},
		setActivePokemon({commit, state}, identifier) {
			let id = state.data[identifier - 1]
			commit('setActivePokemon', id)
		}
	}
}