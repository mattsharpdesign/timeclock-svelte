<script>
  import { status, user } from '../stores/auth-store'
</script>

<footer>
  Auth status: {$status}
  {#if $user} 
    | Account ID: {$user.accountId}
  {/if}
</footer>