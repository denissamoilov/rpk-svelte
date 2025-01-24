<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from "$app/stores";
  import { Select, type SelectSizeType } from "$components/select";
  import { userStore } from '$lib/stores/user';
  import type { SelectOptionType } from "$lib/types/docs";
  import { Building2Icon } from "lucide-svelte";

  const currentCompanyId = $page.params.id;

  let { size = "md" } = $props<{ size?: SelectSizeType}>();

  const userCompanies = $userStore.user?.companies;
  const selectedCompany: SelectOptionType | undefined = userCompanies?.find(c => String(c.value) === currentCompanyId);

  const changeCompany = (company: SelectOptionType) => {
    const lang = $page.params.lang;
    // const storeCompany = userCompanies.find(c => c.value === company.value);
    // storeCompany && companyStore.setSelectedCompany(company.value);
    
    goto(`/${lang}/in/${company.value}`);
  }
</script>

<!-- <Select size={size} onChangeHandle={changeCompany} options={companyList} currentValue={selectedCompany} leftIcon={Building2Icon} placeholder="SelectCompany" /> -->
{#if userCompanies && selectedCompany}
  <Select size={size} onChangeHandle={changeCompany} options={userCompanies} currentValue={selectedCompany} leftIcon={Building2Icon} placeholder="Select Company" />
{/if}