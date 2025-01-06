<script lang="ts">
  import { Input, Button } from '$components';
  import { userStore } from '$lib/stores/user';
  import logo from '$lib/assets/logo.svg';
</script>

<header class="pt-4 px-6 bg-neutral-900">
  <div class="flex gap-6 items-center justify-between mb-2">
    <div class="flex shrink-0 items-center gap-3">
      <img src={logo} alt="Raamatupidamiskeskus logo" width={32} height={32} />
      <span class="text-heading-3 leading-8 font-bold">RPK</span>
    </div>
    <Input type="text" placeholder="Search" />
    <div class="flex items-center gap-4">
      <Button variant="outline" on:click={() => userStore.logout()}>Logout</Button>
    </div>
  </div>
  <nav>
    <ul class="flex items-center gap-4">
      <li><a href="/in/dashboard" class="menuLink active">Dashboard</a></li>
      <li><a href="/in/settings" class="menuLink">Settings</a></li>
    </ul>
  </nav>
</header>

<style lang="postcss">
  .menuLink {
    @apply text-gray-500 relative hover:after:bg-gray-200 block px-4 py-2 no-underline text-md;
    &:after {
      @apply content-[''] absolute bottom-0 inset-x-0 h-0.5 bg-none transition-colors duration-300;
    }
    &.active {
      @apply text-gray-900;
      &:after {
        @apply bg-gray-300;
      }
    }
  }
</style>