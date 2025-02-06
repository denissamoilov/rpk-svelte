import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { api } from '$lib/api';
import { config } from '$lib/config';

export const GET: RequestHandler = async ({ params, cookies }) => {
  const accessToken = cookies.get('accessToken');

  console.log("accessToken :: ", accessToken)

  if (!accessToken) {
    return json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const response = await api(config.endpoints.company.getCompany.replace(':id', params.id), {
      method: 'GET',
      credentials: 'include',
      server: {
        locals: {
          token: accessToken
        }
      }
    })

    console.log("resposns :: ", response)

    if (!response.ok) {
      const error = await response.json();
      return json(
        { success: false, message: error.message || 'Failed to fetch company' },
        { status: response.status }
      );
    }

    const company = await response.json();
    console.log("api / company :: ", company)
    return json({ success: true, company });
    
  } catch (error) {
    console.error('Error fetching company:', error);
    return json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
};