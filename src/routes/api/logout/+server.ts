import { json } from '@sveltejs/kit';
import type { RequestHandler } from "@sveltejs/kit";
import { deleteSessionTokenCookie } from '$lib/session';
import { config } from '$lib/config';
import { api } from '$lib/api';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const body = await request.json();

    const response = await api(config.endpoints.auth.logout, {
      method: 'POST',
      body: JSON.stringify(body),
      requireAuth: false
    });

    if (!response.ok) {
      return json(
        { success: false, message: 'Logout failed' },
        { status: response.status }
      );
    }

    deleteSessionTokenCookie(cookies, 'auth_token');
    return json({ success: true });
  } catch {
    console.error('Logout error');
    return json({ success: false, message: 'Logout failed' }, { status: 500 });
  }
};