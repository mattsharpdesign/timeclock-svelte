<script>
  import { status, user } from '../stores/auth-store'
  import MainNav from './MainNav'
  import EmployeeList from './EmployeeList'
  import LogInForm from './LogInForm'
  import LoadingMessage from './LoadingMessage'
  import NotAuthorized from './NotAuthorized'

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
{#if $user}
  {#if $user.role === 'admin'}
    <EmployeeList />
  {:else if $status === 'authorizing'}
    <LoadingMessage message='Checking your permissions...' />
  {:else}
    <NotAuthorized />
  {/if}
{:else if $status ==='unknown'}
  <LoadingMessage message='Checking if you are signed in...' />
{:else}
  <LogInForm />
{/if}
<footer>
  Auth status: {$status}
</footer>