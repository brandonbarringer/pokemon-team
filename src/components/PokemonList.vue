<template>
	<section class="pokemon-list">
		<ul>
			<li v-for="(pokemon, index) in list" :key="index">{{pokemon}}</li>
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
			this.$store.dispatch('PokemonList/GET_LIST')
			.then(() => {
				console.log('got pokemon list')
			})
		}
	}

</script>

<style></style>