<script>
  import { loading, loadEmployees, sortedEmployees } from '../stores/employee-store'
  import EmployeeListItem from './EmployeeListItem'
  import EmployeeForm from './EmployeeForm'

  let searchString = ''
  let addingNewEmployee = false
</script>

<header>
  <h1>Employees</h1>
  <a href on:click|preventDefault={loadEmployees}>
    {$loading ? 'Loading...' : 'Reload'}
  </a>
  <input type="search" bind:value={searchString} placeholder="Search...">
</header>
<ul class="employees" class:loading={$loading}>
  {#each $sortedEmployees.filter(e => {
    if (!searchString) return true
    return (e.firstName + e.lastName).toLowerCase().indexOf(searchString.toLowerCase()) > -1
  }) as e (e.id)}
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
