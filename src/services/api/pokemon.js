//pokemon api service

import axios from 'axios'
import _ from 'underscore'

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

export default {
	getPokemon(obj) {
		let promises
		switch(true) {
			case obj[0].hasOwnProperty('name'):
				promises = _.pluck(obj,'name').map(identifier => axios.get(baseUrl + identifier))
				break;
			case obj[0].hasOwnProperty('id'):
				promises = _.pluck(obj,'id').map(identifier => axios.get(baseUrl + identifier))
				break;
			case obj[0].hasOwnProperty('url'):
				promises = _.pluck(obj,'url').map(identifier => axios.get(identifier))
				break;
			default: throw new Error('Argument must contain an object with a name, url, or id')
		}
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
}