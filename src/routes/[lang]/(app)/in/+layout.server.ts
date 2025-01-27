import { api } from "$lib/api";
import { config } from "$lib/config";

export async function load({params, fetch}) {
  const companyId = params.id;

  try {
    const response = await fetch(config.endpoints.local.getCompanyList);

    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }

    const data = await response.json();
    console.log("companies :: ", data)
    return {
      data: {
        companies: data.companies, selectedCompanyId: companyId
      },
      headers: {
        'cache-control': 'max-age=3600',
      }
    };
  } catch (error) {
    console.error("Error fetching user companies:", error);
  }
}