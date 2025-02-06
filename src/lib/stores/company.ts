import { writable } from "svelte/store";
import { api } from "$lib/api";
import { config } from "$lib/config";

export interface Company {
  id: string;
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

  const storedTokens =
    typeof window !== "undefined" ? localStorage.getItem("tokens") : null;

  return {
    subscribe,
    getCompanyList: async () => {
      update((state) => ({ ...state, isLoading: true, error: null }));

      console.log("getCompanyList storedTokens :: ", storedTokens)

      try {
        const response = await api(config.endpoints.local.getCompanyList, {
          method: "GET",
          server: {
            locals: {
              token: storedTokens!
            }
          }
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to fetch companies");
        }

        const result = await response.json();

        update((state) => ({
          ...state,
          companies: result.companies,
          // If no company is selected, select the first one
          selectedCompany: state.selectedCompany || result.companies[0] || null,
        }));

        return result.companies as Company[];
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch companies";
        update((state) => ({ ...state, error: message }));
        throw error;
      } finally {
        update((state) => ({ ...state, isLoading: false }));
      }
    },
    setCompanyList: (companies: Company[]) => {
      update((state) => ({
        ...state,
        companies,
        selectedCompany: state.selectedCompany || companies[0] || null
      }));
    },
    createCompany: async (data: Partial<Company>) => {
      update((state) => ({ ...state, isLoading: true, error: null}));

      try {
        const response = await api(config.endpoints.company.createCompany, {
          method: "POST",
          body: JSON.stringify(data),
        });

        if(!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to create company");
        }

        const company = await response.json();

        update((state) => ({
          ...state,
          companies: [...state.companies, company],
          selectedCompany: company,
        }));

        return company;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create company";
        update((state) => ({ ...state, error: message }));
        throw error;
      } finally {
        update((state) => ({ ...state, isLoading: false }));
      }
    },
    updateCompany: async (id: string, data: Partial<Company>) => {
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
    fetchCompany: async (id: string) => {
      update((state) => ({ ...state, isLoading: true, error: null }));
      console.log("store fetchCompany id :: ", id)
      try {
        // const response = await api(config.endpoints.company.getCompany.replace(':id', id), {
        //   method: "GET",
        //   credentials: 'include',
        // });

        const response = await fetch(`/api/company/${id}`, {
          method: 'GET',
      });

        const data = await response.json();

        if(!data.success) {
          throw new Error(data.message || "Failed to fetch company");
        }

        update((state) => ({ ...state, selectedCompany: data.company }));

        return data.company;
      } catch (error) {
        console.error("Error fetching company:", error);
        return null;
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
