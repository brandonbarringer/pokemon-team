<!--
Tutorial: https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c
 -->
<template>
	<div>
		<input v-model="email" type="email" class="username" placeholder="username">
		<input v-model="password" type="password" class="password" placeholder="password">
		<button @click="signUp" class="submit">Sign Up</button>
		<p> Or Sign In with Google</p>
		<button @click="googleSignup">Google Sign in</button>
		<p>No Account? </p> <router-link to="/login"> Login</router-link>
	</div>
</template>
<script>
	import firebase from 'firebase'
	import 'firebase/auth'
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
				event.preventDefault()
				firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
				.then(
					user => {
						this.$router.replace('team')
				},
					err => {
						console.log('error: ', err)
					}
				)
			},
			googleSignup() {
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