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

<style>
  a {
    font-size: larger;
  }
  .changed a {
    color: green !important;
  }
</style>

<div 
  class="item" id={employee.id} 
  class:changed={hasChanged} 
  transition:fade>
  {#if editing}
    <EmployeeForm {employee} {onCancel} {onSave} />
  {:else}
    <a href on:click|preventDefault={startEditing}>
      {employee.firstName} {employee.lastName}
    </a>
  {/if}
</div>