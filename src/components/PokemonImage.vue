<template>
	<div>
		<img class="pokemon-image" v-bind:src="src" alt="">
	</div>
</template>

<script>
	export default {
		name: 'PokemonImage',
		props: ['src']
	}
</script>
