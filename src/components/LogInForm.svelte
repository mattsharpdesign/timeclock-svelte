<script>
  import { status, signIn, errorMessage } from '../stores/auth-store'
  
  let email = '', password = ''

  function handleSignIn() {
    signIn(email, password)
  }
</script>

<div class="ui info icon message">
  <i class="user secret icon"></i>
  <div class="content">
    <div class="header">
      Please sign in to continue.
    </div>
    <p>Use your existing Online TimeKeeper admin email and password.</p>
  </div>
</div>

<form class="ui form" class:error={errorMessage} on:submit|preventDefault={handleSignIn}>
  <div class="two fields">
    <div class="field">
      <label>Email</label>
      <input type="email" bind:value={email} placeholder="Email address">
    </div>
    <div class="field">
      <label>Password</label>
      <input type="password" bind:value={password} placeholder="Password">
    </div>
  </div>
  {#if $errorMessage}
    <div class="ui error message">{$errorMessage}</div>
  {/if}
  <button 
    class="ui positive button" 
    class:loading={$status === 'signing in'}>
    Sign In
  </button>
</form>