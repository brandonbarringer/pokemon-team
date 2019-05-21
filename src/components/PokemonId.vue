<template>
	<span>
		<p class="pokemon-id">{{id}}</p>
	</span>
</template>

<script>
	export default {
		name: 'PokemonId',
		props: ['id']
	}
</script>