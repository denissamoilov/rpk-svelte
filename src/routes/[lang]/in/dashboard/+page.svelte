<script lang="ts">
  import { userStore } from '$lib/stores/user';
</script>

<h1>Logged in</h1>

<p>You are logged in as {userStore.user()?.email}</p>