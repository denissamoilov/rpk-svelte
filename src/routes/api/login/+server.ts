import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { NODE_ENV } from '$env/static/private';
import { api } from '$lib/api';
import { config } from '$lib/config';
import { setSessionTokenCookie } from '$lib/session';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const body = await request.json();

    const response = await api(config.endpoints.auth.login, {
      requireAuth: false,
      method: 'POST',
      body: JSON.stringify(body),
      credentials: 'include'
    });

    // const response = await fetch(config.endpoints.auth.login, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body),
    //   credentials: 'include'
    // })

    const data = await response.json();

    if (!response.ok) {
      return json(
        { success: false, message: data.message || 'Login failed' },
        { status: response.status }
      );
    }

    if (!data.accessToken) {
      return json({ success: false, message: 'No access token received' }, { status: 400 });
    }

    const isDev = NODE_ENV === 'development';

    cookies.set('accessToken', data.accessToken, { 
      httpOnly: true, 
      secure: !isDev, // Only use secure in production
      path: '/',
      maxAge: 60 * 60, // 1 hour
      sameSite: 'lax' // This helps with cookie sending in modern browsers
    });

    return json({
      success: true,
      accessToken: data.accessToken,
      user: data.user,
    });
  } catch (error) {
    console.error('Login error:', error);
    return json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
};