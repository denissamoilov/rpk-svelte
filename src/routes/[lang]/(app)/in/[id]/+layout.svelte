<script lang="ts">
  import { BackofficeSidebar } from "$features";
  import { Footer } from "$features";
  import { companyStore } from "$lib/stores/company";
  import type { LayoutData } from "./$types";

  let { data, children } = $props<{ data: LayoutData }>();
  
  // Reset selected company on mount
  $effect(() => {
    companyStore.setSelectedCompany(data.company);
  });

</script>
<div class="grid grid-cols-[16rem_1fr] flex-1 gap-6 px-3 pb-3 h-full">
  <BackofficeSidebar />
  <main class="flex flex-col flex-1 items-center">
    <div class="grow">
      {@render children()}
    </div>
    <Footer />
  </main>
</div>