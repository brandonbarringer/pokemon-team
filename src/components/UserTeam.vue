<template>
	<section class="teams">
		<button @click="logout">Logout</button>
		<ul v-if="teams">
			<li v-for"team in teams">
				{{team}}
			</li>
		</ul>
		<div v-else>
			<h2>You don't have a team yet.</h2>
			<router-link to="/dex">
				<button>Create a Team</button>
			</router-link>
		</div>
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
			logout: function() {
				const payload = {
					router: this.$router
				};
				this.$store.dispatch('signOut', payload);
			}
		},
		created() {
		},

	}
</script>
<style></style>