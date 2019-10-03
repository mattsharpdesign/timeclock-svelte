import { writable } from 'svelte/store'

export const status = writable('unknown')

export const user = writable(null)

export const logIn = function() {
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