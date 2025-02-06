import { PUBLIC_BACKEND_URL } from "$env/static/public";

export const config = {
  apiUrl: PUBLIC_BACKEND_URL,
  endpoints: {
    local: {
      login: "/api/login",
      logout: "/api/logout",
      getCompanyList: "/api/company/list",
    },
    auth: {
      login: "/api/login",
      logout: "/api/logout",
      signup: "/api/signup",
      refreshToken: "/api/refresh-token",
      verifyEmail: "/api/verify-email",
      resetPassword: "/api/reset-password",
      forgotPassword: "/api/forgot-password",
    },
    user: {
      me: "/api/user/me",
    },
    company: {
      getUserCompanyList: "/api/company/list",
      createCompany: "/api/company/create",
      getCompany: "/api/company/:id",
      updateCompany: "/api/company/update",
    },
  },
} as const;

// Helper function to build full API URLs
export function getApiUrl(endpoint: string): string {
  return `${config.apiUrl}${endpoint}`;
}
