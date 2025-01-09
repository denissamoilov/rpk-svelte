<script lang="ts">
  import { Button, Input, Separator } from '$components';
  import logo from '$lib/assets/logo.svg';
  import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon, BookHeartIcon, Building2Icon, CalendarCheckIcon, DatabaseIcon, FileIcon, FileTextIcon, HandshakeIcon, ShoppingCartIcon, WalletCardsIcon } from 'lucide-svelte';
  import { SelectCompanyDropdown, ProfileDropdown, NotificationsPopover } from '$features';
  import { cn } from '$lib/utils';
</script>

<aside class={cn("p-4 bg-neutral-900 rounded-xl max-w-xs flex flex-col gap-6 items-start justify-between sticky top-0 min-h-full transition-all duration-300 w-64")}>
  <div class="flex w-full justify-between items-center">
    <div class="flex shrink-0 items-center gap-3 ml-2">
      <img src={logo} alt="Raamatupidamiskeskus logo" width={32} height={32} />
      <span class={cn("text-heading-3 leading-8 font-bold")}>RPK</span>
    </div>
  </div>
  <Separator />
  <SelectCompanyDropdown />
  <nav class="w-full flex-1">
    <ul class="flex flex-col gap-2">
      <li><a href="/in/sale" class="menuLink active"><ShoppingCartIcon size={16} />Sale</a></li>
      <li><a href="/in/purchase" class="menuLink"><WalletCardsIcon size={16} />Purchase</a></li>
      <li><a href="/in/reports" class="menuLink"><BookHeartIcon size={16} />Reports</a></li>
      <li><a href="/in/reports" class="menuLink"><CalendarCheckIcon size={16} />Close Month</a></li>
      <li><Separator /></li>
      <li><a href="/in/additions" class="menuLink"><HandshakeIcon size={16} />Settlements</a></li>
      <li><a href="/in/additions" class="menuLink"><Building2Icon size={16} />Fixed Assets</a></li>
      <li><a href="/in/additions" class="menuLink"><FileIcon size={16} />Other Documents</a></li>
      <li><a href="/in/additions" class="menuLink"><FileTextIcon size={16} />Entries</a></li>
      <li><a href="/in/additions" class="menuLink"><DatabaseIcon size={16} />Fixed Data</a></li>
    </ul>
  </nav>
  <nav class="w-full">
    <ul class="flex flex-col gap-2">
      <li><NotificationsPopover /></li>
    </ul>
  </nav>
  <div class="flex items-center justify-end gap-3">
    <ProfileDropdown />
  </div>
</aside>

<style lang="postcss">
  .menuLink {
    @apply flex gap-2 items-center text-neutral-500 relative hover:bg-neutral-800/50 pl-3 pr-4 py-2 no-underline text-md rounded-md transition-colors duration-300;
    &.active {
      @apply bg-neutral-800;
      @apply text-neutral-100;
    }
  }
</style>