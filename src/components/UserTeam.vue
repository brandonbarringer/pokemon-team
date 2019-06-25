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
	import {mapState} from 'vuex';

	export default {
		name: 'userTeam',
		computed: mapState({
			// grab pokemon data from storage
			teams: state => state.UserTeam.teams,
		}),
		methods: {

		},
		created() {
			// fetches pokemon data based on route name
			// this.$store.dispatch('getNamesAndStats')
		},

	}
</script>
<style></style>