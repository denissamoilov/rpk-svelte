<script lang="ts">
  import { Button, Separator } from '$components';
  import { BookHeartIcon, Building2Icon, CalendarCheckIcon, DatabaseIcon, FileIcon, FileTextIcon, HandshakeIcon, ShoppingCartIcon, WalletCardsIcon } from 'lucide-svelte';
  import { SelectCompanyDropdown } from '$features';
  import { cn } from '$lib/utils';
  import { LanguageSelector } from '$entities/LanguageSelector';
  import { page } from '$app/stores';
  import { PlusIcon } from 'lucide-svelte';
  import { userStore } from '$lib/stores/user';
  const lang = $page.params.lang;
</script>

<aside class={"sticky top-14 h-[calc(100vh-3.5rem-0.75rem)] flex flex-col p-3 bg-neutral-900 rounded-xl max-w-xs gap-6 items-start justify-between transition-all duration-300 w-64"}>
  {#if $userStore.user?.companies.length}
    <SelectCompanyDropdown />
  {:else}
    <Button leftIcon={PlusIcon} variant="primary" class="w-full">Add Company</Button>
  {/if}
  <nav class="w-full flex-1">
    <ul class="flex flex-col gap-2">
      <li><a href={`/${lang}/in/sale`} class="menuLink active"><ShoppingCartIcon size={16} />Sale</a></li>
      <li><a href={`/${lang}/in/purchase`} class="menuLink"><WalletCardsIcon size={16} />Purchase</a></li>
      <li><a href={`/${lang}/in/reports`} class="menuLink"><BookHeartIcon size={16} />Reports</a></li>
      <li><a href={`/${lang}/in/close-month`} class="menuLink"><CalendarCheckIcon size={16} />Close Month</a></li>
      <li><Separator class="my-1" /></li>
      <li><a href={`/${lang}/in/additions`} class="menuLink"><HandshakeIcon size={16} />Settlements</a></li>
      <li><a href={`/${lang}/in/additions`} class="menuLink"><Building2Icon size={16} />Fixed Assets</a></li>
      <li><a href={`/${lang}/in/additions`} class="menuLink"><FileIcon size={16} />Other Documents</a></li>
      <li><a href={`/${lang}/in/additions`} class="menuLink"><FileTextIcon size={16} />Entries</a></li>
      <li><a href={`/${lang}/in/additions`} class="menuLink"><DatabaseIcon size={16} />Fixed Data</a></li>
    </ul>
  </nav>
  <div class="flex items-center w-full">
    <LanguageSelector />
  </div>
</aside>

<style lang="postcss">
  .menuLink {
    @apply flex gap-2 items-center text-neutral-500 relative hover:bg-neutral-800/50 px-4 py-2 no-underline text-md rounded-md transition-colors duration-300;
    &.active {
      @apply bg-neutral-800;
      @apply text-neutral-100;
    }
  }
</style>