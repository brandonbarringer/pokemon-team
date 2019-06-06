<template>
	<section class="pokemon-list">
		<ul class="filters">
			<li><button v-model="filter" value="name">Name</button></li>
			<li><button v-model="filter" value="id">ID</button></li>
			<li><button v-model="filter" value="">Total</button></li>
			<li><button v-model="filter" value="">Speed</button></li>
			<li><button v-model="filter" value="">Attack</button></li>
			<li><button v-model="filter" value="">Defense</button></li>
			<li><button v-model="filter" value="">Special Attack</button></li>
			<li><button v-model="filter" value="">Special Defense</button></li>
			<li><button v-model="filter" value="">HP</button></li>
		</ul>
		<ul>
			<li v-for="pokemon in filteredList" :key="pokemon.id">
				<span>#{{pokemon.id}} - {{pokemon.name}}</span>
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
	import {mapState} from 'vuex';
	import _ from 'underscore';

	export default {
		name: 'PokemonList',

		computed: mapState({
			list: state => state.PokemonList.data,
			filteredList: function(event)  {
				let filter = this.filter
				console.log(event)
				return _.sortBy(this.list, filter)
			} 
		}),
		data() {
			return {
				filter: 'name',
			}
		},
		methods: {
			
		}

	}

</script>

<style>
	.filters {
		display: flex;
		list-style-type: none;
	}
</style>