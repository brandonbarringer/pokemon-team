<template>
	<figure
		class="pokemon-card" 
		:style="{backgroundImage: putColor }">

		<NonSemanticText 
			class="pokemon-card__name--background" 
			:text="name" 
			:style="{backgroundImage: putColor }"/>

			<BackgroundImage class="pokemon-card__image" :src="getImageById(id) " />
			<figcaption class="expansion__leave">
				<div class="pokemon-card__preview">
					<NonSemanticText v-if="id" class="pokemon-card__id" :text="'#' + Utility.threeDigit(id)" />
					<Heading class="pokemon-card__name">
						<h2>{{Utility.capital(name)}}</h2>
					</Heading>
					<ul class="pokemon-card__type-list">
						<li class="pokemon-card__type-item" v-for="type in types" :key="type.type.name">
							<NonSemanticText class="pokemon-card__type" :class="type.type.name" :text="type.type.name" />
						</li>
					</ul>
				</div>
				<mq-layout mq="lg+" v-if="stats">
					<StatList class="pokemon-card__stat-list" :stats="stats" />
				</mq-layout>
			</figcaption>
			<figcaption>
				<div class="pokemon-card__details expansion__enter">
					<ul class="test">
						<li v-for="item in 10" class="test__item" :style="{backgroundImage: putColor}"></li>
					</ul>
				</div>
			</figcaption>
	</figure>
</template>

<script>
import Heading from './Heading.vue';
import NonSemanticText from './NonSemanticText.vue';
import StatList from './StatList.vue';
import BackgroundImage from './BackgroundImage.vue';

import axios from 'axios';
import Utility from '../scripts/utils.js';

export default {
	name: 'PokemonCard',
	components: {
		Heading,
		NonSemanticText,
		StatList,
		BackgroundImage
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
			return Utility.dynamicGradient('linear-gradient', 'to bottom right', [rgba1, rgba2, rgba1, rgba2])
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
		}
	}
}
</script>
<style lang="sass">
	
</style>