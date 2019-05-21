<template>
	<ul class="pokemon-list">
		<li class="pokemon-list__item" v-for="(item, index) in data" v-bind:key="index">
			<figure class="pokemon-card">
				<img ref="img" class="pokemon-card__image" alt="">
				<figcaption class="pokemon-card__data">
					<p class="pokemon-card__id"></p>
					<p class="pokemon-card__name">{{item.name}}</p>
					<ul class="pokemon-card__types">
						<li class="pokemon-card__type"></li>
						<li class="pokemon-card__type"></li>
					</ul>
					<ul class="pokemon-card__stat-list">
						<li class="pokemon-card__stat-item">
							<p class="pokemon-card__stat-title"></p>
							<p class="pokemon-card__stat"></p>
						</li>
						<li class="pokemon-card__stat-item">
							<p class="pokemon-card__stat-title"></p>
							<p class="pokemon-card__stat"></p>
						</li>
						<li class="pokemon-card__stat-item">
							<p class="pokemon-card__stat-title"></p>
							<p class="pokemon-card__stat"></p>
						</li>
						<li class="pokemon-card__stat-item">
							<p class="pokemon-card__stat-title"></p>
							<p class="pokemon-card__stat"></p>
						</li>
						<li class="pokemon-card__stat-item">
							<p class="pokemon-card__stat-title"></p>
							<p class="pokemon-card__stat"></p>
						</li>
						<li class="pokemon-card__stat-item">
							<p class="pokemon-card__stat-title"></p>
							<p class="pokemon-card__stat"></p>
						</li>
					</ul>
				</figcaption>
			</figure>
		</li>
	</ul>
</template>

<script>

	import axios from 'axios';

	export default {
		name: 'PokemonCard',
		components: {
			PokemonName
		},
		// props: ["pokemon"],
		data() {
			return {
				data: null
			}
		},
		mounted() {
			axios
				.get('https://pokeapi.co/api/v2/pokemon')
				.then(response => {
					// console.log(response.data.results)
					this.data = response.data.results;
				});
				// .then(response => (this.name = response));

		}
	}

</script>

<style lang="sass" scoped>
	$color: red
	.pokemon-card
		background-color: $color
		&__image

</style>
