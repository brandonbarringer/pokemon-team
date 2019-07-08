import Vue from 'vue';
import Vuex from 'vuex';
import firebase from '@/vendor/firebase';
// import PokeApi from '@/services/api/pokemon';
import data from '@/data/pokemon.min.json';
import router from '@/router.js';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const database = firebase.fb.firestore();

const state = {
	dex: data,
	activePokemon: null,
	activeTeam: null,
	activeUser: null,
	userTeams: null,
};

const db = {
	collection: {
		users: database.collection('users'),
		get teams() {
			return db.doc.user.collection('teams');
		},
		get pokemon() {
			return db.doc.team.collection('pokemon');
		}
	},
	doc: {
		get user() {
			return db.collection.users.doc(state.activeUser);
		},
		get team() {
			return db.collection.teams.doc(state.activeTeam);
		},
		get pokemon() {
			return db.collection.pokemon.doc(state.activePokemon);
		}
	}
};

const dataExists = async (dataRef) => {
	const data = await dataRef.get();
	return data.exists || data.docs.length > 0 ? true : false;
};

const mutations = {
	setActivePokemon: (state, payload) => {
		state.activePokemon = state.dex[payload];
	},
	setUserTeams: (state, payload) => {
		state.userTeams = payload;
	},
	removeUser: state => {
		state.activeUser = null;
	},
	setActiveTeam: (state, name) => {
		state.activeTeam = name;
	},
	setActiveUser: (state, id) => {
		state.activeUser = id;
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
		return state.userTeams;
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
		const reroutes = ['/sign-up', '/login'];

		commit('setActiveUser', id);
		dispatch('getUserTeams', id);
		if (reroutes.includes(router.history.current.path)) {
			router.replace('/team');
		}
	},
	setActivePokemon: ({commit}, identifier) => {
		commit('setActivePokemon', identifier);
	},
	createNewUser: (uid) => {
		db.doc.user.set({id: uid});
	},
	getUserTeams: async ({commit}) => {
		const teamsCollection = db.collection.teams;
		const weHaveData = await dataExists(teamsCollection);
		let teamDocs;
		let teams = [];

		if (weHaveData) {
			teamDocs = await teamsCollection.get();
			teamDocs.forEach(doc => {
				teams.push(doc.data())
			});
			commit('setUserTeams', teams);
		}

	},
	signOut: ({commit}) => {
		firebase.fb.auth().signOut()
		.then(() => {
			commit('removeUser');
			router.replace('/');
		})
		.catch(err => {
			console.log(err.message);
		});
	},
	addToTeam: ({dispatch}, payload) => {
		db.collection.pokemon.doc(payload.name).set(payload).then(() => {
			dispatch('getUserTeams');
		});
	},
	createNewTeam: async ({commit}, name) => {
		const teamsCollection = db.collection.teams;
		const nameIsUnique = async (name) => {
			const teamDocs = await teamsCollection.get();
			const teams = [];
			let teamNames;
			teamDocs.forEach(doc => {
				teams.push(doc.data());
			});
			teamNames = teams.map(obj => obj.id);
			return teamNames.includes(name) ? false : true;
		};
		if (await nameIsUnique(name)) {
			teamsCollection.doc(name).set({id: name})
			.then(() => {
				commit('setActiveTeam', name);
				router.replace('/dex');
			});
		} else {
			alert(name + " is already in use. Please choose a unique name");
		}
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