import { userStore } from "./stores/user";
import { getApiUrl } from "./config";

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
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
    const token = await userStore.getAccessToken();
    userStore.getAccessToken().then((token) => {
      console.log("Token ::", token);
    });
    if (!token) {
      throw new Error("No authentication token available");
    }
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Make the request
  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  // Handle 401 (Unauthorized) by attempting to refresh token and retry
  if (response.status === 401 && requireAuth) {
    // Try to refresh the token
    const success = await userStore.updateTokens(true);
    if (success) {
      // Retry the request with new token
      const token = await userStore.getAccessToken();
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
