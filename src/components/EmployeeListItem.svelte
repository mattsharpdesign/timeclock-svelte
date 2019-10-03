<script>
  import EmployeeForm from './EmployeeForm'
  export let employee
  let editing = false
  function startEditing() {
    editing = true
  }
  function stopEditing() {
    editing = false
  }
</script>

<li>
  {#if editing}
    <EmployeeForm {employee} onCancel={stopEditing} />
  {:else}
    <a href on:click|preventDefault={startEditing}>
      {employee.firstName} {employee.lastName}
    </a>
  {/if}
</li>