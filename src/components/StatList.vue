<template>
		<ul class="stat-list">
			<li class="stat-list__item" v-for="(item, index) in statList" :key="index">
				<StatBlock :label="abbr[item.stat.name]" :value="item.base_stat"/>
			</li>
		</ul>
</template>

<script>
	import StatBlock from './StatBlock.vue';
	export default {
		name: 'StatList',
		components: {
			StatBlock
		},
		props: {
			stats: Array
		},
		data() {
			return {
				statList: this.stats,
				abbr: {
					"speed": "Spd",
					"special-defense": "S.Def",
					"special-attack": "S.Atk",
					"defense": "Def",
					"attack": "Atk",
					"hp": "HP"
				}
			}
		},

	}
</script>
