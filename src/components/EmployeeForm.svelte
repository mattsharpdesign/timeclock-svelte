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
    // Validation is done in the store now
    // if (!firstName || !lastName) {
    //   errorMessage = 'First and last name are required.'
    //   return
    // }
    isSaving = true
    errorMessage = ''
    saveEmployee({
      id: employee.id,
      firstName,
      lastName
    }).then((savedEmployee) => {
      console.log(savedEmployee)
      isSaving = false
      onSave(savedEmployee)
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
        .then(result => {
          console.log(result)
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

<form 
  class="ui form" 
  class:error={errorMessage}
  on:submit|preventDefault={handleSave}>
  <div class="two fields">
    <div class="field">
      <input type="text" bind:value={firstName} placeholder="First name">
    </div>
    <div class="field">
      <input type="text" bind:value={lastName} placeholder="Last name">
    </div>
  </div>
  {#if errorMessage}
    <div class="ui error message">{errorMessage}</div>
  {/if}
  <button 
    class="ui positive button"
    class:loading={isSaving}>
    Save
  </button>
  {#if employee.id}
    <button 
      type="button" 
      class="ui negative button" 
      class:loading={isDeleting}
      on:click={handleDelete}>
      Delete
    </button>
  {/if}
  <button type="button" class="ui basic button" on:click={onCancel}>Cancel</button>
</form>