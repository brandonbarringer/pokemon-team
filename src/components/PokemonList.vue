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

	export default {
		name: 'PokemonList',

		computed: mapState({
			list: state => state.PokemonList.list
		}),

		created() {
			this.$store.dispatch('PokemonList/getPokedex', {limit: 20, offset: 0})
		},
		methods: {
			getNext() {
				this.$store.dispatch('PokemonList/getNextPage')
			}
		}
	}

</script>

<style></style>