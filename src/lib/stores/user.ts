import { get, writable } from "svelte/store";
import type { Writable } from "svelte/store";

interface User {
  email: string;
  isVerified: boolean;
  // Add other user properties as needed
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

function createUserStore() {
  // Initialize from localStorage if available
  const storedUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const initialState: UserStore = {
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: !!storedUser,
    isLoading: true, // Start with loading true
  };

  const { subscribe, set, update }: Writable<UserStore> =
    writable(initialState);

  return {
    subscribe,
    user: () => {
      return get(userStore).user;
    },
    login: (userData: User) => {
      const newState = {
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      };
      set(newState);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(userData));
      }
    },
    logout: () => {
      set({ user: null, isAuthenticated: false, isLoading: false });
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
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
    setLoading: (isLoading: boolean) => {
      update((state) => ({ ...state, isLoading }));
    },
    // Initialize auth state (call this after checking auth status)
    initializeAuth: () => {
      update((state) => ({ ...state, isLoading: false }));
    },
  };
}

export const userStore = createUserStore();
