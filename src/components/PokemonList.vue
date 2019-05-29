<template>
	<Fade class="pokemon-list" group tag="ul" :stagger="50" :duration="500" easing="cubicBezier(0.4, 0.0, 0.2, 1)" direction="up" amount="50vh">
		<li 
			class="pokemon-list__item" 
			v-for="(item, index) in list" 
			:key="item.id" 
			v-bind:data-index="index"
			v-on:mouseenter="animateInLeft"
			v-on:mouseleave="animateOutLeft"
			@click="animate"

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
	},
	methods: {
		animate(el) {
			this.expanded ? this.collapse(el) : this.expand(el)
		},
		expand(event) {
			this.expanded = true
			const el = event.target
			const toLeave = el.getElementsByClassName('expansion__leave')
			const toShow = el.getElementsByClassName('expansion__enter')
			const title = el.getElementsByClassName('pokemon-card__name--background')
			const ease = 'cubicBezier(0.4, 0.0, 0.2, 1)'
			const dur = 175
			const pos = el.getBoundingClientRect()
			const img = el.getElementsByClassName('pokemon-card__image')
			console.log(img)
			el.style.position = 'fixed';
			el.style.left = pos.x
			el.style.top = pos.y
			el.style.zIndex = 99
			img[0].style.backgroundPosition = 'center left'
			
			anime.remove(el)
			anime({
				targets: el,
				left: [pos.x, 0],
				top: [pos.y, 0],
				margin: [0,0,0,0],
				width: '100%',
				easing: ease,
				duration: dur
			})

			anime.remove(title)
			anime({
				targets: title,
				opacity: [0,1],
				translateX: ['-50vh', '250px'],
				translateY: [0,'50px'],
				easing: ease,
				duration: dur
			})

			anime.remove(toShow)
			anime({
				targets: toShow,
				opacity: [0,1],
				height: '100vh',
				easing: ease,
				duration: dur
			})

			anime.remove(img)
			anime({
				targets: img,
				height: '30vh',
				marginTop: '3vh',
				marginBottom: '3vh',
				marginLeft: '5vw',
				scale: [1.1, 1.1],
				easing: ease,
				duration: dur
			})

			anime.remove(toLeave)
			anime({
				targets: toLeave,
				opacity: [1,0],
				height: 0,
				easing: ease,
				duration: dur
			})
		},
		collapse(event) {
			console.log(event.target)
			this.expanded = false
		},
		animateInLeft(event) {
			if(this.expanded) return
			const el = event.target;
			const name = el.getElementsByClassName('pokemon-card__name--background');
			const card = el.getElementsByClassName('pokemon-card');
			const img = el.getElementsByClassName('pokemon-card__image');
			
			anime.remove(name)
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
				easing: 'easeOutQuint',
				duration: 250
			})

		},
		animateOutLeft(event) {
			if(this.expanded) return
			let el = event.target
			let name = el.getElementsByClassName('pokemon-card__name--background')
			let card = el.getElementsByClassName('pokemon-card')
			let img = el.getElementsByClassName('pokemon-card__image')

			anime.remove(name)
			anime({
				targets: name,
				opacity: 0,
				translateX: [0, '-50vw'],
				easing: 'easeOutQuint',
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
	},
	data() {
		return {
			list: null,
			Utility: Utility,
			color: 'green',
			expanded: false,
		}
	},
	mounted() {
		let url = 'https://pokeapi.co/api/v2/pokemon';

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
	
}
</script>

<style lang="sass">

@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap');
@import '../../public/assets/sass/pokemon-list.sass'

</style>