<script>
  import { fade } from 'svelte/transition'
  import EmployeeForm from './EmployeeForm'
  export let employee

  let editing = false, hasChanged = false
  
  function startEditing() {
    editing = true
  }

  function onCancel(wasChanged = false) {
    editing = false
  }

  function onSave(updatedEmployee) {
    editing = false
    hasChanged = true
    setTimeout(() => {
      hasChanged = false
    }, 3000)
  }
</script>

<li id={employee.id} class:hasChanged={hasChanged} out:fade>
  {#if editing}
    <EmployeeForm {employee} {onCancel} {onSave} />
  {:else}
    <a href on:click|preventDefault={startEditing}>
      {employee.firstName} {employee.lastName}
    </a>
  {/if}
</li>