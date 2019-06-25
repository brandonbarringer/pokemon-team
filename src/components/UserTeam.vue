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
	import {fb} from '@/vendor/firebase';

	export default {
		name: 'userTeam',
		computed: mapState({
			// grab user teams arr from storage
			teams: state => state.teams,
		}),
		methods: {

		},
		created() {
			// gets user id
			this.$store.dispatch('setUser', fb.auth().currentUser.uid)
		},

	}
</script>
<style></style>