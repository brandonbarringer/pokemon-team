import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import config from '@/config.js'



// init firebase with configs from src/config.js
export const fb = firebase.initializeApp(config.config)
