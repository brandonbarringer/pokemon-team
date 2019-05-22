<template>
		<div class="pokemon-card__stat-list">
			<div>{{label}}</div>
			<div>{{value}}</div>
		</div>
</template>

<script>
	export default {
		name: 'PokemonStat',
		props: {
			label: String,
			value: Number,
		}
	}
</script>
<style lang="sass">

</style>