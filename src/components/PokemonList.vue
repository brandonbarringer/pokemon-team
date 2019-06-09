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
			// grab pokemon list from storage
			list: state => state.PokemonList.data,
			filteredList: function()  {
				const getIndexOfParent = (obj, stringToMatch) => {
					// emtpy placeholder
					let value;
					// for each stat obj in the containing stats object
					obj.stats.forEach((obj, index) => {
						// if the stat name matches the string we provide
						if( obj.stat.name === stringToMatch ) {
							// set the placeholder to the index of
							// where we found the match
							value = index
						}
					})
					// return the index
					return value;
				};
				const filteredList = _.sortBy(this.result, (obj) => {
					let index = getIndexOfParent(obj, this.filter.name)
					// sort the collection by the key that matches the filter (ie not a stat)
					// or by the stat that matches the filter
					return obj[this.filter.name] || obj.stats[index].base_stat
				});
				// if the order is set to asc return sorted list in its original order (asc)
				// if not, return the list in its reverse order (desc)
				let finalData = this.filter.order === 'asc' ? filteredList : filteredList.reverse();
				return finalData;
			}
		}),
		data() {
			return {
				// filtering on first load
				filter: {
					name: 'id',
					order: 'asc'
				},
				// keys that can be searched with vue fuse
				keys:['name', 'types.type.name'],
				// placeholder for the sorted list
				result: [],
			}
		},
		methods: {
			filterList(event) {
				// set the order of the current list
				// if the filter has a class of .asc
				// set the order to desc or visa versa
				let order = event.target.classList.contains('asc') ? 'desc' : 'asc';
				event.target.classList.toggle('asc');
				this.filter = {
					// sets the name of the filter to
					// the name of the input clicked
					name: event.target.name,
					order: order
				};
			},
			results(results) {
				// sets the result to the results
				// we got from the vue-fuse search
				this.result = results;
			},
			threeDigit(num) {
				// returns a number with always 3 digits starting with 0
				// if the number is less than 100
				// example: 1 => 001, 23 => 023, 134 => 134
				return ("00" + num).slice(-3);
			},
			getImagePathByID(id) {
				// http://example.com/ + /images/ + 001
				return window.location +  this.$pokemon.imagePath + this.threeDigit(id)
			}
		}

	}

</script>

<style lang="sass">
.filters
	display: flex
	list-style-type: none
</style>