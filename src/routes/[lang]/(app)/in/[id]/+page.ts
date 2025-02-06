import { companyStore } from "$lib/stores/company";
import type { PageLoad } from "./$types";

export const load: PageLoad = async({ params }) => {
  const company = await companyStore.fetchCompany(params.id);
  if (!company) {
    return {
      status: 404,
      error: new Error('Company not found')
    }
  }
  companyStore.setSelectedCompany(company);
  return { company, id: params.id };
}