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
		:list="listArr"
		:defaultAll="true"
		:threshold="0.0"
		@fuseResultsUpdated="results($event)"
		></vue-fuse>
		<ul class="filters">
			<li><button @click="filterList" class="asc" name="name">Name</button></li>
			<li><button @click="filterList" class="asc" name="id">ID</button></li>
			<li><button @click="filterList" data-type="stat" class="asc" name="total">Total</button></li>
			<li><button @click="filterList" data-type="stat" class="asc" name="speed">Speed</button></li>
			<li><button @click="filterList" data-type="stat" class="asc" name="attack">Attack</button></li>
			<li><button @click="filterList" data-type="stat" class="asc" name="defense">Defense</button></li>
			<li><button @click="filterList" data-type="stat" class="asc" name="special-attack">Special Attack</button></li>
			<li><button @click="filterList" data-type="stat" class="asc" name="special-defense">Special Defense</button></li>
			<li><button @click="filterList" data-type="stat" class="asc" name="hp">HP</button></li>
		</ul>
		<ul>
			<li v-for="pokemon in result" :key="pokemon.id">
				<clazy-load :src="getImagePathByID(pokemon.id) + '.png'" alt="">
					<img :src="getImagePathByID(pokemon.id) + '.png'" alt="">
				</clazy-load>
				<span>#{{pokemon.id}} - {{pokemon.name}}</span>
				<ul>
					<li v-for="(type, key) in pokemon.types" :key="key">Type: {{type}}</li>
				</ul>
				<ul>
					<li v-for="(stat, key) in pokemon.stats" :key="key">
						<span class="label">{{key}}: </span>
						<span class="value">{{stat}}</span>
					</li>
				</ul>
				<button @click="addToTeam(pokemon.id)">Add to Team</button>
				<router-link :to="'/pokemon/' + pokemon.name">
					<button>Details</button>
				</router-link>
			</li>
		</ul>
	</section>
</template>

<script>
	import {mapState} from 'vuex';
	import _ from 'underscore';

	export default {
		name: 'PokemonList',

		computed: {
			// grab pokemon list from storage
			list() {
				return this.$store.getters.getDex;
			},
			filteredList()  {
				const order = this.filter.order;
				const name = this.filter.name;
				let list;
				const type = this.filter.type;
				if (type == 'stat') {
					list =_.sortBy(this.list, (obj) => obj.stats[name]);
				} else {
					list = _.sortBy(this.list, name);
				}
				return order === 'asc' ? list : list.reverse()
			},
			// converts list to array to be searched by fuse
			listArr() {
				const arr = Object.keys(this.filteredList).map(key => {
					return this.filteredList[key]
				})
				return arr
			}
		},
		data() {
			return {
				// filtering on first load
				filter: {
					name: 'order',
					order: 'asc',
					type: null,
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
				let type = event.target.dataset.type || null
				event.target.classList.toggle('asc');
				this.filter = {
					// sets the name of the filter to
					// the name of the input clicked
					name: event.target.name,
					order: order,
					type: type
				};
			},
			addToTeam(id) {
				const pokeInfo = {
					name: id,
					lv: null,
					slot: 0,
					speed: {
						iv: 0,
						ev: 0,
					},
					hp: {
						iv: 0,
						ev: 0,
					},
					attack: {
						iv: 0,
						ev: 0,
					},
					defense: {
						iv: 0,
						ev: 0,
					},
					'special-attack': {
						iv: 0,
						ev: 0,
					},
					'special-defense': {
						iv: 0,
						ev: 0,
					},
					shiny: false,
					moves: ['move 1', 'move 2', 'move 3', 'move 4'],
					item: 'some item',
					ability: 'some ability'
				};
				this.$store.dispatch('addToTeam', pokeInfo);
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
				return window.location.origin +  this.$pokemon.imagePath + this.threeDigit(id)
			}
		}

	}

</script>

<style lang="sass" scoped>
.filters
	display: flex
	list-style-type: none
	flex-wrap: wrap

	button
		display: flex
		&:after
			width: 20px
			height: 10px
			display: block
			top: 0
			position: relative
			content: '\25b2'
		&.asc
			&:after
				content: '\25bc'

</style>