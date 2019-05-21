<template>
	<ul>
		<li class="pokemon-card__container" v-for="pokemon in pokemon.list">
			<div class="pokemon-card">
				<PokemonImage v-bind:src="pokemon.sprites.front_default" />
				<PokemonId v-bind:id="'#' + makeThreeDigits(pokemon.id)" />
				<PokemonName v-bind:name="pokemon.name" />
				<ul>
					<li v-for="type in pokemon.types">
						<PokemonType v-bind:type="type.type.name" />
					</li>
				</ul>
				<div 
					class="pokemon-card__background"
					v-bind:style="{ 
					backgroundImage: 'url(' + pokemon.sprites.front_default + ')'
 				}">
						
				</div>
			</div>
		</li>
		<hr>
	</ul>
</template>

<script>
import PokemonName from './PokemonName.vue';
import PokemonId from './PokemonId.vue';
import PokemonType from './PokemonType.vue';
import PokemonImage from './PokemonImage.vue';
import axios from 'axios';

export default {
	name: 'PokemonCard',
	components: {
		PokemonName,
		PokemonId,
		PokemonType,
		PokemonImage,
	},
	data() {
		return {
			pokemon: {
				list: []
			}
		}
	},
	mounted() {
		this.getData('https://pokeapi.co/api/v2/pokemon', this.pokemon.list)
		console.log(this.pokemon.list)

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
		makeThreeDigits: function(num) {
			return ("00" + num).slice(-3);
		}
	}
}
</script>

<style lang="sass">
	.pokemon-image 
		width: 100%
	.pokemon-card
		width: 100%
		&__background
			position: absolute
			top: 0
			left: 0
			right: 0
			bottom: 0
			z-index: -1
			background-repeat: no-repeat
			background-size: 300%
			background-position: center center
			filter: blur(50px)
			-webkit-filter: blur(50px)
		&__container 
			max-width: 300px
			position: relative
			overflow: hidden
			display: flex
			flex-basis: 300px
			max-width: 300px
</style>