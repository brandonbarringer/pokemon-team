import axios from 'axios'

export default {
	getPokemon() {
		return axios
				.get('https://pokeapi.co/api/v2/pokemon/')
				.then(response => {
					console.log(response.data)
					return response.data.results
				})
	}

	
}