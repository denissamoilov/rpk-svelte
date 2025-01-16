import { PUBLIC_BACKEND_URL } from "$env/static/public";

export const config = {
  apiUrl: PUBLIC_BACKEND_URL,
  endpoints: {
    auth: {
      login: "/api/login",
      signup: "/api/signup",
      refreshToken: "/api/refresh-token",
      verifyEmail: "/api/verify-email",
      resetPassword: "/api/reset-password",
      forgotPassword: "/api/forgot-password",
    },
    company: {
      getCompanyList: "/api/company/list",
      createCompany: "/api/company/create",
      updateCompany: "/api/company/update",
    },
  },
} as const;

// Helper function to build full API URLs
export function getApiUrl(endpoint: string): string {
  return `${config.apiUrl}${endpoint}`;
}
