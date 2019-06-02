import PokeApi from '@/services/api/pokemon'

export default {
	namespaced: true,

	state: {
		list: []
	},

	mutations: {
		SET_LIST (state, payload) {
			state.list = payload
		}
	},

	actions: {
		GET_LIST (context, config) {
			return PokeApi.getPokemon()
			.then(pokemon => {
				context.commit('SET_LIST', pokemon)
			})
			.catch(error => console.log(error))
			.finally(() => {
				console.log('done')
			})

		}
	}
}