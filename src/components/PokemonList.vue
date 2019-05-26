<template>
	<slide-y-down-transition group class="pokemon-list" tag="ul">
		<li class="pokemon-list__item" v-for="item in list" :key="item.id">
			<PokemonCard
				:name = "item.name"
				:id = "item.id"
				:imageId = "item.id"
				:types = "item.types"
				:stats = "item.stats"
				:color = "item.color"
			/>
		</li>
	</slide-y-down-transition>
</template>

<script>
import PokemonCard from './PokemonCard.vue';
import Utility from '../scripts/utils.js';
import axios from 'axios';
import _ from 'underscore';
import {SlideYDownTransition} from 'vue2-transitions'


export default {
	name: 'PokemonList',
	components: {
		PokemonCard,
		SlideYDownTransition
	},
	data() {
		return {
			list: null,
			Utility: Utility,
			color: 'green'
		}
	},
	mounted() {
		
		const url = 'https://pokeapi.co/api/v2/pokemon';

		// axios
		// .get(url)
		// .then(res => {
		// 	let tempList = [];
		// 	res.data.results.forEach(result => {
		// 		axios
		// 		.get(result.url)
		// 		.then(res => {
		// 			let pokemon = res.data
		// 			axios
		// 			.get(pokemon.species.url)
		// 			.then(res => {
		// 				pokemon.color = res.data.color.name
		// 				tempList.push(pokemon)
		// 			})
		// 		})
		// 	})
		// 	return tempList
		// })
		// .then(res => {
		// 	console.log(res)
		// })
		let tempList = [];

		axios
		.get(url)
		.then(res => {
			let urls = _.pluck(res.data.results,'url');
			let promises = urls.map(url => axios.get(url))
			axios
			.all(promises)
			.then(res => {
				let urls = [];
				let promises;
				let color;

				_.each(res, item => {
					tempList.push(item.data)
					urls.push(item.data.species.url)
				})
				// this.list = tempList
				// this.color = 'green'
				promises = urls.map(url => axios.get(url))
				return {tempList, promises}
			}).then(res => {
				axios
				.all(res.promises)
				.then(res => {
					 // console.log('res', res)
					 // console.log('tempList', tempList)
					 // for each item in templist
					 // assign the items color to 
					 // the item in response that matches its id
					 _.each(tempList, item => {
					 	let id = item.id
					 	// console.log(item.id)
					 	let color = () => {
					 		let theColor;
					 		_.each(res, item => {
					 			if (item.data.id == id) {
					 				theColor = item.data.color.name
					 				return
					 			}
					 		})
					 		return theColor
					 	}
					 	item.color = color()
					 })
					 this.list = tempList
					 // console.log(tempList)
				})
			})
		})
		
	}
}
</script>

<style lang="sass">

	@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap');
	@import '../../public/assets/sass/pokemon-list.sass'

</style>