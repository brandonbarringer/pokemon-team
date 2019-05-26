<template>
	<div 
		class="pokemon-card" 
		:style="{
			backgroundImage: putColor
		}
	">
		<BackgroundImage class="pokemon-card__image" :imagePath="getImageById(id) " />
		<div class="pokemon-card__content">
			<PlainText class="pokemon-card__id" :text="'#' + Utility.threeDigit(id)" />
			<Title class="pokemon-card__name" :title="Utility.capital(name)" />
			<ul class="pokemon-card__type-list">
				<li class="pokemon-card__type-item" v-for="(type, index) in types" :key="index">
					<PlainText class="pokemon-card__type" :class="type.type.name" :text="type.type.name" />
				</li>
			</ul>
		</div>
		<StatList class="pokemon-card__stat-list" :stats="stats" />
	</div>
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
	props: {
		name: String,
		imageId: [String, Number],
		id: [String,Number],
		types: Array,
		stats: Array,
		color: String 
	},
	data() {
		return {
			list: null,
			colorsObj: {
				'black': ['#65799b', '#5e2564'],
				'blue': ['#17EAD9', '#6078EA'],
				'brown': ['#FFB87A', '#CD466B'],
				'gray': ['D6E4EB', 'A6C5D3'],
				'green': ['#43E695', '#3BB2B8'],
				'pink': ['#FF7676', '#F54EA2'],
				'purple': ['#EFBFD5', '#9D61FD'],
				'red': ['#FCE38A', '#F38181'],
				'white': ['D6E4EB', 'A6C5D3'],
				'yellow': ['#F8C332', '#FB8332']
			},
			Utility: Utility
		}
	},
	computed: {
		putColor: function() {
			let hex1 = this.colorsObj[this.color][0]
			let hex2 = this.colorsObj[this.color][1]
			let rgba1 = this.Utility.hexToRgba(hex1, 31)
			let rgba2 = this.Utility.hexToRgba(hex2, 31)
			return 'linear-gradient(to bottom right, ' + rgba1 + ', ' + rgba2 + ')'
		}
	},
	methods: {
		getImageById(id) {
			const path = window.location + '/assets/images/pokemon/pngs/';
			return path + this.Utility.threeDigit(id) + '.png'
		},
		getPokemonColorById(id) {
			this.Utility.getData('https://pokeapi.co/api/v2/pokemon-species/' + id, axios)
			.then(response => response.data.color.name )
		},
	}
}
</script>
<style lang="sass">
	
</style>