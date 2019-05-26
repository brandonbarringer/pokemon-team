<template>
	<transition-group 
		class="pokemon-list" 
		tag="ul"
		name="staggered-fade"
		v-bind:css="false"
		v-on:before-enter="beforeEnter"
		v-on:enter="enter"
		v-on:leave="leave"
	>
		<li class="pokemon-list__item" v-for="(item, index) in list" :key="item.id" v-bind:data-index="index">
			<PokemonCard
				:name = "item.name"
				:id = "item.id"
				:imageId = "item.id"
				:types = "item.types"
				:stats = "item.stats" 
				:color = "item.color"
			/>
		</li>
	</transition-group>
</template>

<script>
	import PokemonCard from './PokemonCard.vue';
	import Utility from '../scripts/utils.js';
	import axios from 'axios';
	import _ from 'underscore';
	import velocity from 'velocity-animate'
// import {SlideYDownTransition} from 'vue2-transitions'


export default {
	name: 'PokemonList',
	components: {
		PokemonCard,
		// SlideYDownTransition
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
				promises = urls.map(url => axios.get(url))
				return {tempList, promises}
			}).then(res => {
				axios
				.all(res.promises)
				.then(res => {
					_.each(tempList, item => {
						let id = item.id
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
				})
			})
		})
		
	},
	methods: {
		beforeEnter: function (el) {
			el.style.opacity = 0
			el.style.marginTop = '50vh'
		},
		enter: function (el, done) {
			var delay = el.dataset.index * 50
			setTimeout(function () {
				velocity(
					el, 
					{ marginTop: 0, opacity: 1 },
					{ complete: done, easing: 'easeOutQuart' }
				)}, delay)
		},
		leave: function (el, done) {
			var delay = el.dataset.index * 50
			setTimeout(function () {
				velocity(el, { 
					marginTop: '200px',
					opacity: 0
				}, { complete: done } ) }, delay)
		}
	}
}
</script>

<style lang="sass">

@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap');
@import '../../public/assets/sass/pokemon-list.sass'

</style>