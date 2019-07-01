<!--
Tutorial: https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c
 -->
<template>
	<div>
		<form>
			<input v-model="email" type="email" class="username" placeholder="username">
			<input v-model="password" type="password" class="password" placeholder="password">
		</form>
		<button @click="login" class="submit">Login</button>
		<p> Or Sign In with Google</p>
		<button @click="googleLogin">Google Sign in</button>
		<p>No Account? </p> <router-link to="/sign-up"> Sign Up</router-link>
	</div>
</template>
<script>
	import firebase from 'firebase'
	import 'firebase/auth'
	export default {
		name: 'Login',
		data() {
			return {
				email: null,
				password: null,
			}
		},
		methods: {
			login(event) {
				event.preventDefault();
				const config = {
					email: this.email,
					password: this.password
				};
				this.$store.dispatch('signInEmailPassword', config);
			},
			googleLogin() {
				this.$store.dispatch('signInGoogle');
			}
		}
	}
</script>
<style>
	form {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>