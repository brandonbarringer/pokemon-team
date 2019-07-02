<template>
	<section class="teams">
		<button @click="logout">Logout</button>
		<ul v-if="teams">
			<li v-for="team in teams">
				{{team}}
			</li>
		</ul>
		<div v-else>
			<h2>You don't have a team yet.</h2>	
		</div>
		<button @click="createTeam">Create a Team</button>
	</section>
</template>
<script>
	export default {
		name: 'userTeam',
		computed: {
			teams() {
				return this.$store.getters.getTeams;
			}
		},
		methods: {
			logout() {
				const payload = {
					router: this.$router
				};
				this.$store.dispatch('signOut', payload);
			},
			createTeam() {
				this.$store.dispatch('createNewTeam', prompt('Enter Team Name:', 'Team Name'))
			}
		},
		created() {
		},

	}
</script>
<style></style>