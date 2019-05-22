<template>
		<div v-bind:style="{backgroundImage: 'url(' + path + ')'}"></div>
</template>

<script>
	export default {
		name: 'PokemonBackground',
		props: ['path']
	}
</script>
<style lang="sass">
</style>