<template>
	<section class="pokemon-list">
		<ul class="filters">
			<li><button @click="filterList" name="name">Name</button></li>
			<li><button @click="filterList" name="id">ID</button></li>
			<li><button @click="filterList" name="total">Total</button></li>
			<li><button @click="filterList" name="speed">Speed</button></li>
			<li><button @click="filterList" name="attack">Attack</button></li>
			<li><button @click="filterList" name="defense">Defense</button></li>
			<li><button @click="filterList" name="special-attack">Special Attack</button></li>
			<li><button @click="filterList" name="special-defense">Special Defense</button></li>
			<li><button @click="filterList" name="hp">HP</button></li>
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
			filteredList: function()  {
				const filteredList = _.sortBy(this.list, (obj)=>{
					return obj[this.filter.name] || obj['id']
				})
				let finalData = this.filter.order === 'asc' ? filteredList : filteredList.reverse()
				return finalData
			} 
		}),
		data() {
			return {
				filter: {
					name: 'name',
					order: 'asc'
				}
			}
		},
		methods: {
			filterList(event) {
				let order = event.target.classList.contains('asc') ? 'desc' : 'asc'
				event.target.classList.toggle('asc')
				this.filter = {
					name: event.target.name,
					order: order
				}
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