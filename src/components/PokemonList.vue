<template>
	<ul>
		<li v-for="pokemon in pokemonList">
			<PokemonName v-bind:name="pokemon.name" v-bind:url="pokemon.url" />
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
				pokemonList: null,
			}
		},
		mounted() {
			axios
				.get('https://pokeapi.co/api/v2/pokemon')
				.then(response => {
			      this.pokemonList = response.data.results;
			  	});

		}
	}
</script>