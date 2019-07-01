import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/vendor/firebase'
import PokeApi from '@/services/api/pokemon'
import data from '@/data/pokemon.min.json'
import router from '@/router.js'

/* @TODO
Combine modules into this file. They are not needed
https://medium.com/javascript-in-plain-english/how-to-implement-a-showcase-web-app-in-vue-js-with-firebase-and-register-functionality-part-1-992089d17828
*/

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const database = firebase.fb.firestore();

const state = {
	dex: data,
	activePokemon: null,
	activeTeam: null,
	activeUser: null,
	userTeams: null,
};

const dataExists = async (dataRef) => {
	const data = await dataRef.get();

	return data.exists || data.docs.length > 0 ? true : false;
}

const mutations = {
	setActivePokemon: (state, payload) => {
		state.activePokemon = state.dex[payload];
	},
	setUserTeams: (state, payload) => {
		state.userTeams = payload
	},
	removeUser: state => {
		state.activeUser = null
	},
	addToTeam: (state, payload) => {
		const team = state.activeTeam;
		state.user.teams[team].pokemon.push(payload)
	},
	createNewTeam: (state, name) => {
		const data = {id: Object.keys(state.user.teams).length +1, name: name, pokemon: []}
		state.user.teams[name] = data
		database.collection('users').doc(state.user.id).set(data)
	},
	setActiveTeam: (state, name) => {
		state.activeTeam = name;
	},
	setActiveUser: (state, id) => {
		state.activeUser = id
	}
};

const getters = {
	getUser: state => {
		return state.user;
	},
	getActivePokemon: state => {
		return state.activePokemon;
	},
	getActiveTeam: state => {
		return state.activeTeam
	},
	getTeams: state => {
		return state.teams;
	},
	getDex: state => {
		return state.dex;
	}

};

const actions = {
	signInEmailPassowrd: async ({dispatch}, config) => {
		const auth = await firebase.firebase.auth().signInWithEmailAndPassword(config.email, config.password);
		dispatch('onUserAuth', auth.user.uid);
	},
	signUpEmailPassword: async ({dispatch}, config) => {
		const auth = await firebase.firebase.auth().createUserWithEmailAndPassword(config.email, config.password);
		dispatch('onUserAuth', auth.user.uid);
		dispatch('createNewUser', auth.user.uid);
	},
	signInGoogle: async ({dispatch}) => {
		const provider = new firebase.firebase.auth.GoogleAuthProvider();
		const auth = await firebase.firebase.auth().signInWithPopup(provider);
		dispatch('onUserAuth', auth.user.uid);
	},
	signUpGoogle: async ({dispatch}) => {
		const provider = new firebase.firebase.auth.GoogleAuthProvider();
		const auth = await firebase.firebase.auth().signInWithPopup(provider);
		dispatch('onUserAuth', auth.user.uid);
		dispatch('createNewUser', auth.user.uid);
	},
	onUserAuth: ({commit, dispatch}, id) => {
		commit('setActiveUser', id);
		dispatch('getUserTeams', id);
		router.replace('team');
	},
	setActivePokemon: ({commit}, identifier) => {
		commit('setActivePokemon', identifier);
	},
	createNewUser: (uid) => {
		database.collection('users').doc(uid).set({id: uid})
	},
	getUserTeams: async ({commit}, uid) => {
		const teamsCollection = database.collection('users').doc(uid).collection('teams');
		const weHaveData = await dataExists(teamsCollection);
		let teamDocs;
		let teams = []

		if (weHaveData) {
			teamDocs = await teamsCollection.get();
			teamDocs.forEach(doc => {
				teams.push(doc.data())
			})
			commit('setUserTeams', teams)
		}

	},
	signOut: ({commit}, payload) => {
		firebase.fb.auth().signOut()
		.then(() => {
			commit('removeUser');
			payload.router.replace('/');
		})
		.catch(err => {
			console.log(err.message);
		});
	},
	addToTeam: ({commit}, payload) => {
		commit('addToTeam', payload);
	},
	createNewTeam: async ({commit, state}, name) => {
		const teamsCollection = database.collection('users').doc(state.activeUser).collection('teams');
		const weHaveData = await dataExists(teamsCollection);
		const nameIsUnique = async (name) => {
			const teamDocs = await teamsCollection.get();
			const teams = [];
			let teamNames;
			teamDocs.forEach(doc => {
				teams.push(doc.data())
			})
			teamNames = teams.map(obj => obj.id)
			return teamNames.includes(name);
		}
		if (weHaveData) {
			if (await !nameIsUnique(name)) {
				teamsCollection.doc(name).set({id: name})
				.then(() => {
					commit('setActiveTeam', name)
					router.replace('/dex')
				})
			} else {
				alert(name + " is already in use. Please choose a unique name")
			}

		} else {
			teamsCollection.doc(name).set({id: name})
			.then(() => {
				commit('setActiveTeam', name)
				router.replace('/dex')
			})

		}


		/*
		users: {
			userID: {
				id: id,
				teams: {
					teamName: {
						id: teamName,
						pokemon: {
							pokemonName: {
								lv: null,
								speed: {
									iv: null,
									ev: null,
								},
								...
								shiny: Boolean,
								moves: [],
								item: name
							}
						}
					}
				}
			}
		}
		*/
	},
	setActiveTeam: ({commit}, payload) => {
		commit('setActiveTeam', payload);
	}
};

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  strict: debug
})