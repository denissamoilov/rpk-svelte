<script lang="ts">
    import { Button } from "$components";
  import { BackofficeSidebar, NotificationsPopover, ProfileDropdown, SelectCompanyDropdown } from "$features";
  import { Footer } from "$features";
  import { companyStore } from "$lib/stores/company";
    import { PlusIcon } from "lucide-svelte";
  import type { LayoutData } from "./$types";

  let { data, children } = $props<{ data: LayoutData }>();

  const companyList = $derived($companyStore.companies);
  
  // Reset selected company on mount
  $effect(() => {
    companyStore.setSelectedCompany(data.company);
  });

</script>
<div class="h-dvh grid grid-cols-[16rem_1fr] flex-1 h-full">
  <BackofficeSidebar />
  <main class="flex flex-col flex-1 items-center">
    <div class="sticky top-0 py-3 px-4 flex items-center justify-end gap-3 shrink-0 border-b border-border w-full bg-surface">
      <div class="flex items-center w-full justify-start justify-self-start">
        {#if companyList.length}
          <SelectCompanyDropdown size="xs" />
        {:else}
          <Button leftIcon={PlusIcon} variant="primary" class="w-full">Add Company</Button>
        {/if}
      </div>
      <NotificationsPopover />
      <ProfileDropdown />
    </div>
    <div class="grow p-4">
      {@render children()}
    </div>
    <Footer />
  </main>
</div>