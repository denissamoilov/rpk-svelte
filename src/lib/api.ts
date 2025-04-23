import { getApiUrl } from "./config";

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function api(endpoint: string, options: RequestInit = {}) {

  // Add base URL
  const url = getApiUrl(endpoint);

  // Add default headers
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  // Make the request
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });

  return response;
}
