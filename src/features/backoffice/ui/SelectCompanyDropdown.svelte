<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from "$app/stores";
  import { Select, type SelectSizeType } from "$components/select";
  import { companyStore } from '$lib/stores/company';
  import type { SelectOptionType } from "$lib/types/docs";
  import { Building2Icon } from "lucide-svelte";

  let { size = "md" } = $props<{ size?: SelectSizeType}>();
  
  const currentCompanyId = $page.params.id;
  const companies = $derived($companyStore.companies);

  const selectOptions = $derived(companies.map(company => ({
    value: company.id,
    label: company.name
  })));

  const selectedCompany: SelectOptionType | undefined = $derived(selectOptions?.find(c => String(c.value) === currentCompanyId));

  const changeCompany = (company: SelectOptionType) => {
    const lang = $page.params.lang;
    // const storeCompany = userCompanies.find(c => c.value === company.value);
    // storeCompany && companyStore.setSelectedCompany(company.value);
    
    goto(`/${lang}/in/${company.value}`);
  }
</script>

<!-- <Select size={size} onChangeHandle={changeCompany} options={companyList} currentValue={selectedCompany} leftIcon={Building2Icon} placeholder="SelectCompany" /> -->
{#if selectOptions && selectedCompany}
  <Select
    size={size}
    onChangeHandle={changeCompany}
    options={selectOptions}
    currentValue={selectedCompany}
    leftIcon={Building2Icon}
    placeholder="Select Company"
  />
{/if}