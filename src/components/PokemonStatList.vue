<template>
		<ul>
			<li v-for="item in statList">
				<PokemonStat :label="replaceStringWithAbbr(item.stat.name)" :value="item.base_stat"/>
			</li>
		</ul>
</template>

<script>
	import PokemonStat from './PokemonStat.vue';
	export default {
		name: 'PokemonStatList',
		components: {
			PokemonStat
		},
		props: {
			stats: Array
		},
		data() {
			return {
				statList: this.stats
			}
		},
		methods: {
			replaceStringWithAbbr: function(str) {
				const abbrev = {
						"speed": "Spd",
						"special-defense": "S.Def",
						"special-attack": "S.Atk",
						"defense": "Def",
						"attack": "Atk",
						"hp": "HP"
					};
				if(Object.keys(abbrev).indexOf(str) > -1) {
					return abbrev[str] 
				} else {
					return str
				}
			}
		}

	}
</script>
<style lang="sass">

</style>