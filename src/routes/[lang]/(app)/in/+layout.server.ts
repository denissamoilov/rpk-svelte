import { api } from "$lib/api";
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
    return {
      data: {
        companies: [],
        selectedCompanyId: companyId
      }
    };
  }
}