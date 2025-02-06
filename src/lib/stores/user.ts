import { api } from "$lib/api";
import { config } from "$lib/config";
import { browser } from '$app/environment';
import { get, writable, type Writable } from "svelte/store";
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
  isLoading: boolean;
}

function createUserStore() {
  const initialState: UserStore = {
    user: null,
    isLoading: false
  };

  const { subscribe, set, update }: Writable<UserStore> =
    writable(initialState);



  return {
    subscribe,
    user: () => {
      return get(userStore).user;
    },
    setUser: (userData: User) => {
      set({ user: userData, isLoading: false });
    },
    clearUser: () => {
      set({ user: null, isLoading: false });
      companyStore.setSelectedCompany(null);
    },
    update: (userData: Partial<User>) => {
      update((state) => {
        if (!state.user) return state;
        const updatedUser = { ...state.user, ...userData };
        return {
          ...state,
          user: updatedUser,
        };
      });
    },
    setLoading: (isLoading: boolean) => {
      update((state) => ({ ...state, isLoading }));
    },
  };
}

export const userStore = createUserStore();
