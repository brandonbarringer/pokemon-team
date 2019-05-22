<template>
		<div class="pokemon-card__stat-block">
			<div class="pokemon-card__stat-label">{{label}}</div>
			<div class="pokemon-card__stat-value">{{value}}</div>
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