<script lang="ts">
  import { Button, Separator } from '$components';
  import { BookHeartIcon, Building2Icon, CalendarCheckIcon, DatabaseIcon, FileIcon, FileTextIcon, HandshakeIcon, LayoutDashboardIcon, ShoppingCartIcon, WalletCardsIcon } from 'lucide-svelte';
  import { SelectCompanyDropdown } from '$features';
  import { LanguageSelector } from '$entities/LanguageSelector';
  import { page } from '$app/stores';
  import { PlusIcon } from 'lucide-svelte';
  import { companyStore } from '$lib/stores/company';
  import { cn } from '$lib/utils';
  const {lang, id} = $page.params;

  const companyList = $derived($companyStore.companies);

  const menuItems = [
    {
      label: 'Dashboard',
      href: `/${lang}/in/${id}`,
      icon: LayoutDashboardIcon
    },
    {
      label: 'Sale',
      href: `/${lang}/in/${id}/sale`,
      icon: ShoppingCartIcon
    },
    {
      label: 'Purchase',
      href: `/${lang}/in/${id}/purchase`,
      icon: WalletCardsIcon
    },
    {
      label: 'Reports',
      href: `/${lang}/in/${id}/reports`,
      icon: BookHeartIcon
    },
    {
      label: 'Close Month',
      href: `/${lang}/in/${id}/close-month`,
      icon: CalendarCheckIcon
    },
    {
      label: ''
    },
    {
      label: 'Settlements',
      href: `/${lang}/in/${id}/additions`,
      icon: HandshakeIcon
    },
    {
      label: 'Fixed Assets',
      href: `/${lang}/in/${id}/additions`,
      icon: Building2Icon
    },
    {
      label: 'Other Documents',
      href: `/${lang}/in/${id}/additions`,
      icon: FileIcon
    },
    {
      label: 'Entries',
      href: `/${lang}/in/${id}/additions`,
      icon: FileTextIcon
    },
    {
      label: 'Fixed Data',
      href: `/${lang}/in/${id}/additions`,
      icon: DatabaseIcon
    }
  ];
  // console.log("companyList :: ", $companyStore)
</script>

<aside class={"sticky top-14 h-full flex flex-col p-3 bg-surface rounded-xl max-w-xs gap-6 items-start justify-between transition-all duration-300 w-64"}>
  {#if companyList.length}
    <SelectCompanyDropdown size="xs" />
  {:else}
    <Button leftIcon={PlusIcon} variant="primary" class="w-full">Add Company</Button>
  {/if}
  <nav class="w-full flex-1">
    <ul class="flex flex-col gap-1">
      {#each menuItems as item}
        <li>
          {#if item.label}
            <a 
              href={item.href} 
              class={cn(
                "flex gap-2 items-center font-medium text-foreground relative px-4 py-2 no-underline text-md rounded-md transition-colors duration-300",
                "after:absolute after:h-full after:w-1 after:rounded-md after:left-0 after:opacity-0 after:transition-opacity after:duration-300",
                "hover:after:bg-subtle/50 hover:after:opacity-100",
                item.href === $page.url.pathname && "after:!bg-primary after:opacity-100 text-primary"
              )}>
              <item.icon size={16} class={cn("bg-transparent text-muted", item.href === $page.url.pathname && "text-primary")} />
              {item.label}
            </a>
          {:else}
            <Separator class="my-1" />
          {/if}
        </li>
      {/each}
    </ul>
  </nav>
  <div class="flex items-center w-full">
    <LanguageSelector />
  </div>
</aside>