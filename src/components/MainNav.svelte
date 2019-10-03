<script>
  import { user, signOut } from '../stores/auth-store'

  export let title = '';
</script>

<style>
  small {
    cursor: pointer;
    color: dimgray;
    margin-left: 20px;
  }
</style>

<nav>
  <h1>
    {title}
    {#if $user}
      <small on:click={signOut}>Sign out {$user.email}</small>
    {/if}
  </h1>
</nav>