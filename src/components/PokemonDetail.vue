<template>
	<section class="pokemon-detail">
		<h1>{{pokemon.name}}</h1>
		<button @click="addToTeam(pokemon.id)">Add To Team</button>
		<h2>Types:</h2>
		<ul>
			<li v-for="type in pokemon.types" :key="type.type.name">{{type.type.name}}</li>
		</ul>
		<h2>Stats:</h2>
		<ul>
			<li v-for="stat in pokemon.stats" :key="stat.stat.name">{{stat.stat.name}}: {{calcStat(stat)}}</li>
		</ul>
		<h2>Abilites</h2>
		<ul>
			<li v-for="ability in pokemon.abilities" :key="ability.ability.name">
				<div>{{ability.ability.name}}</div>
				<div>{{ability.ability.url}}</div>
			</li>
		</ul>
		<h2>Moves:</h2>
		<ul>
			<li v-for="move in pokemon.moves" :key="move.move.name">
				<div>{{move.move.name}}</div>
				<div>{{move.move.url}}</div>
			</li>
		</ul>


	</section>
</template>

<script>
	import {mapState} from 'vuex';
	import calc from '@/utils/calc'

	export default {
		name: 'pokemon-detail',
		data() {
			return {
				name: this.$route.params.name
			}
		},
		computed: mapState({
			// grab pokemon data from storage
			pokemon: state => state.activePokemon,
		}),
		created() {
			// fetches pokemon data based on route name
			this.$store.dispatch('setActivePokemon', [{name:this.name}])
		},
		methods: {
			calcStat(statObj) {
				// if the stat name is not hp
				if(statObj.stat.name !== 'hp') {
					// calculate the stat based of the stat calculation
					// base-stat, IV:0, EV:0, LV:100, Nature:neutral
					return calc.stat(statObj.base_stat, 0, 0, 100, 1)
				} else {
					// if it is hp, use the hp calculation
					// base-stat, IV:0, EV:0, LV:100
					return calc.hp(statObj.base_stat, 0, 0, 100)
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