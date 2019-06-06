<template>
	<section class="pokemon-list">
		<ul class="filters">
			<li><input type="submit" @click="filter = $event.target.name" name="name" value="Name" /></li>
			<li><input type="submit" @click="filter = $event.target.name" name="id" value="ID" /></li>
			<li><input type="submit" @click="filter = $event.target.name" name="total" value="Total" /></li>
			<li><input type="submit" @click="filter = $event.target.name" name="speed" value="Speed" /></li>
			<li><input type="submit" @click="filter = $event.target.name" name="attack" value="Attack" /></li>
			<li><input type="submit" @click="filter = $event.target.name" name="defense" value="Defense" /></li>
			<li><input type="submit" @click="filter = $event.target.name" name="special-attack" value="Special Attack" /></li>
			<li><input type="submit" @click="filter = $event.target.name" name="special-defense" value="Special Defense" /></li>
			<li><input type="submit" @click="filter = $event.target.name" name="hp" value="HP" /></li>
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
			click(event) {
				console.log(event)
			}
		}

	}

</script>

<style>
	.filters {
		display: flex;
		list-style-type: none;
	}
</style>