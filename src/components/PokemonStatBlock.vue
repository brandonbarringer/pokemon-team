<template>
	<section class="pokemon-stat-block">
		<ul>
			<li v-for="stat in data.stats" :key="stat.stat.name">
				<span>{{stat.stat.name}}: </span>
				<span>{{stat.base_stat}} / </span>
				<span v-if="stat.stat.name === 'total'">{{statMaxTotal}}</span>
				<span v-else>{{statMax}}</span>
				<input v-on:keydown="calcIV" type="number" placeholder="IV" min="0" max="31">
				<input v-on:keydown="calcEV" type="number" placeholder="EV" min="0" max="252">
			</li>
		</ul>
	</section>
</template>

<script>
	import {mapState} from 'vuex'
	import constants from '@/data/constants.json'
	import calc from '@/utils/calc.js'

	export default {
		name: 'PokemonStatBlock',
		computed: mapState({
			data: state => state.PokemonList.activePokemon
		}),
		data() {
			return {
				statMax: constants.stats.max,
				statMaxTotal: constants.stats.max_total
			}
		},
		methods: {
			calcIV(event) {
				this.preventNonNumber(event)
				console.log(this.data)
			},
			calcEV(event) {
				this.preventNonNumber(event)
			},
			preventNonNumber(event) {
				const charCode = (event.which) ? event.which : event.keyCode
				if (charCode > 31 && (charCode < 48 || charCode > 57)) {
					event.preventDefault(); //stop character from entering input
				}
			}
		},
		mounted() {
			this.$store.dispatch('PokemonList/setActivePokemon', 1)
		}
	}

</script>

<style>
span, input {
	display: block
}
</style>