<template>
	<ul class="pokemon-list">
		<li class="pokemon-list__item" v-for="item in sortById(list)" :key="item.id">
			<PokemonCard 
				:name = "item.name"
				:id = "item.id"
				:imageId = "item.id"
				:types = "item.types"
				:stats = "item.stats"
				:color = "item.color"
			/>
		</li>
	</ul>
</template>

<script>
import PokemonCard from './PokemonCard.vue';
import Utility from '../scripts/utils.js';
import axios from 'axios';
import _ from 'underscore';


export default {
	name: 'PokemonList',
	components: {
		PokemonCard
	},
	data() {
		return {
			list: null,
			color: 'a color',
			Utility: Utility
		}
	},
	mounted() {
		const url = 'https://pokeapi.co/api/v2/pokemon';
		let tempList = [];
		let tempColors = []
		axios
		.get(url)
		.then(res => {
			res.data.results.forEach(result => {
				axios
				.get(result.url)
				.then(res => {
					let pokemon = res.data
					axios
					.get(pokemon.species.url)
					.then(res => {
						 pokemon.color = res.data.color.name
						 tempList.push(pokemon)
						
					})
				})
			})
		})
		this.list = tempList
	},
	methods: {
		sortById: function(arr) {
			return _.sortBy(arr, 'id')
		}
	}
}
</script>

<style lang="sass">
	@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap');
	@import '../../public/assets/sass/pokemon-list.sass'

</style>