<template>
	<section class="pokemon-detail">
		{{pokemon}}
	</section>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		name: 'pokemon-detail',
		data() {
			return {
				name: this.$route.params.name,
				// activePokemon: null
			}
		},
		computed: mapState({
			// grab pokemon data from storage
			pokemon: state => state.PokemonDetail.activePokemon
		}),
		created() {
			// fetches pokemon data based on route name
			this.$store.dispatch('PokemonDetail/setActivePokemon', [{name:this.name}])
		}

	}
</script>

<style></style>