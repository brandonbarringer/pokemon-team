<template>
	<section class="pokemon-list">
		<button @click="getNext">Next Page</button>
		<ul>
			<li v-for="(pokemon, index) in list" :key="index">{{pokemon.data.name}}</li>
		</ul>
	</section>
</template>

<script>
	import {mapState} from 'vuex'
	import _ from 'underscore'

	export default {
		name: 'PokemonList',

		computed: mapState({
			list: state => _.sortBy(state.PokemonList.list, 'id')
		}),

		created() {
			this.$store.dispatch('PokemonList/getPokedex', {limit: 20, offset: 0})
			// this.$store.dispatch('PokemonList/getPokedex', {limit: 40, offset: 0})
		},
		updated() {
			this.$nextTick(this.getAll())
		},
		methods: {
			getNext() {
				this.$store.dispatch('PokemonList/getNextPage')
			},
			getAll() {
				this.$store.dispatch('PokemonList/getAll')
			}
		}
	}

</script>

<style></style>