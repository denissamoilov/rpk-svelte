import { API_URL } from "$env/static/private";

export const config = {
  apiUrl: API_URL,
  endpoints: {
    auth: {
      login: "/api/login",
      register: "/api/verify-email",
      refreshToken: "/api/refresh-token",
      verify: "/api/verify",
      resetPassword: "/api/reset-password",
      forgotPassword: "/api/forgot-password",
    },
  },
} as const;

// Helper function to build full API URLs
export function getApiUrl(endpoint: string): string {
  return `${config.apiUrl}${endpoint}`;
}
