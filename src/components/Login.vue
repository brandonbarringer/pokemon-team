<!--
Tutorial: https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c
 -->
<template>
	<div>
		<input v-model="email" type="email" class="username" placeholder="username">
		<input v-model="password" type="password" class="password" placeholder="password">
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
				firebase.auth().signInWithEmailAndPassword(this.email, this.password)
				.then(
					user => {
						this.$router.replace('team')
					},
					err => {
						console.log('error: ', err.message)
					}
				)
			},
			googleLogin() {
				const provider = new firebase.auth.GoogleAuthProvider();

				firebase.auth().signInWithPopup(provider)
				.then(result => {
					this.$router.replace('team');
				})
				.catch(err => {
					console.log('error: ', err.message)
				})
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