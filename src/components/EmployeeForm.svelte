<script>
  import { onMount } from 'svelte'
  import { loadEmployees, saveEmployee, deleteEmployee } from '../stores/employee-store'

  export let employee, onCancel

  let firstName, lastName
  let isSaving = false, isDeleting = false
  let errorMessage = ''

  onMount(() => {
    firstName = employee.firstName
    lastName = employee.lastName
  })

  function handleSave() {
    isSaving = true
    errorMessage = ''
    saveEmployee({
      id: employee.id,
      firstName,
      lastName
    }).then(() => {
      isSaving = false
      loadEmployees()
      onCancel()
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
          loadEmployees()
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

<style>
  p.error {
    color: crimson;
  }
</style>

<form>
  <input type="text" bind:value={firstName} placeholder="First name">
  <input type="text" bind:value={lastName} placeholder="Last name">
  <button type="button" on:click={handleSave}>{isSaving ? 'Saving...' : 'Save'}</button>
  {#if employee.id}
    <button type="button" on:click={handleDelete}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
  {/if}
  <button type="button" on:click={onCancel}>Cancel</button>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
</form>