<template>
	<section class="pokemon-stat-block">
		<ul>
			<li v-for="stat in data.stats" :key="stat.stat.name">
				<span>{{stat.stat.name}}: </span>
				<span>{{stat.base_stat}}</span>
				<span v-if="stat.stat.name === 'total'"> / {{statMaxTotal}}</span>
				<span v-else> / {{statMax}}</span>
			</li>
		</ul>
	</section>
</template>

<script>
	import {mapState} from 'vuex'
	import constants from '@/data/constants.json'

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
		mounted() {
			this.$store.dispatch('PokemonList/setActivePokemon', 1)
		}
	}

</script>

<style></style>