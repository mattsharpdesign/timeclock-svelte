<script>
  import { sortedEmployees, addFakeEmployee } from '../stores/employee-store'
  import EmployeeListItem from './EmployeeListItem'
  import EmployeeForm from './EmployeeForm'

  let addingNewEmployee = false
</script>
<h3>Employees</h3>
<ul>
  {#each $sortedEmployees as e (e.id)}
    <EmployeeListItem employee={e} />
  {/each}
</ul>
{#if addingNewEmployee}
  <EmployeeForm employee={{}} onCancel={() => addingNewEmployee = false} />
{:else}
  <button on:click={() => addingNewEmployee = true}>
    Add Employee
  </button>
{/if}
