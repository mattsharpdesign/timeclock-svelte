<script>
  import packageJson from '../../package.json'
  import { status, user } from '../stores/auth-store'
</script>

<style>
  .menu {
    background-color: #eee !important;
    border-top: 1px solid #ccc !important;
  }
</style>

<div class="ui bottom fixed text menu">
  <div class="item">
    Auth status: {$status}
    {#if $user} 
      | Account ID: {$user.accountId}
    {/if}
    | App version: {packageJson.name} v{packageJson.version}
    | Environment: {process.env.NODE_ENV}
  </div>
</div>