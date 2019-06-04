//PokemonList Store Module

import PokeApi from '@/services/api/pokemon'
import listData from '@/data/pokemon.json'

export default {
	namespaced: true,
	strict: true,

	state: {
		list: [],
		currentPage: null,
		listData: listData
	},

	mutations: {
		setList(state, payload) {
			state.list = payload
		},
		addToList(state, payload) {
			state.list = state.list.concat(Object.freeze(payload))
		},
		setPage(state, payload) {
			state.currentPage = payload
		}
	},

	actions: {
		getPokemon({commit}, identifier) {
			return PokeApi.getPokemon(identifier)
				.then(pokemon => {
					commit('addToList', pokemon)
				})
			.catch(error => console.log(error))
		}
	}
}