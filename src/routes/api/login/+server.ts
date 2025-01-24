import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { api } from '$lib/api';
import { config } from '$lib/config';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const body = await request.json();

    const response = await api(config.endpoints.auth.login, {
      requireAuth: false,
      method: 'POST',
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      return json(
        { success: false, message: data.message || 'Login failed' },
        { status: response.status }
      );
    }

    // Set auth token in cookies
    cookies.set('auth_token', data.accessToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return json({
      success: true,
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    return json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
};