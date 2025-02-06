import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { api } from "$lib/api";

import { config, getApiUrl } from "$lib/config";
import { json } from "@sveltejs/kit";

export async function GET({ request, cookies }) {
  try {

    const accessToken = cookies.get('accessToken');

    if (!accessToken) {
      return json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }

    // const response = await fetch(getApiUrl(config.endpoints.company.getUserCompanyList), {
    // // const response = await fetch(`${PUBLIC_BACKEND_URL}/api/company/list`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${accessToken}`
    //   },
    //   credentials: 'include'
    // })

    const response = await api(config.endpoints.company.getUserCompanyList, {
      method: 'GET',
      credentials: 'include',
      server: {
        locals: {
          token: accessToken
        }
      }
    })

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