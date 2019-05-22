<template>
		<p v-bind:class="{classType}">{{type}}</p>
</template>

<script>
	export default {
		name: 'PokemonType',
		props: {
			type: String,
			classType: String,
		}
	}
</script>