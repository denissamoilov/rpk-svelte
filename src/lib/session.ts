import type { Cookies } from "@sveltejs/kit";

export function setSessionTokenCookie(
  cookieName: string,
  cookies: Cookies,
  token: string,
  expiresAt: Date
): void {
  cookies.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export function deleteSessionTokenCookie(cookies: Cookies, cookieName: string): void {
  cookies.set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}
