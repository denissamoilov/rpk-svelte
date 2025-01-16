import { writable, get } from "svelte/store";
import { api } from "$lib/api";
import { config } from "$lib/config";

export interface Company {
  id: number;
  name: string;
  registrationNumber: string;
  email: string;
  userId: string;
  address?: string;
  vatNumber?: string;
  phone?: string;
}

interface CompanyStore {
  companies: Company[];
  selectedCompany: Company | null;
  isLoading: boolean;
  error: string | null;
}

function createCompanyStore() {
  const { subscribe, set, update } = writable<CompanyStore>({
    companies: [],
    selectedCompany: null,
    isLoading: false,
    error: null,
  });

  return {
    subscribe,
    update: (updater: (state: CompanyStore) => CompanyStore) => {
      update(updater);
    },
    fetchUserCompanies: async () => {
      update((state) => ({ ...state, isLoading: true, error: null }));

      try {
        const response = await api("/company/user", {
          method: "GET",
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to fetch companies");
        }

        const companies = await response.json();

        update((state) => ({
          ...state,
          companies,
          // If no company is selected, select the first one
          selectedCompany: state.selectedCompany || companies[0] || null,
        }));

        return companies;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch companies";
        update((state) => ({ ...state, error: message }));
        throw error;
      } finally {
        update((state) => ({ ...state, isLoading: false }));
      }
    },
    updateCompany: async (id: number, data: Partial<Company>) => {
      update((state) => ({ ...state, isLoading: true, error: null }));

      try {
        const response = await api(`/company/${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to update company");
        }

        const updatedCompany = await response.json();

        update((state) => ({
          ...state,
          companies: state.companies.map((company) =>
            company.id === id ? { ...company, ...updatedCompany } : company
          ),
          selectedCompany:
            state.selectedCompany?.id === id
              ? { ...state.selectedCompany, ...updatedCompany }
              : state.selectedCompany,
        }));

        return true;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to update company";
        update((state) => ({ ...state, error: message }));
        return false;
      } finally {
        update((state) => ({ ...state, isLoading: false }));
      }
    },
    setSelectedCompany: (company: Company | null) => {
      update((state) => ({ ...state, selectedCompany: company }));
    },
  };
}

export const companyStore = createCompanyStore();
