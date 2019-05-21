<template>
	<ul>
		<li v-for="pokemon in pokemonList">
			<PokemonName v-bind:name="pokemon.name" />
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
				pokemonList: [],
				baseList: null,
			}
		},
		mounted() {
			axios
				.get('https://pokeapi.co/api/v2/pokemon')
				.then(response => {
			      this.baseList = response.data.results;
			      this.baseList.forEach(function(item, index) {
			      	axios.get(item.url).then(results => {
			      		this.pokemonList.push(results.data);
			      		console.log(this.pokemonList);
			      	})
			      })
			  	});

		}
	}
</script>