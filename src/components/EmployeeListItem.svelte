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
    <h4 on:click={startEditing}>
      {employee.firstName} {employee.lastName}
    </h4>
  {/if}
</li>