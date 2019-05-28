<template>
	<Fade class="pokemon-list" group tag="ul" :stagger="40" :duration="800" easing="easeOutQuint" direction="up" amount="100vh">
		<li 
			class="pokemon-list__item" 
			v-for="(item, index) in list" 
			:key="item.id" 
			v-bind:data-index="index"
			v-on:mouseenter="animateInLeft"
			v-on:mouseleave="animateOutLeft"
		>
			<PokemonCard
				:name = "item.name"
				:id = "item.id"
				:imageId = "item.id"
				:types = "item.types"
				:stats = "item.stats" 
				:color = "item.color"
			/>
		</li>
	</Fade>
</template>

<script>
	import PokemonCard from './PokemonCard.vue';
	import Fade from './transitions/Fade.vue'
	import Utility from '../scripts/utils.js';
	import axios from 'axios';
	import _ from 'underscore';
	import anime from 'animejs';


export default {
	name: 'PokemonList',
	components: {
		PokemonCard,
		Fade
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
						let calcHolder = 0
						_.each(item.stats, item => {
							calcHolder += item.base_stat

						})
						let total = {
							base_stat: calcHolder,
							stat: {
								name: "total"
							}
						}
						item.stats.push(total)
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
		},
		enter: function (el) {
			var delay = el.dataset.index * 40
			setTimeout(function() {
				anime({
					targets: el,
					translateY: ['50vh', 0],
					opacity: 1,
					duration: 500,
					easing: 'easeOutQuart'
				})
			}, delay)

		},
		animateInLeft(event) {
			let el = event.target
			let name = el.getElementsByClassName('pokemon-card__name--background')
			let card = el.getElementsByClassName('pokemon-card')
			let img = el.getElementsByClassName('pokemon-card__image')

			
			
			anime({
				targets: name,
				opacity: [0,1],
				translateX: ['-50vh', 0],
				easing: 'easeOutQuint',
				duration: 250
			})

			anime.remove(card)
			anime({
				targets: card,
				backgroundPositionX: '75%',
				easing: 'easeOutQuint',
				duration: 250,
			})

			anime.remove(img)
			anime({
				targets: img,
				scale: 1.1,
				easing: 'easeOutQuad',
				duration: 250
			})

		},
		animateOutLeft(event) {
			let el = event.target
			let name = el.getElementsByClassName('pokemon-card__name--background')
			let card = el.getElementsByClassName('pokemon-card')
			let img = el.getElementsByClassName('pokemon-card__image')

			anime.remove(name)
			anime({
				targets: name,
				opacity: 0,
				translateX: [0, '-50vw'],
				duration: 500
			})

			anime.remove(card)
			anime({
				targets: card,
				backgroundPositionX: '0%',
				easing: 'easeOutQuint',
				duration: 250
			})

			anime.remove(img)
			anime({
				targets: img,
				scale: 1,
				easing: 'easeOutQuint',
				duration: 250
			})
		}
	}
}
</script>

<style lang="sass">

@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap');
@import '../../public/assets/sass/pokemon-list.sass'

</style>