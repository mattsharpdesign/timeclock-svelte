<script>
  import packageJson from '../../package.json'
  import { status, user } from '../stores/auth-store'
</script>

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