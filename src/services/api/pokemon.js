//pokemon api service

import axios from 'axios'
import _ from 'underscore'

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

export default {
	getPokemonByName(obj) {
		const names =  _.pluck(obj,'name');
		const promises = names.map(name => axios.get(baseUrl + name))

		return axios
				.all(promises)
				.then(pokemon => {
					return pokemon
				})

	},
	getPokemonById(obj) {
		const ids =  _.pluck(obj,'id');
		const promises = ids.map(id => axios.get(baseUrl + id))

		return axios
				.all(promises)
				.then(pokemon => {
					return pokemon
				})

	},
	getPokemonByUrl(obj) {
		const urls =  _.pluck(obj,'url');
		const promises = urls.map(url => axios.get(url))

		return axios
				.all(promises)
				.then(pokemon => {
					return pokemon
				})

	},
	getPokedex(limit, offset) {
		return axios
			.get(baseUrl + '?limit=' + limit + '&offset=' + offset)
			.then(results => {
				return results.data.results
			})
	}
	// getPokemonColor(nameOrURL) {
	// 	let url = nameOrURL.url ? nameOrURL : nameToUrl(nameOrURL.name);
	// 	function nameToUrl(name) {
	// 		return 'https://pokeapi.co/api/v2/pokemon/' + name
	// 	}
	// 	return axios
	// 			.get(url)
	// 			.then(response => {
	// 				return response.data
	// 			})
	// }

	
}