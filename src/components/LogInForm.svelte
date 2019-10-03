<script>
  import { status, logIn } from '../stores/auth-store'
</script>

<h3>Log In</h3>
<form>
  <input type="email" placeholder="Email address" disabled>
  <input type="password" placeholder="Password" disabled>
  <button type="button" on:click={logIn} disabled={$status === 'logging in'}>
    {$status === 'logging in' ? 'Logging in' : 'Log in'}
  </button>
</form>