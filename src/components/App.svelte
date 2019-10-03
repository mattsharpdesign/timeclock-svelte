<script>
  import { status, user } from '../stores/auth-store'
  import MainNav from './MainNav'
  import EmployeeList from './EmployeeList'
  import LogInForm from './LogInForm'

  export let appTitle = '';
</script>

<style>
  footer {
    color: dimgray;
    position: absolute;
    bottom: 0;
  }
</style>

<MainNav title={appTitle} />
{#if $status === 'logged in'}
  <EmployeeList />
{:else}
  <LogInForm />
{/if}
<footer>
  Auth status: {$status}
</footer>