//PokemonList Store Module

import PokeApi from '@/services/api/pokemon'

export default {
	namespaced: true,
	strict: true,

	state: {
		list: [],
		currentPage: null
	},

	mutations: {
		setList(state, payload) {
			state.list = payload
		},
		setPage(state, payload) {
			state.currentPage = payload
		}
	},

	actions: {
		getPokemon({commit}, identifier) {
			return PokeApi.getPokemon(identifier)
			.then(pokemon => {
				commit('setList', pokemon)
			})
			.catch(error => console.log(error))

		},
		getPokedex(context, query) {
			context.commit('setPage', query)
			return PokeApi.getPokedex(query.limit, query.offset)
				.then((response, dispatch) => {
					context.dispatch('getPokemon', response)
				})
				.catch(error => {
					console.log(error)
				})
		},
		getNextPage({dispatch, state}, payload) {
			let query = state.currentPage
			dispatch('getPokedex', {limit: query.limit, offset: query.offset + query.limit})
		}
	}
}