import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { api } from "$lib/api";

import { config, getApiUrl } from "$lib/config";
import { json } from "@sveltejs/kit";

export async function GET({ request, cookies }) {
  try {

    const accessToken = cookies.get('accessToken');
    console.log("access token :: ", accessToken)
    if (!accessToken) {
      return json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }

    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/company/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      credentials: 'include'
    })

    const data = await response.json();
    console.log("data :: ", data)

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