import { config } from "$lib/config";

export async function load({params, fetch}) {
  const companyId = params.id;

  try {
    const response = await fetch(config.endpoints.local.getCompanyList);

    if (!response.ok) {
      console.error("Failed to fetch companies:", await response.text());
      return {
        data: {
          companies: [],
          selectedCompanyId: companyId
        }
      };
    }

    const data = await response.json();

    return {
      companies: data.companies,
      selectedCompanyId: companyId
    };
  } catch (error) {
    console.error("Error fetching user companies:", error);
    return {
      companies: [],
      selectedCompanyId: companyId
    };
  }
}