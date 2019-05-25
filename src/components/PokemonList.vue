<template>
	<ul class="pokemon-list">
		<!-- <li class="pokemon-list__item" v-for="item in list">
			<PokemonCard 
				:name = "item.name"
				:imagePath = "item.imagePath"
				:id = "item.id"
				:types = "item.types"
				:stats = "item.stats"
				:color = "item.color"
			/>
		</li> -->
	</ul>
</template>

<script>
// import PokemonCard from './PokemonCard.vue';
import Utility from '../scripts/utils.js';
import axios from 'axios';


export default {
	name: 'PokemonList',
	components: {
		// PokemonCard
	},
	data() {
		return {
			list: null,
			color: 'a color',
			Utility: Utility
		}
	},
	mounted() {
		axios
		.get('https://pokeapi.co/api/v2/pokemon')
		.then(response => {
			let pokemonList = [];
			let pokemonColors = []
			response.data.results.forEach( (pokemon) => {
				axios
				.get(pokemon.url)
				.then(response => {
					pokemonList.push(response.data)
					axios
					.get(response.data.species.url)
					.then(response => {
						pokemonColors.push(response.data)
					})
					return {pokemonList, pokemonColors}
				}).then(resonse =>{
					console.log('list', pokemonList)
					console.log('colors', pokemonColors)
				})
				
			})
		});
		// axios
		// .get('https://pokeapi.co/api/v2/pokemon')
		// .then(response => {
		// 	let pokemonList = [];
		// 	return axios.get(response.data.results[0].url)
		// }).then( (response) =>{
		// 	console.log('response', response.data)
		// });
		// axios
		// .get('https://pokeapi.co/api/v2/pokemon')
		// .then(response => {
		// 	console.log(response.data.results[0])
		// });
	},
}
</script>

<style lang="sass">
	@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap');
	@import '../../public/assets/sass/pokemon-list.sass'

</style>