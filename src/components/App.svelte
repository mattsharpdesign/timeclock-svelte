<script>
  import { status, user } from '../stores/auth-store'
  import AppHeader from './AppHeader'
  import AppFooter from './AppFooter'
  import EmployeeList from './EmployeeList'
  import LogInForm from './LogInForm'
  import LoadingMessage from './LoadingMessage'
  import NotAuthorized from './NotAuthorized'

  import 'normalize.css'

  export let appTitle = '';
</script>

<AppHeader title={appTitle} />
<main>
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
</main>
<AppFooter />