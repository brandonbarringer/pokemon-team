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
				<p>Speed: {{calcStat(pokemon.stats.speed, speed.iv, speed.ev, 'speed')}}</p>
				<label for="ev">EV</label>
				<input v-model.number="speed.ev" type="number" placeholder="EV">
				<label for="iv">IV</label>
				<input v-model.number="speed.iv" type="number" placeholder="IV">
			</li>
			<li>
				<p>Special Defense: {{calcStat(pokemon.stats['special-defense'], specialDefense.iv, specialDefense.ev, 'special-defense')}}</p>
				<label for="ev">EV</label>
				<input v-model.number="specialDefense.ev" type="number" placeholder="EV">
				<label for="iv">IV</label>
				<input v-model.number="specialDefense.iv" type="number" placeholder="IV">
			</li>
			<li>
				<p>Special Attack: {{calcStat(pokemon.stats['special-attack'], specialAttack.iv, specialAttack.ev, 'special-attack')}}</p>
				<label for="ev">EV</label>
				<input v-model.number="specialAttack.ev" type="number" placeholder="EV">
				<label for="iv">IV</label>
				<input v-model.number="specialAttack.iv" type="number" placeholder="IV">
			</li>
			<li>
				<p>Attack: {{calcStat(pokemon.stats.attack, attack.iv, attack.ev, 'attack')}}</p>
				<label for="ev">EV</label>
				<input v-model.number="attack.ev" type="number" placeholder="EV">
				<label for="iv">IV</label>
				<input v-model.number="attack.iv " type="number" placeholder="IV">
			</li>
			<li>
				<p>Defense: {{calcStat(pokemon.stats.defense, defense.iv, defense.ev, 'defense')}}</p>
				<label for="ev">EV</label>
				<input v-model.number="defense.ev" type="number" placeholder="EV">
				<label for="iv">IV</label>
				<input v-model.number="defense.iv" type="number" placeholder="IV">
			</li>
			<li>
				<p>HP: {{calcStat(pokemon.stats.hp, hp.iv, hp.ev, 'hp')}}</p>
				<label for="ev">EV</label>
				<input v-model.number="hp.ev" type="number" placeholder="EV">
				<label for="iv">IV</label>
				<input v-model.number="hp.iv" type="number" placeholder="IV">
			</li>
			<li>
				<p>Total: {{total || calcTotal()}}</p>
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
				nature: null,
				total: null,
				speed: {
					stat: null,
					iv: null,
					ev: null,
				},
				hp: {
					stat: null,
					iv: null,
					ev: null,
				},
				attack: {
					stat: null,
					iv: null,
					ev: null,
				},
				defense: {
					stat: null,
					iv: null,
					ev: null,
				},
				specialAttack: {
					stat: null,
					iv: null,
					ev: null,
				},
				specialDefense: {
					stat: null,
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
			calcStat(stat, iv, ev, name) {
				// base-stat, IV:0, EV:0, LV:100, Nature:neutral
				// base-stat, IV:0, EV:0, LV:100
				const setIV = iv || 0;
				const setEV = ev || 0;
				const oddNames = ['special-attack', 'special-defense'];
				if (oddNames.includes(name)) {
					const statNameArr = name.split('-')
					const statName = statNameArr[0] + (statNameArr[1].charAt(0).toUpperCase() + statNameArr[1].slice(1))
					this[statName].stat = calc.stat(stat, setIV, setEV, 100, 1);
					return calc.stat(stat, setIV, setEV, 100, 1);
				} else if (name !== 'hp') {
					this[name].stat = calc.stat(stat, setIV, setEV, 100, 1)
					return calc.stat(stat, setIV, setEV, 100, 1)
				} else {
					this.hp.stat = calc.hp(stat, setIV, setEV, 100)
					return calc.hp(stat, setIV, setEV, 100)
				}
				// return name !== 'hp' ? calc.stat(stat, setIV, setEV, 100, 1) : calc.hp(stat, setIV, setEV, 100)
			},
			calcTotal() {
				const stats = this.pokemon.stats
				const attack = this.attack.stat || stats.attack;
				const defense = this.defense.stat || stats.defense;
				const hp = this.hp.stat || stats.hp;
				const speed = this.speed.stat || stats.speed;
				const specialAttack = this.specialAttack.stat || stats['special-attack'];
				const specialDefense = this.specialDefense.stat || stats['special-defense'];
				return attack + defense + hp + speed + specialDefense + specialAttack;
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
					nature: this.nature,
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