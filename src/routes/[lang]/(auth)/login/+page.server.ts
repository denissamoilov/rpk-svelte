import { superValidate } from 'sveltekit-superforms';
import { fail } from "sveltekit-superforms/client";
import { zod } from "sveltekit-superforms/adapters";
import { loginSchemaZ } from '$schemas/auth';
import type { PageServerLoad, Actions } from './$types';
import { config } from '$lib/config';
import { api } from '$lib/api';

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(loginSchemaZ));

  return { form };
}

export const actions = {
  default: async ({ request, cookies, fetch }) => {
    const form = await superValidate(request, zod(loginSchemaZ));
    
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const response = await api(config.endpoints.auth.login, {
        method: 'POST',
        body: JSON.stringify(form.data),
      });

      const data = await response.json();

      if (!response.ok || !data.accessToken) {
        return fail(400, { form });
      }

      // Set the access token in cookies
      cookies.set('accessToken', data.accessToken, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60, // 1 hour
        sameSite: 'lax'
      });

      // console.log('data.accessToken :: ', data);

      // Get user data with the new access token
      // const userResponse = await fetch('http://localhost:5173/api/user/me', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${data.accessToken}`
      //   },
      //   // server: {
      //   //   locals: {
      //   //     token: data.accessToken
      //   //   }
      //   // }
      // });

      // if (!userResponse.ok) {
      //   return fail(400, { form });
      // }

      // const userData = await userResponse.json();

      return { 
        form,
        success: true,
        user: data.user
      };
    } catch (error) {
      console.error('Login error:', error);
      return fail(400, { form });
    }
  }
} satisfies Actions;