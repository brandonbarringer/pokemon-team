<template>
	<span>
		<p class="pokemon-type">{{type}}</p>
	</span>
</template>

<script>
	export default {
		name: 'PokemonType',
		props: ['type']
	}
</script>