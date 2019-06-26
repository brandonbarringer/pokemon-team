<!--
Tutorial:

https://medium.com/@anas.mammerivue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c
 -->
<template>
	<div>
		<form>
			<input v-model="email" type="email" class="username" placeholder="username">
			<input v-model="password" type="password" class="password" placeholder="password">
		</form>
		<button @click="signUp" class="submit">Sign Up</button>
		<p> Or Sign In with Google</p>
		<button @click="googleSignup">Google Sign in</button>
		<p>No Account? </p> <router-link to="/login"> Login</router-link>
	</div>
</template>
<script>
	export default {
		name: 'SignUp',
		data() {
			return {
				email: null,
				password: null,
			}
		},
		methods: {
			signUp(event) {
				event.preventDefault();
				const credentials = {
					email: this.email,
					password: this.password
				};
				this.$store.dispatch('signUpWithEmail', credentials);
			},
			googleSignup() {
				this.$store.dispatch('signInWithGoogle')
			}
		}
	}
</script>
<style>
	form {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80vh;
	}
</style>