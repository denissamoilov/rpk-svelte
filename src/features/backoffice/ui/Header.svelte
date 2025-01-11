<script lang="ts">
  import { NotificationsPopover, ProfileDropdown } from '$features';
  import logo from '$lib/assets/logo.svg';
  import { cn } from '$lib/utils';
</script>

<header class="flex justify-between items-center sticky top-0 py-2 px-4 bg-neutral-950 z-10 shadow-lg">
  <div class="flex w-full justify-between items-center">
    <div class="flex shrink-0 items-center gap-3 ml-2">
      <img src={logo} alt="Raamatupidamiskeskus logo" width={32} height={32} />
      <span class={cn("text-heading-3 leading-8 font-bold")}>RPK</span>
    </div>
  </div>
  <div class="flex items-center justify-end gap-3 shrink-0">
    <NotificationsPopover />
    <ProfileDropdown />
  </div>
</header>