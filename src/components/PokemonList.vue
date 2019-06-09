<!--
@todo
	Refactor:
		filters template
		FilteredList function
		FilterList function
-->
<template>
	<section class="pokemon-list">
		<vue-fuse
		:keys="keys"
		:list="list"
		:defaultAll="true"
		:threshold="0.0"
		@fuseResultsUpdated="results($event)"
		></vue-fuse>
		<ul class="filters">
			<li><button @click="filterList" class="asc" name="name">Name</button></li>
			<li><button @click="filterList" class="asc" name="id">ID</button></li>
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
				<clazy-load :src="getImagePathByID(pokemon.id) + '.png'" alt="">
					<img :src="getImagePathByID(pokemon.id) + '.png'" alt="">
				</clazy-load>
				<span>#{{pokemon.id}} - {{pokemon.name}}</span>
				<ul>
					<li v-for="type in pokemon.types" :key="type.type.name">Type: {{type.type.name}}</li>
				</ul>
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
				const getIndexOfParent = (obj, stringToMatch) => {
					let value;
					obj.stats.forEach((obj, index) => {
						if( obj.stat.name === stringToMatch ) {
							value = index
						}
					})
					return value;
				};
				const filteredList = _.sortBy(this.result, (obj) => {
					let index = getIndexOfParent(obj, this.filter.name)
					return obj[this.filter.name] || obj.stats[index].base_stat
				});
				let finalData = this.filter.order === 'asc' ? filteredList : filteredList.reverse();
				return finalData;
			}
		}),
		data() {
			return {
				filter: {
					name: 'id',
					order: 'asc'
				},
				keys:['name', 'types.type.name'],
				result: [],
				publicPath: process.env.BASE_URL
			}
		},
		methods: {
			filterList(event) {
				let order = event.target.classList.contains('asc') ? 'desc' : 'asc';
				event.target.classList.toggle('asc');
				this.filter = {
					name: event.target.name,
					order: order
				};
			},
			results(results) {
				this.result = results;
			},
			threeDigit(num) {
				return ("00" + num).slice(-3);
			},
			getImagePathByID(id) {
				return window.location +  this.$pokemon.imagePath + this.threeDigit(id)
			}
		}

	}

</script>

<style lang="sass">
@import '../../public/assets/sass/sprites.sass';
.filters
	display: flex
	list-style-type: none
</style>