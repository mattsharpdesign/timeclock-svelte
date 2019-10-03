<script>
  import { user, logOut } from '../stores/auth-store'

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
      <small on:click={logOut}>Log out {$user.email}</small>
    {/if}
  </h1>
</nav>