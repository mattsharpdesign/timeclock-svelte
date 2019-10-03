import { writable, derived, get } from 'svelte/store'
import { db } from '../firebase-services'
import { user } from './auth-store'

let collectionRef

export const loading = writable(false)

export const employees = writable([], () => {
  console.log('employees got their first listener')
  // This is just for local development:
  // if (window.localStorage.getItem('employees')) {
  //   employees.set(JSON.parse(window.localStorage.getItem('employees')))
  // }
  const { accountId } = get(user)
  collectionRef = db.collection('accounts').doc(accountId).collection('employees')
  loadEmployees()
  return () => {
    console.log('employees lost their last listener :(')
  }
})

export const sortedEmployees = derived(
  employees,
  $employees => $employees.sort((a, b) => {
    if (a.firstName < b.firstName) {
      return -1
    }
    if (a.firstName > b.firstName) {
      return 1
    }
    return 0
  })
)

export const loadEmployees = function() {
  loading.set(true)
  collectionRef.get()
    .then(querySnapshot => {
      let tempArray = []
      querySnapshot.forEach(doc => {
        tempArray.push({
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName
        })
      })
      employees.set(tempArray)
      loading.set(false)
    })
    .catch(error => {
      console.log(error)
      loading.set(false)
    })
}

export const saveEmployee = function(data) {
  if (data.id) {
    const docRef = collectionRef.doc(data.id)
    return docRef.update({
      firstName: data.firstName,
      lastName: data.lastName
    })
  } else {
    return collectionRef.add({
      firstName: data.firstName,
      lastName: data.lastName,
      // add default values because I don't know if
      // these are needed by other other connected apps
      // TODO: check this, delete these if possible
      payrollId: '',
      status: 0
    })
  }
}

export const fakeSaveEmployee = function(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        reject({
          code: 'fake-error',
          message: 'An unexpected error occurred :('
        })
      } else {
        let employee
        if (data.id) {
          const snapshot = get(employees)
          employee = snapshot.find(e => e.id === data.id)
          employee.firstName = data.firstName
          employee.lastName = data.lastName
        } else {
          employee = {
            id: Math.ceil(Math.random() * 1000000),
            firstName: data.firstName,
            lastName: data.lastName
          }
          employees.update(snapshot => {
            return [...snapshot, employee]
          })
        }
        window.localStorage.setItem('employees', JSON.stringify(get(employees)))
        resolve(employee)
      }
    }, 600)
  })
}

export const deleteEmployee = function(data) {
  const docRef = collectionRef.doc(data.id)
  return docRef.delete()
}

export const fakeDeleteEmployee = function(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let snapshot = get(employees)
      const index = snapshot.findIndex(e => e.id === data.id)
      const deletedEmployee = snapshot.splice(index, 1)
      employees.set(snapshot)
      window.localStorage.setItem('employees', JSON.stringify(get(employees)))
      resolve(deletedEmployee)
    }, 600)
  })
}
