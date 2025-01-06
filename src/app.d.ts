/// <reference types="@sveltejs/kit" />

declare namespace App {
  // interface Error {}
  // interface Locals {}
  // interface PageData {}
  // interface Platform {}
}

declare module "$env/static/public" {
  export const PUBLIC_BACKEND_URL: string;
}
