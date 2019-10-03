import { writable, derived, get } from 'svelte/store'

export const employees = writable([], () => {
  console.log('employees got their first listener')
  if (window.localStorage.getItem('employees')) {
    employees.set(JSON.parse(window.localStorage.getItem('employees')))
  }
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

export const saveEmployee = function(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        reject('An unexpected error occurred :(')
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
