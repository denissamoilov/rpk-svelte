import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { config } from "$lib/config";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  let accessToken = event.cookies.get("accessToken");

  if(!accessToken) {
    const refreshToken = event.cookies.get('refreshToken');
    // if (!refreshToken) return;

    const res = await fetch(`${PUBLIC_BACKEND_URL}${config.endpoints.auth.refreshToken}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken }),
      credentials: 'include'
    })

    if(res.ok) {
      const data = await res.json();
      accessToken = data.accessToken;
      accessToken && event.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 // 1 hour
      })
    }
  }

  event.locals = {
    ...event.locals,
    token: accessToken
  };

  const response = await resolve(event, {
    preload: ({ type }) => {
      return type === "font" || type === "js" || type === "css";
    },
  });
  return response;
};

// export { handle as authHandle } from "./lib/auth";
