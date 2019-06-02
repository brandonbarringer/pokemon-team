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
		getPokemonByName({commit}, names) {
			return PokeApi.getPokemonByName(names)
			.then(pokemon => {
				commit('setList', pokemon)
			})
			.catch(error => console.log(error))

		},
		getPokemonById({commit}, ids) {
			return PokeApi.getPokemonById(ids)
			.then(pokemon => {
				commit('setList', pokemon)
			})
			.catch(error => console.log(error))

		},
		getPokemonByUrl({commit}, urls) {
			return PokeApi.getPokemonByUrl(urls)
			.then(pokemon => {
				commit('setList', pokemon)
			})
			.catch(error => console.log(error))

		},
		getPokedex(context, query) {
			context.commit('setPage', query)
			return PokeApi.getPokedex(query.limit, query.offset)
				.then((response, dispatch) => {
					context.dispatch('getPokemonByName', response)
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