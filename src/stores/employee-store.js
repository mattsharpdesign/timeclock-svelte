import { writable, derived, get } from 'svelte/store'
import { db } from '../firebase-services'
import { user } from './auth-store'

let collectionRef

export const loading = writable(false)

export const employees = writable([], () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('employees got their first listener')
  }
  // This is just for local development:
  // if (window.localStorage.getItem('employees')) {
  //   employees.set(JSON.parse(window.localStorage.getItem('employees')))
  // }
  const { accountId } = get(user)
  collectionRef = db.collection('accounts').doc(accountId).collection('employees')
  loadEmployees()
  return () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('employees lost their last listener :(')
    }
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
          lastName: doc.data().lastName,
          // I don't know if we need these next two,
          // but we'll keep them for now
          payrollId: doc.data().payrollId,
          status: doc.data().status
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
  return new Promise((resolve, reject) => {
    // Validate
    if (!data.firstName || !data.lastName) {
      reject({
        code: 'invalid',
        message: 'First and last name are required.'
      })
      return
    }
    if (data.id) { 
      // Update existing employee
      const docRef = collectionRef.doc(data.id)
      docRef.update({
        firstName: data.firstName,
        lastName: data.lastName
      }).then(() => {
        // Update store
        employees.update(current => {
          let employee = current.find(e => e.id === data.id)
          employee.firstName = data.firstName
          employee.lastName = data.lastName
          return current
        })
        // The calling function will be expecting an employee object 
        resolve(get(employees).find(e => e.id === data.id))
      })
    } else {
      let newEmployee = {
        firstName: data.firstName,
        lastName: data.lastName,
        // add default values because I don't know if
        // these are needed by other other connected apps
        // TODO: check this, delete these if possible
        payrollId: '',
        status: 0
      }
      collectionRef.add(newEmployee).then(docRef => {
        newEmployee.id = docRef.id
        employees.update(current => [ ...current, newEmployee ])
        resolve(newEmployee)
      })
    }
  })
}

// For local testing
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
  return new Promise((resolve, reject) => {
    const docRef = collectionRef.doc(data.id)
    docRef.delete().then(() => {
      // Update store
      employees.update(current => {
        const index = current.findIndex(e => e.id === data.id)
        current.splice(index, 1)
        return current
      })
      resolve({ deleted: data })
    }).catch(error => reject(error))
  })
}

// For local testing
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
