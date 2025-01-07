import { api } from "$lib/api";
import { config } from "$lib/config";
import { get, writable } from "svelte/store";
import type { Writable } from "svelte/store";

interface User {
  name: string;
  surname: string;
  personalIdCode: string;
  email: string;
  isVerified: boolean;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading?: boolean;
  tokens: AuthTokens | null;
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

async function refreshAccessToken(
  refreshToken: string
): Promise<AuthTokens | null> {
  try {
    const response = await api(config.endpoints.auth.refreshToken, {
      requireAuth: false,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to refresh token");
    }

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken || refreshToken, // Use new refresh token if provided
    };
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}

function createUserStore() {
  // Initialize from localStorage if available
  const storedUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const storedTokens =
    typeof window !== "undefined" ? localStorage.getItem("tokens") : null;

  const initialState: UserStore = {
    user: storedUser ? JSON.parse(storedUser) : null,
    tokens: storedTokens ? JSON.parse(storedTokens) : null,
    isAuthenticated: !!storedUser && !!storedTokens,
    isLoading: true,
  };

  const { subscribe, set, update }: Writable<UserStore> =
    writable(initialState);

  // Set up periodic token refresh check
  if (typeof window !== "undefined") {
    setInterval(() => {
      const state = get(userStore);
      if (
        state.tokens?.accessToken &&
        shouldRefreshToken(state.tokens.accessToken)
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
    login: (userData: User, tokens: AuthTokens) => {
      const newState = {
        user: userData,
        tokens,
        isAuthenticated: true,
        isLoading: false,
      };
      set(newState);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("tokens", JSON.stringify(tokens));
      }
    },
    logout: () => {
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      });
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("tokens");
      }
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
      if (!state.tokens?.refreshToken) return false;

      // Check if token needs refresh
      if (!force && state.tokens.accessToken) {
        if (!shouldRefreshToken(state.tokens.accessToken)) {
          return true; // Token is still valid
        }
      }

      const newTokens = await refreshAccessToken(state.tokens.refreshToken);
      if (!newTokens) {
        // If refresh failed, log out
        userStore.logout();
        return false;
      }

      update((state) => ({
        ...state,
        tokens: newTokens,
      }));

      if (typeof window !== "undefined") {
        localStorage.setItem("tokens", JSON.stringify(newTokens));
      }

      return true;
    },
    getAccessToken: async () => {
      const state = get(userStore);
      if (!state.tokens?.accessToken) return null;

      // Check if token needs refresh
      if (shouldRefreshToken(state.tokens.accessToken)) {
        const success = await userStore.updateTokens(true);
        if (!success) return null;
      }

      return get(userStore).tokens?.accessToken || null;
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
