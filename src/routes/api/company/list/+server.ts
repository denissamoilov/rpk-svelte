import { api } from "$lib/api";

import { config } from "$lib/config";
import { json } from "@sveltejs/kit";

export async function GET({ request, cookies }) {
  try {
    
    const response = await api(config.endpoints.company.getCompanyList, {
      method: "GET",
      server: {
        locals: {
            token: cookies.get("auth_token")
        }
      }
    });

    const data = await response.json();

    if(!data.success) {
      return json(
        { success: false, message: data.message || 'Failed to fetch companies' },
        { status: response.status }
      );
    }

    return json(data);
  } catch (error) {
    console.error("SERVER ACTION :: Error fetching user companies:", error);
  }
}