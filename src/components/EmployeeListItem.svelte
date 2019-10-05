<script>
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
    // alert(`${updatedEmployee.firstName} ${updatedEmployee.lastName} saved.`)
    hasChanged = true
    setTimeout(() => {
      hasChanged = false
    }, 3000)
  }
</script>

<li id={employee.id} class:hasChanged={hasChanged}>
  {#if editing}
    <EmployeeForm {employee} {onCancel} {onSave} />
  {:else}
    <a href on:click|preventDefault={startEditing}>
      {employee.firstName} {employee.lastName}
    </a>
  {/if}
</li>