<script>
  import { status, signIn, errorMessage } from '../stores/auth-store'
  
  let email = '', password = ''

  function handleSignIn() {
    signIn(email, password)
  }
</script>

<h3>Sign In</h3>
<form>
  <input type="email" bind:value={email} placeholder="Email address">
  <input type="password" bind:value={password} placeholder="Password">
  <button type="button" on:click={handleSignIn} disabled={$status === 'signing in'}>
    {$status === 'signing in' ? 'Signing in' : 'Sign in'}
  </button>
  {#if $errorMessage}
    <p>{$errorMessage}</p>
  {/if}
</form>