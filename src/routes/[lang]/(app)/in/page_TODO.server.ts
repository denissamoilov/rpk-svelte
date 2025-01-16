import { api } from "$lib/api";
import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { config } from "$lib/config";

export const load: LayoutServerLoad = async ({ locals, params }) => {
  try {
    const response = await api(config.endpoints.company.getCompanies, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }

    const companies = await response.json();

    // If user has no companies, redirect to company creation
    // if (companies.length === 0) {
    //   throw redirect(303, `/${params.lang}/in/company/create`);
    // }

    return {
      companies,
      selectedCompany: companies[0], // Default to first company
    };
  } catch (err) {
    if (err instanceof Response) {
      throw error(err.status, err.statusText);
    }
    throw error(
      500,
      err instanceof Error ? err.message : "Failed to fetch companies"
    );
  }
};
