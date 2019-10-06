<script>
  import { status, user } from '../stores/auth-store'
  import AppHeader from './AppHeader'
  import AppFooter from './AppFooter'
  import EmployeeList from './EmployeeList'
  import LogInForm from './LogInForm'
  import LoadingMessage from './LoadingMessage'
  import NotAuthorized from './NotAuthorized'
  import 'semantic-ui-css/semantic.css'

  export let appTitle = '';
</script>

<style>
  .container {
    padding-bottom: 100px;
  }
</style>

<AppHeader title={appTitle} />
<div class="ui container">
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
</div>
<AppFooter />