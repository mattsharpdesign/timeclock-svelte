<script>
  import { loading, loadEmployees, sortedEmployees } from '../stores/employee-store'
  import EmployeeListItem from './EmployeeListItem'
  import EmployeeForm from './EmployeeForm'

  let addingNewEmployee = false
</script>
<h3>
  Employees
  {#if $loading}
    <small>Loading</small>
  {:else}
    <small on:click={loadEmployees}>Reload</small>
  {/if}
</h3>
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
