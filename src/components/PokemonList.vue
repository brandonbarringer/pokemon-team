<template>
	<ul>
		<li v-for="pokemon in pokemonList">
			<PokemonName v-bind:name="pokemon.name" />
			{{pokemon.weight}}
		</li>
	</ul>
</template>

<script>
import PokemonName from './PokemonName.vue';
import axios from 'axios';

export default {
	name: 'PokemonList',
	components: {
		PokemonName
	},
	data() {
		return {
			pokemonList: []
		}
	},
	mounted() {
		this.getData('https://pokeapi.co/api/v2/pokemon', this.pokemonList)

	},
	methods: {
		getData: function(url, dataContainer) {
			axios
			.get(url)
			.then(response => {
				let temp;
				temp = response.data.results;
				temp.forEach((item)=> {
					axios.get(item.url).then(results => {
						dataContainer.push(results.data);
					})
				})
			});
		},
		makeThreeDigits: function(num) {
			return ("00" + num).slice(-3);
		}
	}
}
</script>