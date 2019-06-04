<template>
	<section class="pokemon-list">
		<ul>
			<li v-for="pokemon in list" :key="pokemon.id">
				<span>{{pokemon.name}}</span>
				<ul>
					<li v-for="stat in pokemon.stats" :key="stat.stat.name">
						<span class="label">{{stat.stat.name}}: </span>
						<span class="value">{{stat.base_stat}}</span>
					</li>
				</ul>
			</li>
			
		</ul>
	</section>
</template>

<script>
	import {mapState} from 'vuex'
	import _ from 'underscore'

	export default {
		name: 'PokemonList',

		data() {
			return {
				total: null
			}
		},

		computed: mapState({
			list: state => state.PokemonList.listData
		}),
		methods: {
			calcStatTotal(stats) {
				return stats.reduce((partial_sum, a) => partial_sum + a,0)
			}
		}

	}

</script>

<style></style>