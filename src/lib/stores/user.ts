import { api } from "$lib/api";
import { config } from "$lib/config";
import { get, writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { SelectOptionType } from "$lib/types/docs";
import { companyStore } from "./company";

interface User {
  id: string;
  name: string;
  surname: string;
  personalIdCode: string;
  email: string;
  isVerified: boolean;
  companies: SelectOptionType[]
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading?: boolean;
  token: string | null;
}

// Function to decode JWT token and get expiration time
function getTokenExpiration(token: string): number | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payload = JSON.parse(jsonPayload);
    return payload.exp ? payload.exp * 1000 : null; // Convert to milliseconds
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }
}

// Check if token needs refresh (less than 5 minutes until expiration)
function shouldRefreshToken(token: string): boolean {
  const expiration = getTokenExpiration(token);
  if (!expiration) return true;

  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
  return Date.now() + fiveMinutes >= expiration;
}

async function refreshAccessToken(): Promise<string | null> {
  try {
    const response = await api(config.endpoints.auth.refreshToken, {
      requireAuth: false,
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to refresh token");
    }

    return data.accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}

function createUserStore() {
  // Initialize from localStorage if available
  const storedUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const storedToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const initialState: UserStore = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken ? JSON.parse(storedToken) : null,
    isAuthenticated: !!storedUser && !!storedToken,
    isLoading: true,
  };

  const { subscribe, set, update }: Writable<UserStore> =
    writable(initialState);

  // Set up periodic token refresh check
  if (typeof window !== "undefined") {
    setInterval(() => {
      const state = get(userStore);
      if (
        state.token &&
        shouldRefreshToken(state.token)
      ) {
        userStore.updateTokens(true).catch(console.error);
      }
    }, 30000); // Check every 30 seconds
  }

  return {
    subscribe,
    user: () => {
      return get(userStore).user;
    },
    login: async(email: string, password: string) => {
      try {
        // const response = await api(config.endpoints.local.login, {
        //   method: 'POST',
        //   requireAuth: false,
        //   body: JSON.stringify({ email, password })
        // })
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        })

        const data = await response.json();

        console.log("data :: ", data)

        if(!data.success) {
          throw new Error(data.message || 'Login failed');
        }

        const newState = {
          user: data.user,
          token: data.accessToken,
          isAuthenticated: true,
          isLoading: false,
        };
        set(newState);

        if(typeof window !== undefined) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        return data;
      } catch(error) {
        console.error('Login error:', error);
        throw new Error('Login failed');
      }
      
    },
    logout: () => {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("tokens");
      }

      companyStore.setSelectedCompany(null);
    },
    update: (userData: Partial<User>) => {
      update((state) => {
        if (!state.user) return state;
        const updatedUser = { ...state.user, ...userData };
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        return {
          ...state,
          user: updatedUser,
        };
      });
    },
    updateTokens: async (force = false) => {
      const state = get(userStore);
      if (!state.token) return false;

      // Check if token needs refresh
      if (!force && state.token) {
        if (!shouldRefreshToken(state.token)) {
          return true; // Token is still valid
        }
      }

      const newToken = await refreshAccessToken();

      if (!newToken) {
        // If refresh failed, log out
        userStore.logout();
        return false;
      }

      update((state) => ({
        ...state,
        token: newToken,
      }));

      return true;
    },
    getAccessToken: async () => {
      const state = get(userStore);
      if (!state.token) return null;

      // Check if token needs refresh
      if (shouldRefreshToken(state.token)) {
        const success = await userStore.updateTokens(true);
        if (!success) return null;
      }

      return get(userStore).token || null;
    },
    setLoading: (isLoading: boolean) => {
      update((state) => ({ ...state, isLoading }));
    },
    initializeAuth: () => {
      update((state) => ({ ...state, isLoading: false }));
    },
  };
}

export const userStore = createUserStore();
