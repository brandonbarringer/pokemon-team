<template>
	<section class="pokemon-detail">
		<h1>{{pokemon.name}}</h1>
		<button @click="addToTeam(pokemon.id)">Add To Team</button>
		<h2>Types:</h2>
		<ul>
			<li v-for="(type, key) in pokemon.types" :key="key">{{type}}</li>
		</ul>
		<h2>Damage:</h2>
		<ul>
			<li v-for="(damage, amounts) in pokemon.damage" :key="amounts">
				{{amounts}}
				<ul>
					<li v-for="(amount, types) in damage">
						{{types}}
						<ul>
						 	<li v-for="type in amount">{{type}}</li>
						 </ul>
					</li>
				</ul>
			</li>
		</ul>
		<h2>Stats:</h2>
		<ul>
			<li v-for="(stat, key) in pokemon.stats" :key="key">{{key}}: {{calcStat(stat, key)}}</li>
		</ul>
		<h2>Abilites</h2>
		<!-- <ul>
			<li v-for="ability in pokemon.abilities" :key="ability.name">
				<div>{{ability.name}}</div>
				<div>{{ability.url}}</div>
			</li>
		</ul> -->
		<h2>Moves:</h2>
		<ul>
			<li v-for="move in pokemon.moves" :key="move">
				<div>{{move}}</div>
			</li>
		</ul>


	</section>
</template>

<script>
	import calc from '@/utils/calc'

	export default {
		name: 'pokemon-detail',
		data() {
			return {
				name: this.$route.params.name
			}
		},
		computed: {
			// grab pokemon data from storage
			pokemon() {
				return this.$store.getters.getActivePokemon
			}
		},
		created() {
			// fetches pokemon data based on route name
			this.$store.dispatch('setActivePokemon', this.name)
		},
		methods: {
			calcStat(stat, name) {
				// if the stat name is not hp
				if(name !== 'hp') {
					// calculate the stat based of the stat calculation
					// base-stat, IV:0, EV:0, LV:100, Nature:neutral
					return calc.stat(stat, 0, 0, 100, 1)
				} else {
					// if it is hp, use the hp calculation
					// base-stat, IV:0, EV:0, LV:100
					return calc.hp(stat, 0, 0, 100)
				}
			},
			addToTeam(id) {
				// main.js
				return this.$pokemon.addToTeam(id)
			}
		}
	}
</script>

<style></style>