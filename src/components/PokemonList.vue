<template>
	<ul class="pokemon-list">
		<li class="pokemon-list__item" v-for="item in list">
			<PokemonCard 
				:name = "item.name"
				:imagePath = "item.imagePath"
				:id = "item.id"
				:types = "item.types"
				:stats = "item.stats"
				:color = "color"
			/>
		</li>
	</ul>
</template>

<script>
import PokemonCard from './PokemonCard.vue';
import Utility from '../scripts/utils.js';
import axios from 'axios';


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
		Utility.getData('https://pokeapi.co/api/v2/pokemon', axios)
		.then(response => {
			let temp;
			let arr = [];
			temp = response.data.results;
			temp.forEach((item ) => {
				axios.get(item.url).then(results => {
					arr.push(results.data);
				})
			})
			this.list = arr;
		});
	}
}
</script>

<style lang="sass">
	@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap');
	@import '../../public/assets/sass/pokemon-list.sass'

</style>