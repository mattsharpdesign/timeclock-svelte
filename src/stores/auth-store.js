import { writable } from 'svelte/store'
import { auth, db } from '../firebase-services'

export const status = writable('unknown')

export const user = writable(null)

export const errorMessage = writable('')

export const signIn = function(email, password) {
  status.set('signing in')
  errorMessage.set('')
  auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      console.log('Sign in error:', error.code, error.message)
      status.set('sign in failed')
      errorMessage.set(error.message)
    })
}

export const signOut = function() {
  status.set('signing out')
  auth.signOut()
}

export const fakeLogIn = function() {
  status.set('logging in')
  setTimeout(() => {
    user.set({
      email: 'matt@example.net',
      role: 'admin'
    })
    status.set('logged in')
  }, 600)
}

export const logOut = function() {
  user.set(null);
  status.set('logged out')
}

auth.onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    user.set({ email: firebaseUser.email })
    status.set('authorizing')
    db.collection('users').doc(firebaseUser.uid).get().then(doc => {
      if (doc.exists) {
        const role = doc.data().role
        user.update(current => ({ 
          ...current, 
          role: role, 
          accountId: doc.data().accountId
        }))
        if (role === 'admin') {
          status.set('authorized')
        } else {
          status.set('not authorized')
        }
      } else {
        status.set('not authorized (no data found)')
      }
    })
  } else {
    user.set(null)
    status.set('signed out')
  }
})