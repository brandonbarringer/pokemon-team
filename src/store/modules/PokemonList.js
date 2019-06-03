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

		},
		getPokedex(context, query) {
			context.commit('setPage', query)
			return PokeApi.getPokedex(query.limit, query.offset)
				.then(response => {
					context.dispatch('getPokemon', response)
					// context.commit('setList', response)
				})
				.catch(error => {
					console.log(error)
				})
		},
		getNextPage({dispatch, state}, payload) {
			let query = state.currentPage
			dispatch('getPokedex', {limit: query.limit, offset: query.offset + query.limit})
		},
		// getAll({dispatch, state}) {
		// 	let query = state.currentPage
		// 	if (state.currentPage.offset > 120) return
		// 	dispatch('getNextPage')
		// 	console.log(state.currentPage.offset)

		// }
		getAll({commit}) {
			let data = []
			for (var i = 1; i < 200; i++) {
				data.push({
					id: i
				})
			}
			return PokeApi.getPokemon(data).then(pokemon => {
				commit('addToList', pokemon)
			})

		}
	}
}