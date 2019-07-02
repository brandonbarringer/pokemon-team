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
			<!-- <li v-for="(stat, key) in pokemon.stats" :key="key">{{key}}: {{calcStat(stat, key)}}</li> -->
			<li>
				<p>Speed: {{calcStat(pokemon.stats.speed, 'speed')}}</p>
				<input :value="speed.ev || 0" type="number" placeholder="EV">
				<input :value="speed.iv || 0" type="number" placeholder="IV">
			</li>
			<li>
				<p>Special Defense: {{calcStat(pokemon.stats['special-defense'], 'special-defense')}}</p>
				<input :value="specialDefense.ev || 0" type="number" placeholder="EV">
				<input :value="specialDefense.iv || 0" type="number" placeholder="IV">
			</li>
			<li>
				<p>Special Attack: {{calcStat(pokemon.stats['special-attack'], 'special-attack')}}</p>
				<input :value="specialAttack.ev || 0" type="number" placeholder="EV">
				<input :value="specialAttack.iv || 0" type="number" placeholder="IV">
			</li>
			<li>
				<p>Attack: {{calcStat(pokemon.stats.attack, 'attack')}}</p>
				<input :value="attack.ev || 0" type="number" placeholder="EV">
				<input :value="attack.iv || 0 " type="number" placeholder="IV">
			</li>
			<li>
				<p>Defense: {{calcStat(pokemon.stats.defense, 'defense')}}</p>
				<input :value="defense.ev || 0" type="number" placeholder="EV">
				<input :value="defense.iv || 0" type="number" placeholder="IV">
			</li>
			<li>
				<p>HP: {{calcStat(pokemon.stats.hp, 'hp')}}</p>
				<input :value="hp.ev || 0" type="number" placeholder="EV">
				<input :value="hp.iv || 0" type="number" placeholder="IV">
			</li>
			<li>
				<p>Total: {{total || calcStat(pokemon.stats.total)}}</p>
			</li>
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
				name: this.$route.params.name,
				total: null,
				speed: {
					iv: null,
					ev: null,
				},
				hp: {
					iv: null,
					ev: null,
				},
				attack: {
					iv: null,
					ev: null,
				},
				defense: {
					iv: null,
					ev: null,
				},
				specialAttack: {
					iv: null,
					ev: null,
				},
				specialDefense: {
					iv: null,
					ev: null,
				},
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
				const pokeInfo = {
					name: this.name,
					lv: null,
					slot: 0,
					speed: this.speed,
					hp: this.hp,
					attack: this.attack,
					defense: this.defense,
					'special-attack': this.specialAttack,
					'special-defense': this.specialDefense,
					total: this.total,
					shiny: false,
					moves: ['move 1', 'move 2', 'move 3', 'move 4'],
					item: 'some item',
					ability: 'some ability'
				};
				this.$store.dispatch('addToTeam', pokeInfo);
			}
		}
	}
</script>

<style></style>