import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { config } from '$lib/config';
import { api } from '$lib/api';

export async function load({params, locals}) {
  const companyId = params.id;
  console.log(":: LAYOUT AUTH CHECK ::");
  console.log(":: LAYOUT AUTH CHECK ::" , locals);

  // if(!locals.token) {
  //   const lang = params.lang;
  //   throw redirect(303, `/${lang}/login`);
  // }

  // try {
  //   const response = await api(config.endpoints.local.getCompanyList, {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${locals.token}`
  //     },
  //   });

  //   if (!response.ok) {
  //     console.error("Failed to fetch companies:", await response.text());
  //     return {
  //       data: {
  //         companies: [],
  //         selectedCompanyId: companyId
  //       }
  //     };
  //   }

  //   const data = await response.json();

  //   return {
  //     companies: data.companies,
  //     selectedCompanyId: companyId
  //   };
  // } catch (error) {
  //   console.error("Error fetching user companies:", error);
  //   return {
  //     companies: [],
  //     selectedCompanyId: companyId
  //   };
  // }
}