<script lang="ts">
  import { page } from "$app/stores";
  import { BackofficeSidebar } from "$features";
  import { Footer } from "$features";
  import { companyStore } from "$lib/stores/company";
  import { onMount } from "svelte";

  let { children } = $props();

  onMount(() => {
    companyStore.setSelectedCompany($page.params.id);
  })

</script>
<div class="grid grid-cols-[250px_1fr] flex-1 gap-4 px-3 pb-3">
  <!-- <BackofficeSidebar /> -->
  <main class="flex flex-col flex-1 items-center">
    <div class="grow">
      {@render children()}
    </div>
    <Footer />
  </main>
</div>