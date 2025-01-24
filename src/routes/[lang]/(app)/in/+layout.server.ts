import { api } from "$lib/api";
import { config } from "$lib/config";

export async function load({params, cookies}) {
  const companyId = params.id;

  try {
    const response = await api(config.endpoints.company.getCompanyList, {   
      method: "GET",
      server: {
        locals: {
          token: cookies.get("auth_token")
        }
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }

    const companies = await response.json();
    return { companies, selectedCompanyId: companyId };
  } catch (error) {
    console.error("Error fetching user companies:", error);
  }
}