import { get } from "svelte/store";
import { companyStore } from "$lib/stores/company";
import type { PageLoad } from "./$types";

export const load: PageLoad = async({ params, data }) => {
  const company = await companyStore.fetchCompany(params.id);
  return { company, id: params.id };
}