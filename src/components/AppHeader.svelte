<script>
  import { user, signOut } from '../stores/auth-store'
</script>

<div class="ui stackable menu">
  <div class="header item">TimeClock Employee Management</div>
  {#if $user}
    <div class="right menu">
      <a class="item" href on:click|preventDefault={signOut}>Sign out {$user.email}</a>
    </div>
  {/if}
</div>