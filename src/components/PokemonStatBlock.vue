<template>
	<section class="pokemon-stat-block">
		<ul>
			<li v-for="stat in data.stats">
				<span>{{stat.stat.name}}: </span><span>{{stat.base_stat}} / {{stat.max_stat}}</span>
			</li>
		</ul>
	</section>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		name: 'PokemonStatBlock',
		computed: mapState({
			data: state => state.PokemonList.activePokemon
		}),
		mounted() {
			this.$store.dispatch('PokemonList/setActivePokemon', 1)
		}
	}

</script>

<style></style>