<template>
	<span>
		<p class="pokemon-name">{{name}}</p>
		<p class="pokemon-url">{{url}}</p>
	</span>
</template>

<script>
	export default {
		name: 'PokemonName',
		props: ['name', 'url']
	}
</script>