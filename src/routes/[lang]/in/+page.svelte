<script lang="ts">
  import { userStore } from '$lib/stores/user';
  import { Button } from '$components';
</script>

<h1>Logged in</h1>
<p>You are logged in as {userStore.user()?.email}</p>

<Button on:click={() => userStore.logout()}>Logout</Button>