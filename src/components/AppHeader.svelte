<script>
  import { user, signOut } from '../stores/auth-store'
</script>

<header>
  <h1>TimeClock Employee Management</h1>
  {#if $user}
    <a class="signout" href on:click|preventDefault={signOut}>Sign out {$user.email}</a>
  {/if}
  <hr />
</header>