import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebase-config.json'

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export const db = firebase.firestore()