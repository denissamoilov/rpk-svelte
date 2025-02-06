import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { userStore } from './user';
import { api } from '$lib/api';
import { config } from '$lib/config';

type AuthStore = {
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
};

// Function to decode JWT token and get expiration time
function getTokenExpiration(token: string): number | null {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(jsonPayload).exp * 1000; // Convert to milliseconds
    } catch {
        return null;
    }
}

// Check if token needs refresh (less than 5 minutes until expiration)
function shouldRefreshToken(token: string): boolean {
    const expiration = getTokenExpiration(token);
    if (!expiration) return false;
    return Date.now() > expiration - 5 * 60 * 1000; // 5 minutes before expiration
}

const createAuthStore = () => {
    // Initialize from localStorage if in browser
    const initialToken = browser ? localStorage.getItem('accessToken') : null;
    
    const { subscribe, set, update } = writable<AuthStore>({
        accessToken: initialToken,
        isAuthenticated: !!initialToken,
        isLoading: false
    });

    // Set up periodic token refresh check
    if (browser) {
        setInterval(() => {
            const state = get(authStore);
            if (state.accessToken && shouldRefreshToken(state.accessToken)) {
                authStore.refreshToken().catch(console.error);
            }
        }, 30000); // Check every 30 seconds
    }

    return {
        subscribe,
        fetchUser: async () => {
          try {
            const response = await api(config.endpoints.user.me, {
                method: 'GET',
                requireAuth: true
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch user data');
            }

            // Update user data
            userStore.setUser(data.user);
            return data.user;
          } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
          }
        },
        getAccessToken: async () => {
            const state = get(authStore);
            if (!state.accessToken) return null;

            // Check if token needs refresh
            if (shouldRefreshToken(state.accessToken)) {
                const success = await authStore.refreshToken();
                if (!success) return null;
            }

            return get(authStore).accessToken;
        },
        refreshToken: async () => {
            try {
                const response = await api(config.endpoints.auth.refreshToken, {
                    method: 'POST',
                    requireAuth: true
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Token refresh failed');
                }

                if (browser) {
                    localStorage.setItem('accessToken', data.accessToken);
                }

                set({
                    accessToken: data.accessToken,
                    isAuthenticated: true,
                    isLoading: false
                });

                return true;
            } catch (error) {
                console.error('Token refresh error:', error);
                authStore.logout();
                return false;
            }
        },
        setAccessToken: (token: string) => {
            if (browser) {
                localStorage.setItem('accessToken', token);
            }
            set({ accessToken: token, isAuthenticated: true, isLoading: false });
        },
        login: async (email: string, password: string) => {
            update(state => ({ ...state, isLoading: true }));
            
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!data.success) {
                    throw new Error(data.message || 'Login failed');
                }

                // Set the access token
                if (browser) {
                    localStorage.setItem('accessToken', data.accessToken);
                }

                set({
                    accessToken: data.accessToken,
                    isAuthenticated: true,
                    isLoading: false
                });

                // Update user data in userStore
                userStore.setUser(data.user);

                return data;
            } catch (error) {
                console.error('Login error:', error);
                set({ accessToken: null, isAuthenticated: false, isLoading: false });
                throw error;
            }
        },
        logout: () => {
            if (browser) {
                localStorage.removeItem('accessToken');
            }
            set({ accessToken: null, isAuthenticated: false, isLoading: false });
            userStore.clearUser();
        },
        setLoading: (isLoading: boolean) => {
            update(state => ({ ...state, isLoading }));
        }
    };
};

export const authStore = createAuthStore();
