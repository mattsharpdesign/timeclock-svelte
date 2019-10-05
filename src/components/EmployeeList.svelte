<script>
  import { loading, loadEmployees, sortedEmployees } from '../stores/employee-store'
  import EmployeeListItem from './EmployeeListItem'
  import EmployeeForm from './EmployeeForm'

  let searchString = ''
  let addingNewEmployee = false

  function onCancel() {
    addingNewEmployee = false
  }
  function onSave(newEmployee) {
    addingNewEmployee = false
    window.alert(`${newEmployee.firstName} ${newEmployee.lastName} added.`)
    // This adds style to the newly added item, but I'm not using it now
    // const element = document.getElementById(returnedValue.id)
    // if (element) {
    //   element.className = element.className + ' isNew'
    //   setTimeout(() => {
    //     className = element.className
    //     element.className = className.substr(0, className.indexOf(' isNew'))
    //   }, 2000)
    // }
  }
</script>

<style>
  button {
    margin-left: 20px;
    font-size: large;
    padding: 10px 20px;
  }
</style>

<header>
  <h1>Employees</h1>
  <input type="search" bind:value={searchString} placeholder="Search...">
  <a href on:click|preventDefault={loadEmployees}>
    {$loading ? 'Loading...' : 'Reload'}
  </a>
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
  <EmployeeForm employee={{}} {onCancel} {onSave} />
{:else}
  <button class="add" on:click={() => addingNewEmployee = true}>
    Add Employee
  </button>
{/if}
