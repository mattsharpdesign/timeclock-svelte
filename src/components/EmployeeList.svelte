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
  }
</script>

<div class="ui secondary menu">
  <div class="header item">Employees</div>
  <div class="item">
    <div class="ui icon input">
      <input type="search" bind:value={searchString} placeholder="Search...">
      <i 
        class="link icon" 
        class:search={!searchString}
        class:cut={searchString}
        on:click={() => searchString = ''}>
      </i>
    </div>
  </div>
  <div class="item">
    <button 
      class="ui basic button" 
      class:loading={$loading}
      on:click={loadEmployees}>
      Refresh
    </button>
  </div>
</div>

<div class="ui fluid vertical menu" class:loading={$loading}>
  {#each $sortedEmployees.filter(e => {
    if (!searchString) return true
    return (e.firstName + e.lastName).toLowerCase().indexOf(searchString.toLowerCase()) > -1
  }) as e (e.id)}
    <EmployeeListItem employee={e} />
  {/each}
</div>

{#if addingNewEmployee}
  <EmployeeForm employee={{}} {onCancel} {onSave} />
{:else}
  <button class="ui positive button" on:click={() => addingNewEmployee = true}>
    Add Employee
  </button>
{/if}
