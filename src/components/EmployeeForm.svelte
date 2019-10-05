<script>
  import { onMount } from 'svelte'
  import { loadEmployees, saveEmployee, deleteEmployee } from '../stores/employee-store'

  export let employee, onCancel, onSave

  let firstName, lastName
  let isSaving = false, isDeleting = false
  let errorMessage = ''

  onMount(() => {
    firstName = employee.firstName
    lastName = employee.lastName
  })

  function handleSave() {
    if (!firstName || !lastName) {
      errorMessage = 'First and last name are required.'
      return
    }
    isSaving = true
    errorMessage = ''
    saveEmployee({
      id: employee.id,
      firstName,
      lastName
    }).then((returnedValue) => {
      console.log(returnedValue)
      isSaving = false
      onSave(returnedValue)
    }).catch(error => {
      isSaving = false
      console.log('Error saving employee:', error.code, error.message)
      errorMessage = error.message
    })
  }

  function handleDelete() {
    if (window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      isDeleting = true
      deleteEmployee(employee)
        .then(() => {
          isDeleting = false;
          onCancel()
        })
        .catch(error => {
          isDeleting = false;
          console.log('Error deleting employee:', error.code, error.message)
          errorMessage = error.message
        })
    }
  }
</script>

<form on:submit|preventDefault={handleSave}>
  <input type="text" bind:value={firstName} placeholder="First name">
  <input type="text" bind:value={lastName} placeholder="Last name">
  <button class="save">{isSaving ? 'Saving...' : 'Save'}</button>
  {#if employee.id}
    <button type="button" class="delete" on:click={handleDelete}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
  {/if}
  <button type="button" on:click={onCancel}>Cancel</button>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
</form>