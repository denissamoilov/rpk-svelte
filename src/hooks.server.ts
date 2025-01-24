import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const authToken = event.cookies.get("auth_token");

  event.locals = {
    ...event.locals,
    token: authToken
  };

  const response = await resolve(event, {
    preload: ({ type }) => {
      return type === "font" || type === "js" || type === "css";
    },
  });
  return response;
};

// export { handle as authHandle } from "./lib/auth";
