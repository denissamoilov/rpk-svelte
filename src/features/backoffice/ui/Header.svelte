<script lang="ts">
  import { Input, Button, Avatar, AvatarFallback } from '$components';
  import { userStore } from '$lib/stores/user';
  import logo from '$lib/assets/logo.svg';
  import { Search } from 'lucide-svelte';
</script>

<header class="p-4 bg-neutral-900 rounded-xl">
  <div class="flex gap-6 items-center justify-between">
    <div class="flex gap-6 items-center justify-start">
      <div class="flex shrink-0 items-center gap-3 ml-2">
        <img src={logo} alt="Raamatupidamiskeskus logo" width={32} height={32} />
        <span class="text-heading-3 leading-8 font-bold">RPK</span>
      </div>
      <nav>
        <ul class="flex items-center gap-2">
          <li><a href="/in/dashboard" class="menuLink active">Dashboard</a></li>
          <li><a href="/in/settings" class="menuLink">Settings</a></li>
        </ul>
      </nav>
    </div>
    <div class="flex items-center justify-end gap-6">
      <Input type="text" placeholder="Search" icon={Search} />
      <div class="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>
            {userStore.user()?.name.charAt(0)}{userStore.user()?.surname.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <p class="text-neutral-100 text-sm">
          {userStore.user()?.name} {userStore.user()?.surname}
        </p>
      </div>
      <div class="flex items-center gap-4">
        <Button variant="outline" on:click={() => userStore.logout()}>Logout</Button>
      </div>
    </div>
  </div>
</header>

<style lang="postcss">
  .menuLink {
    @apply text-neutral-500 relative hover:bg-neutral-800/50 block px-4 py-2 no-underline text-md rounded-md transition-colors duration-300;
    &.active {
      @apply bg-neutral-800;
      @apply text-neutral-100;
    }
  }
</style>