<template>
	<ul class="pokemon-list">
		<li class="pokemon-list__item" v-for="pokemon in pokemon.list">
			<div class="pokemon-card__container">
				<div class="pokemon-card">
					<BackgroundImage class="pokemon-card__image" :imagePath="getImageById(pokemon.id) " />
					<div class="pokemon-card__content">
						<PlainText class="pokemon-card__id" :text="'#' + makeThreeDigits(pokemon.id)" />
						<Title class="pokemon-card__name" :title="capFirstLetter(pokemon.name)" />
						<ul class="pokemon-card__type-list">
							<li class="pokemon-card__type-item" v-for="type in pokemon.types">
								<PlainText class="pokemon-card__type" :class="type.type.name" :text="type.type.name" />
							</li>
						</ul>
					</div>
					<StatList class="pokemon-card__stat-list" :stats="pokemon.stats" />
					<BackgroundImage class="pokemon-card__background" :imagePath="getImageById(pokemon.id)" />
				</div>
				<div class="pokemon-card__shadow-container">
					<BackgroundImage class="pokemon-card__shadow" :imagePath="getImageById(pokemon.id)" />
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
import Title from './Title.vue';
import PlainText from './PlainText.vue';
import BackgroundImage from './BackgroundImage.vue';
import StatList from './StatList.vue';
import axios from 'axios';
import Utility from '../scripts/utils.js';


export default {
	name: 'PokemonCard',
	components: {
		Title,
		PlainText,
		BackgroundImage,
		StatList
	},
	data() {
		return {
			pokemon: {
				list: null
			},
		}
	},
	mounted() {
		console.log( Utility.getData('https://pokeapi.co/api/v2/pokemon', axios) );
		// console.log( Utility )
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
		getImageById(id) {
			const path = window.location.origin + '/assets/images/pokemon/pngs/';
			return path + this.makeThreeDigits(id) + '.png'
		},
		makeThreeDigits: function(num) {
			return ("00" + num).slice(-3);
		},
		capFirstLetter : function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		} 
	}
}
</script>

<style lang="sass">
	@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap');
	
	.pokemon-list
		width: 100%
		display: flex
		flex-wrap: wrap
		font-family: 'Roboto'
		&__item
			margin:
				right: 20px
				left: 20px
				bottom: 20px
				top: 20px
			flex-basis: 275px
			max-width: 275px
			cursor: pointer
	.pokemon-card
		max-width: 100%
		color: rgba(0,0,0,.5)
		position: relative
		overflow: hidden
		border-radius: 5px
		&__container
			border-radius: 5px
			width: 100%
			position: relative
		&__image
			width: 100%
			height: 220px
			margin:
				top: 50px
				bottom: 5px
			background:
				size: contain
				repeat: no-repeat
				position: center center
			filter: saturate(1.5)
		&__stat-list
			display: flex
			background-color: rgba(255,255,255,.3)
			text-align: center
			justify-content: space-between
			margin:
				top: 10px
			padding:
				left: 15px
				right: 15px
				top: 15px
				bottom: 15px
		&__stat-label
			font:
				size: 13px
				weight: 500
			opacity: .7
		&__stat-value
			font:
				size: 14px
				weight: 900
			opacity: .7
		&__background
			position: absolute
			top: 0
			left: 0
			right: 0
			bottom: 0
			z-index: -1
			background-repeat: no-repeat
			background-size: 1000%
			background-position: center center
			filter: blur(30px) saturate(2)
			opacity: .31
		&__shadow-container
			width: 100%
			height: 50px
			overflow: hidden
			position: relative
		&__shadow
			position: absolute
			top: 0
			left: 15%
			width: 70%
			height: 20%
			background:
				position: center center
				repeat: no-repeat
				size: 1000%
				color: rgba(0,0,0, .5)
			z-index: -2
			filter: blur(19px)
			opacity: .8
			transition: .2s
		&__content
			text-align: center
			padding: 
				right: 50px
				left: 50px
		&__type-list
			display: flex
			width: 100%
			align-items: center
			justify-content: center
		&__type-item
			
		&__type
			display: block
			padding:
				top: 5px
				right: 15px
				left: 15px
				bottom: 5px
			text-transform: uppercase
			font:
				size: 10px
			letter-spacing: .06em
			color: white
			background-color: rgba(50,50,50,.5)
			margin:
				right: 2px
				left: 2px
			border-radius: 100px
			&.bug
				background-image: linear-gradient(150deg, #57CA85, #194F68 )
			&.dark
				background-image: linear-gradient(150deg, #65799b, #5e2564 )
			&.electric
				background-image: linear-gradient(150deg, #F8C332, #FB8332 )
			&.fairy
				background-image: linear-gradient(150deg, #EA6060, #7117EA )
			&.fighting
				background-image: linear-gradient(150deg, #FB8332, #E64C4C )
			&.fire
				background-image: linear-gradient(150deg, #FCE38A, #F38181 )
			&.flying
				background-image: linear-gradient(150deg, #61DEC7, #8E2EF7 )
			&.ghost
				background-image: linear-gradient(150deg, #EFBFD5, #9D61FD )
			&.grass
				background-image: linear-gradient(150deg, #43E695, #3BB2B8 )
			&.ground
				background-image: linear-gradient(150deg, #FFB87A, #CD466B )
			&.ice
				background-image: linear-gradient(150deg, #38B8F2, #843CF6 )
			&.normal
				background-image: linear-gradient(150deg, #FC96B2, #794887 )
			&.poison
				background-image: linear-gradient(150deg, #EF33F2, #3544DC )
			&.psychic
				background-image: linear-gradient(150deg, #FF7676, #F54EA2 )
			&.rock
				background-image: linear-gradient(150deg, #C46424, #EA1212 )
			&.steel
				background-image: linear-gradient(150deg, #8EDBFB, #389695 )
			&.water
				background-image: linear-gradient(150deg, #17EAD9, #6078EA )
		&__id
			font:
				size: 12px
				weight: 900
			letter-spacing: .1em
			margin-bottom: 0px
		&__name
			font:
				size: 21px
				weight: 900
			letter-spacing: .05em
			margin:
				bottom: 5px


</style>