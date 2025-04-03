import { authStore } from "./stores/auth";
import { getApiUrl } from "./config";

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
  server?: {
    locals: {
      token?: string;
    };
  };
}

export async function api(endpoint: string, options: FetchOptions = {}) {
  const { requireAuth = true, ...fetchOptions } = options;

  // Add base URL
  const url = getApiUrl(endpoint);

  // Add default headers
  const headers = new Headers(fetchOptions.headers);
  headers.set("Content-Type", "application/json");

  // Add auth token if required
  if (requireAuth) {
    if (options.server?.locals?.token) {
      headers.set("Authorization", `Bearer ${options.server.locals.token}`);
    } else {
      const token = await authStore.getAccessToken();

      console.log("headers :: ", token)
      if (!token) throw new Error("No authentication token available");
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  // Make the request
  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  // Handle 401 (Unauthorized) by attempting to refresh token and retry
  if (response.status === 401 && requireAuth) {
    // Try to refresh the token
    const success = await authStore.refreshToken();
    if (success) {
      // Retry the request with new token
      const token = await authStore.getAccessToken();
      headers.set("Authorization", `Bearer ${token}`);
      return fetch(url, {
        ...fetchOptions,
        headers,
      });
    } else {
      // If refresh failed, throw error
      throw new Error("Authentication failed");
    }
  }

  return response;
}
